function initAllWellsGraph() {
  // Set the dimensions and margins of the graph
  const margin = { top: 10, right: 60, bottom: 110, left: 80 };
  const width = 1600 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;
  // Create the SVG element and append it to the chart container
  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  // Define the tooltip
  const tooltip = d3
    .select("#chart-container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("pointer-events", "none");
  // Define the scales
  const xScale = d3.scaleLinear().range([0, width]);
  const yScale = d3.scaleLinear().range([height, 0]);
  // Define the clipping region
  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);
  // Group for lines that will be clipped
  const linesGroup = svg.append("g").attr("clip-path", "url(#clip)");
  // Define the line generators
  const line = d3
    .line()
    .x((d) => xScale(d.MONTHS))
    .y((d) => yScale(d["Gas_rate(mscum d)"]));
  const line2 = d3
    .line()
    .x((d) => xScale(d.MONTHS))
    .y((d) => yScale(d["Gas_rate_actual(mscum d)"]));
  // Define the zoom behavior
  const zoom = d3
    .zoom()
    .scaleExtent([1, 10])
    .translateExtent([
      [0, 0],
      [width, height],
    ])
    .extent([
      [0, 0],
      [width, height],
    ])
    .on("zoom", zoomed);

  // Append the rect to capture zoom events

  svg
    .append("rect")

    .attr("class", "zoom-rect")

    .attr("width", width)

    .attr("height", height)

    .style("fill", "none")

    .style("pointer-events", "all")

    .call(zoom);

  // Append the axes

  const xAxisGroup = svg
    .append("g")

    .attr("class", "x-axis")

    .attr("transform", `translate(0,${height})`);

  const yAxisGroup = svg
    .append("g")

    .attr("class", "y-axis");

  let data; // Declare data variable at a higher scope

  // Function to update the chart

  function updateGraph(selectedWell) {
    d3.csv("well_level_history_matching_and_prediction.csv").then((csvData) => {
      // Filter and process the data

      data = csvData.filter((d) => d["WELL"] === selectedWell);

      data.forEach((d) => {
        d.MONTHS = +d["Months"];

        d["Gas_rate(mscum d)"] = +d["Gas_rate(mscum d)"];

        d["Gas_rate_actual(mscum d)"] = +d["Gas_rate_actual(mscum d)"];
      });

      // Set up the scales

      xScale.domain(d3.extent(data, (d) => d.MONTHS));

      yScale.domain([
        0,
        d3.max(data, (d) =>
          Math.max(d["Gas_rate(mscum d)"], d["Gas_rate_actual(mscum d)"])
        ),
      ]);

      // Append the paths for the lines

      linesGroup.selectAll(".line").remove(); // Remove any existing lines

      linesGroup
        .append("path")

        .datum(data)

        .attr("class", "line")

        .attr("fill", "none")

        .attr("stroke", "blue")

        .attr("stroke-width", 2.5)

        .attr("d", line)

        .on("mouseover", function (event, d) {
          tooltip
            .transition()

            .duration(200)

            .style("opacity", 0.9);

          tooltip
            .html(`Month: ${d.MONTHS}<br>Gas Rate: ${d["Gas_rate(mscum d)"]}`)

            .style("left", event.pageX + 10 + "px")

            .style("top", event.pageY - 28 + "px");
        })

        .on("mouseout", function () {
          tooltip
            .transition()

            .duration(500)

            .style("opacity", 0);
        });

      linesGroup
        .append("path")

        .datum(data)

        .attr("class", "line")

        .attr("fill", "none")

        .attr("stroke", "red")

        .attr("stroke-width", 2.5)

        .attr("d", line2)

        .on("mouseover", function (event, d) {
          tooltip
            .transition()

            .duration(200)

            .style("opacity", 0.9);

          tooltip
            .html(
              `Month: ${d.MONTHS}<br>Actual Gas Rate: ${d["Gas_rate_actual(mscum d)"]}`
            )

            .style("left", event.pageX + 10 + "px")

            .style("top", event.pageY - 28 + "px");
        })

        .on("mouseout", function () {
          tooltip
            .transition()

            .duration(500)

            .style("opacity", 0);
        });

      // Update the axes

      xAxisGroup.call(d3.axisBottom(xScale));

      yAxisGroup.call(d3.axisLeft(yScale));
    });
  }

  // Event listener for the dropdown selection

  d3.select("#well-select").on("change", function () {
    updateGraph(this.value);
  });

  // Zoom function

  function zoomed(event) {
    const new_xScale = event.transform.rescaleX(xScale);

    const new_yScale = event.transform.rescaleY(yScale);

    // Update the axes with the new scales

    xAxisGroup.call(d3.axisBottom(new_xScale));

    yAxisGroup.call(d3.axisLeft(new_yScale));

    // Update the lines with the new scales

    linesGroup
      .selectAll(".line")

      .each(function (d, i) {
        if (i === 0) {
          d3.select(this).attr(
            "d",
            line
              .x((d) => new_xScale(d.MONTHS))
              .y((d) => new_yScale(d["Gas_rate(mscum d)"]))
          );
        } else if (i === 1) {
          d3.select(this).attr(
            "d",
            line2
              .x((d) => new_xScale(d.MONTHS))
              .y((d) => new_yScale(d["Gas_rate_actual(mscum d)"]))
          );
        }
      });
  }

  // Load the initial graph

  updateGraph("ALL WELLS");
}

const dropdownToggle = document.querySelector(".dropdown-toggle");
dropdownToggle.addEventListener("click", () => {
  const dropdownMenu = dropdownToggle.nextElementSibling;
  dropdownMenu.classList.toggle("show");
});
function openPage(pageName, elmnt) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  console.log("running");
  initAllWellsGraph();

  document.getElementById(pageName).style.display = "block";
  elmnt.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
