// Set dimensions and margins for the chart
const margin = { top: 70, right: 60, bottom: 50, left: 80 };
const width = 1600 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom - 40;

// Set up the x, primary y, and secondary y scales
const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const y2 = d3.scaleLinear().range([height, 0]); // Secondary y-scale
const y3 = d3.scaleLinear().range([height, 0]); // Third y-scale (for OIL_RATE)

const legends = [
  { label: "GAS_VOLUME(MSCUM)", color: "red" },
  { label: "WATER_RATE(KLPD)", color: "blue" },
  { label: "OIL_RATE(KLPD)", color: "green" }, // Add the label and color for the third line
];

// Create the SVG element and append it to the chart container
const svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right + 100)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Create tooltip divs
const tooltipGreen = d3.select("body").append("div").attr("class", "tooltip");
const tooltipBlue = d3.select("body").append("div").attr("class", "tooltip");
// Create tooltip divs for the red line
const tooltipRed = d3.select("body").append("div").attr("class", "tooltip");

// Create gradient
const gradient = svg
  .append("defs")
  .append("linearGradient")
  .attr("id", "gradient")
  .attr("x1", "0%")
  .attr("x2", "0%")
  .attr("y1", "0%")
  .attr("y2", "100%")
  .attr("spreadMethod", "pad");

gradient
  .append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#85bb65")
  .attr("stop-opacity", 1);

gradient
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#85bb65")
  .attr("stop-opacity", 0);

const wellDropdown = document.getElementById("well-select");
wellDropdown.addEventListener("change", function () {
  const selectedWell = wellDropdown.value;

  svg.selectAll("*").remove();
  d3.select("#slider-range").selectAll("*").remove();

  // Load and process the data based on the selected well value
  d3.csv("NewWellDynamic-With_filled_NullValues.csv").then((data) => {
    // Filter the data for rows where the "WELL" column matches the selected well
    data = data.filter((d) => d.WELL === selectedWell);

    // Parse the Date and convert the Close, SecondaryValue, and OilRate to numbers
    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach((d) => {
      d.Date = parseDate(d.MONTH);
      d.Close = +d["WATER_RATE(KLPD)"];
      d.SecondaryValue = +d["GAS_RATE(mscum d)"];
      d.OilRate = +d["OIL_RATE(KLPD)"];
    });

    // Set the domains for the x, primary y, secondary y, and third y scales
    x.domain(d3.extent(data, (d) => d.Date));
    y.domain([0, d3.max(data, (d) => Math.max(d.Close, d.OilRate))]);
    y2.domain([0, d3.max(data, (d) => d.SecondaryValue)]);

    // Append x-axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .style("font-size", "14px")
      .call(
        d3
          .axisBottom(x)
          .tickValues(x.ticks(d3.timeYear.every(1)))
          .tickFormat(d3.timeFormat("%Y"))
      )
      .selectAll(".tick line")
      .style("stroke-opacity", 1);

    // Style x-axis text
    svg.selectAll(".tick text").attr("fill", "#777");

    // Append primary y-axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .style("font-size", "14px")
      .call(
        d3
          .axisLeft(y) // Use axisLeft for the primary y-axis
          .ticks(10)
          .tickFormat((d) => {
            if (isNaN(d)) return "";
            return d.toFixed(2);
          })
      )
      .selectAll(".tick text")
      .style("fill", "#777");

    // Append secondary y-axis
    svg
      .append("g")
      .attr("class", "y-axis-secondary")
      .attr("transform", `translate(${width},0)`)
      .style("font-size", "14px")
      .call(
        d3
          .axisRight(y2) // Use axisRight for the secondary y-axis
          .ticks(10)
          .tickFormat((d) => {
            if (isNaN(d)) return "";
            return d.toFixed(2);
          })
      );

    // Set up the line generator for the primary y-axis data
    const line = d3
      .line()
      .x((d) => x(d.Date))
      .y((d) => {
        if (isNaN(d.Close) || d.Close == 0) {
          // Handle missing data points by moving the line to the next defined point
          return null;
        }
        return y(d.Close);
      })
      .defined((d) => !isNaN(d.Close) && d.Close !== 0) // Define when to draw the line
      .curve(d3.curveCardinal);

    // Set up the line generator for the secondary y-axis data
    const line2 = d3
      .line()
      .x((d) => x(d.Date))
      .y((d) => {
        if (isNaN(d.SecondaryValue) || d.SecondaryValue === 0) {
          // Handle missing data points by moving the line to the next defined point
          return null;
        }
        return y2(d.SecondaryValue);
      })
      .defined((d) => !isNaN(d.SecondaryValue) && d.SecondaryValue !== 0)
      .curve(d3.curveCardinal);

    // Set up the line generator for "OIL_RATE(KLPD)"
    const line3 = d3
      .line()
      .x((d) => x(d.Date))
      .y((d) => {
        if (isNaN(d.OilRate) || d.OilRate === 0) {
          // Handle missing data points by moving the line to the next defined point
          return null;
        }
        return y(d.OilRate);
      })
      .defined((d) => !isNaN(d.OilRate) && d.OilRate !== 0)
      .curve(d3.curveCardinal);
    // Append the secondary y-axis line
    svg
      .append("path")
      .datum(data)
      .attr("class", "line2")
      .attr("fill", "none")
      .attr("stroke", "red") // Choose a color for the secondary line
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round") // Create a broken line effect
      .attr("d", line2);

    // Append third y-axis for "OIL_RATE(KLPD)"
    // svg
    //   .append("g")
    //   .attr("class", "y-axis-third")
    //   .attr("transform", `translate(${width},0)`)
    //   .style("font-size", "14px")
    //   .call(
    //     d3.axisRight(y3) // Use axisRight for the third y-axis
    //       .ticks(10)
    //       .tickFormat(d => {
    //         if (isNaN(d)) return "";
    //         return d.toFixed(2);
    //       })
    //   );

    // Update the secondary y-scale domain based on your data
    y2.domain([0, d3.max(data, (d) => d.SecondaryValue)]);

    // Update the third y-scale domain based on your data
    y3.domain([0, d3.max(data, (d) => d.OilRate)]);

    // Create an area generator
    const area = d3
      .area()
      .x((d) => x(d.Date))
      .y0(height)
      .y1((d) => y(d.Close))
      .defined((d) => !isNaN(d.Close)); // Define when to break the area

    // Append the primary y-axis line (Green line)
    const path = svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round") // Create a broken line effect
      .attr("d", line);

    svg
      .append("path")
      .datum(data)
      .attr("class", "line3")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round") // Create a broken line effect
      .attr("d", line3);

    // Append a circle element
    const circle = svg
      .append("circle")
      .attr("r", 0)
      .attr("fill", "blue")
      .style("stroke", "white")
      .attr("opacity", 0.7)
      .style("pointer-events", "none");

    // Create circle for the secondary y-axis (green graph)
    const tooltipCircleSecondary = svg
      .append("circle")
      .attr("r", 0)
      .attr("fill", "red")
      .style("stroke", "white")
      .attr("opacity", 0.7)
      .style("pointer-events", "none");

    // Create circle for the third y-axis (red graph)
    const tooltipCircleRed = svg
      .append("circle")
      .attr("r", 0)
      .attr("fill", "green")
      .style("stroke", "white")
      .attr("opacity", 0.7)
      .style("pointer-events", "none");

    // Append red lines extending from the circle to the date and value
    const tooltipLineX = svg
      .append("line")
      .attr("class", "tooltip-line")
      .attr("id", "tooltip-line-x")
      .attr("stroke", "grey")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    const tooltipLineY = svg
      .append("line")
      .attr("class", "tooltip-line")
      .attr("id", "tooltip-line-y")
      .attr("stroke", "blue")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    const tooltipLineXSecondary = svg
      .append("line")
      .attr("class", "tooltip-line-secondary")
      .attr("id", "tooltip-line-x-secondary")
      .attr("stroke", "grey")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    const tooltipLineYSecondary = svg
      .append("line")
      .attr("class", "tooltip-line-secondary")
      .attr("id", "tooltip-line-y-secondary")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    const tooltipLineXRED = svg
      .append("line")
      .attr("class", "tooltip-line-red")
      .attr("id", "tooltip-line-x-red")
      .attr("stroke", "grey")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    const tooltipLineYRED = svg
      .append("line")
      .attr("class", "tooltip-line-red")
      .attr("id", "tooltip-line-y-red")
      .attr("stroke", "green")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2");

    // Create a div for the tooltips
    const tooltipDiv = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("display", "none");

    // Create a listening rectangle
    const listeningRect = svg
      .append("rect")
      .attr("width", width)
      .attr("height", height);
    // Create the mouse move function
    listeningRect.on("mousemove", function (event) {
      const [xCoord] = d3.pointer(event, this);
      const bisectDate = d3.bisector((d) => d.Date).left;
      const x0 = x.invert(xCoord);
      const i = bisectDate(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      const d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
      const xPos = x(d.Date);
      const yPos = y(d.Close);
      const yPos2 = y2(d.SecondaryValue);
      const yPos3 = y3(d.OilRate);

      // Update the circle position
      circle.attr("cx", xPos).attr("cy", yPos);

      // Update the circle position for the secondary graph
      tooltipCircleSecondary.attr("cx", xPos).attr("cy", yPos2);

      // Update the circle position for the third graph
      tooltipCircleRed.attr("cx", xPos).attr("cy", yPos3);

      // Add transition for the circle radius
      circle.transition().duration(50).attr("r", 5);

      // Add transition for the secondary graph's circle radius
      tooltipCircleSecondary.transition().duration(50).attr("r", 5);

      // Add transition for the third graph's circle radius
      tooltipCircleRed.transition().duration(50).attr("r", 5);

      tooltipDiv
        .style("display", "block")
        .html(
          `<div><strong>Date: </strong>${d3.timeFormat("%Y-%m-%d")(
            d.Date
          )}</div>` +
            `<div><strong>Water Rate: </strong>${
              d.Close !== undefined ? d.Close.toFixed(2) : "N/A"
            }</div>` +
            `<div><strong>Gas Rate: </strong>${
              d.SecondaryValue !== undefined
                ? d.SecondaryValue.toFixed(2)
                : "N/A"
            }</div>` +
            `<div><strong>Oil Rate: </strong>${
              d.OilRate !== undefined ? d.OilRate.toFixed(2) : "N/A"
            }</div>`
        )
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 20}px`);
    });

    // Listening rectangle mouse leave function
    listeningRect.on("mouseleave", function () {
      circle.transition().duration(50).attr("r", 0);
      tooltipCircle.transition().duration(50).attr("r", 0);
      tooltipGreen.style("display", "none");
      tooltipBlue.style("display", "none");
      tooltipdate.style("display", "none");
      tooltipLineX.attr("x1", 0).attr("x2", 0);
      tooltipLineY.attr("y1", 0).attr("y2", 0);
      tooltipLineX.style("display", "none");
      tooltipLineY.style("display", "none");
      // Hide the red line tooltip
      tooltipRed.style("display", "none");
      tooltipCircleSecondary.transition().duration(50).attr("r", 0);
      tooltipCircleRed.transition().duration(50).attr("r", 0);
      tooltipDiv.style("display", "none");
    });

    // Define the primary slider
    const primarySliderRange = d3
      .sliderBottom()
      .min(d3.min(data, (d) => d.Date))
      .max(d3.max(data, (d) => d.Date))
      .width(width * 0.9)
      .tickFormat(d3.timeFormat("%Y-%m-%d"))
      .ticks(3)
      .default([d3.min(data, (d) => d.Date), d3.max(data, (d) => d.Date)])
      .fill("#85bb65");

    primarySliderRange.on("onchange", (val) => {
      // Set new domain for x scale
      x.domain(val);

      // Filter data based on primary slider values
      const filteredData = data.filter(
        (d) => d.Date >= val[0] && d.Date <= val[1]
      );

      // Update the line and area to the new domain
      svg.select(".line").attr("d", line(filteredData));
      svg.select(".area").attr("d", area(filteredData));

      // Set new domain for primary y scale based on new data
      y.domain([0, d3.max(filteredData, (d) => d.Close)]);

      // Update the x-axis with the new domain
      svg
        .select(".x-axis")
        .transition()
        .duration(300)
        .call(
          d3
            .axisBottom(x)
            .tickValues(x.ticks(d3.timeYear.every(1)))
            .tickFormat(d3.timeFormat("%Y"))
        );

      // Update the primary y-axis with the new domain
      svg
        .select(".y-axis")
        .transition()
        .duration(300)
        .call(
          d3
            .axisLeft(y) // Use axisLeft for the primary y-axis
            .ticks(10)
            .tickFormat((d) => {
              if (isNaN(d)) return "";
              return d.toFixed(2);
            })
        );

      // Update the secondary y-axis line based on filtered data
      svg.select(".line2").attr("d", line2(filteredData));
    });

    // Add the primary slider to the DOM
    const primarySliderContainer = d3
      .select("#slider-range")
      .append("svg")
      .attr("width", width)
      .attr("height", 100)
      .append("g")
      .attr("transform", "translate(100,30)");

    primarySliderContainer.call(primarySliderRange);

    // Define the secondary slider for the secondary y-axis
    const secondarySliderRange = d3
      .sliderBottom()
      .min(0) // Set the min value for the secondary slider
      .max(d3.max(data, (d) => d.SecondaryValue))
      .width(300)
      .ticks(10)
      .default([0, d3.max(data, (d) => d.SecondaryValue)])
      .fill("blue"); // Choose a color for the secondary slider

    secondarySliderRange.on("onchange", (val) => {
      // Set new domain for secondary y scale based on the secondary slider values
      y2.domain(val);

      // Update the secondary y-axis with the new domain
      svg
        .select(".y-axis-secondary")
        .transition()
        .duration(300)
        .call(
          d3
            .axisRight(y2) // Use axisRight for the secondary y-axis
            .ticks(10)
            .tickFormat((d) => {
              if (isNaN(d)) return "";
              return d.toFixed(2);
            })
        );

      // Update the secondary y-axis line based on filtered data
      svg.select(".line2").attr("d", line2(data));
    });

    // Add the secondary slider to the DOM
    const secondarySliderContainer = d3
      .select("#secondary-slider-container")
      .append("svg")
      .attr("width", width)
      .attr("height", 100)
      .append("g")
      .attr("transform", "translate(90,30)");

    secondarySliderContainer.call(secondarySliderRange);

    // Add the chart title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", margin.left - 115)
      .attr("y", margin.top - 100)
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("font-family", "sans-serif");

    // Add the source credit
    svg
      .append("text")
      .attr("class", "source-credit")
      .attr("x", width - 110)
      .attr("y", height + margin.top + 40)
      .style("font-size", "14px")
      .style("fill", "#777");

    // Add label for the primary y-axis
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#333")
      .text("LIQUID_Rate(KLPD)");

    // Add label for the secondary y-axis
    svg
      .append("text")
      .attr("class", "y-axis-secondary-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", width + margin.right + 40) // Adjust the x and y positions as needed
      .attr("dy", "-1em")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#333")
      .text("GAS_RATE(mscum d)");

    // Add label for the x-axis
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.top - 21) // Adjust the position as needed
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#333")
      .text("Year(Date wise)");

    // Initialize the chart title and source credit
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2) // Center the title horizontally
      .attr("y", margin.top - 100)
      .style("text-anchor", "middle") // Center-align the text
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .style("font-family", "sans-serif")
      .text(`Production Rate for ${selectedWell}`);

    // Create legend
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 200},${margin.top - 120})`);

    // Append legend squares
    legend
      .append("rect")
      .attr("class", "legend-square")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#85bb65");

    legend
      .append("rect")
      .attr("class", "legend-square")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "blue"); // Choose a color for the secondary line

    // Append legend squares and text
    const legendItems = legend
      .selectAll(".legend-item")
      .data(legends)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(20, ${i * 20})`);

    legendItems
      .append("rect")
      .attr("class", "legend-square")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => d.color);

    legendItems
      .append("text")
      .attr("class", "legend-text")
      .attr("x", 30)
      .attr("y", 12)
      .style("font-size", "14px")
      .style("fill", (d, i) => legends[i].color)
      .text((d) => d.label);

    // Create a function to update the chart when the primary slider is used
    function updateChart() {
      const sliderValue = primarySliderRange.value();
      x.domain(sliderValue);

      // Filter data based on primary slider values
      const filteredData = data.filter(
        (d) => d.Date >= sliderValue[0] && d.Date <= sliderValue[1]
      );

      // Update the line and area to the new domain
      svg.select(".line").attr("d", line(filteredData));
      svg.select(".area").attr("d", area(filteredData));

      // Set new domain for primary y scale based on new data
      y.domain([0, d3.max(data, (d) => Math.max(d.Close, d.OilRate))]);

      // Update the x-axis with the new domain
      svg
        .select(".x-axis")
        .transition()
        .duration(300)
        .call(
          d3
            .axisBottom(x)
            .tickValues(x.ticks(d3.timeYear.every(1)))
            .tickFormat(d3.timeFormat("%Y"))
        );

      // Update the primary y-axis with the new domain
      svg
        .select(".y-axis")
        .transition()
        .call(
          d3
            .axisLeft(y) // Use axisLeft for the primary y-axis
            .ticks(10)
            .tickFormat((d) => {
              if (isNaN(d)) return "";
              return d.toFixed(2);
            })
        );

      // Update the secondary y-axis line based on filtered data
      svg.select(".line2").attr("d", line2(filteredData));

      // Update the third y-axis line based on filtered data
      svg.select(".line3").attr("d", line3(filteredData));
    }

    // Add an event listener to the primary slider
    primarySliderRange.on("onchange", updateChart);

    // Initialize the chart
    updateChart();
  });
});
