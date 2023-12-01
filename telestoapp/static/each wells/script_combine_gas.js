document.addEventListener("DOMContentLoaded", function () {
  const margin = { top: 70, right: 60, bottom: 50, left: 80 };
  const width = 1600 - margin.left - margin.right;
  const height = 800 - margin.top - margin.bottom;

  // Create an empty array to store data traces
  const dataTraces = [];

  // Load the initial graph
  updateDropdown();

  // Event listener for the dropdown selection
  document.getElementById("well-select").addEventListener("change", function () {
    updateGraph(this.value);
  });

  // Function to update the chart
  function updateGraph(selectedWell) {
    Plotly.d3.csv("well_level_history_matching_and_prediction.csv", function (csvData) {
      const data = csvData.filter(d => d["WELL"] === selectedWell);

      if (data.length === 0) {
        console.error("No data for the selected well:", selectedWell);
        return;
      }

      data.forEach(d => {
        d.MONTHS = +d["Months"];
        d["Gas_rate(mscum d)"] = +d["Gas_rate(mscum d)"];
        d["Gas_rate_actual(mscum d)"] = +d["Gas_rate_actual(mscum d)"];
      });

      // Create a trace for the predicted Gas rate
      const trace1 = {
        x: data.map(d => d.MONTHS),
        y: data.map(d => d["Gas_rate(mscum d)"]),
        type: 'scatter',
        mode: 'lines',
        name: 'Prediction',
        line: { color: 'blue' },
        hoverinfo: 'x+y', // Display x and y values on hover
      };

      // Create a trace for the actual Gas rate
      const trace2 = {
        x: data.map(d => d.MONTHS),
        y: data.map(d => d["Gas_rate_actual(mscum d)"]),
        type: 'scatter',
        mode: 'lines',
        name: 'Actual',
        line: { color: 'red' },
        hoverinfo: 'x+y', // Display x and y values on hover
      };

      // Add the traces to the array
      dataTraces.length = 0;
      dataTraces.push(trace1, trace2);

      // Plot the graph using Plotly.newPlot
      Plotly.newPlot('chart-container', dataTraces, getLayout(selectedWell));
    });
  }

  // Function to update the dropdown menu with well options
  function updateDropdown() {
    Plotly.d3.csv("well_level_history_matching_and_prediction.csv", function (csvData) {
      const wells = [...new Set(csvData.map(d => d["WELL"]))];
      const dropdown = document.getElementById("well-select");

      wells.forEach(well => {
        const option = document.createElement("option");
        option.value = well;
        option.text = well;
        dropdown.add(option);
      });

      // Load the initial graph with the first well
      updateGraph(wells[0]);
    });
  }

  // Function to get the layout configuration
  function getLayout(selectedWell) {
    return {
      title: `${selectedWell} - Gas Rate Over Time`,
      xaxis: {
        title: 'Months',
        type: 'linear',
      },
      yaxis: {
        title: 'Gas Rate (mscum d)',
        type: 'linear',
      },
      margin: {
        l: margin.left,
        r: margin.right,
        t: margin.top,
        b: margin.bottom,
      },
      showlegend: true,
      hovermode: 'closest',
      uirevision: 'true',
      xaxis_type: 'linear',
      dragmode: 'zoom',
      uirevision: 'true',
      doubleClick: 'reset+autosize',
    };
  }
});
