document
  .getElementById("csv-file")
  .addEventListener("change", function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      var text = e.target.result;
      var data = Plotly.d3.csv.parse(text);

      var traces = [];

      var classes = [...new Set(data.map((item) => item["Class 1"]))];
      var markers = {
        "High Oil and High Water": "triangle-up",
        "High Oil and Low Water": "diamond",
        "Low Oil and High Water": "square",
        "Low Oil and Low Water": "circle",
      };
      var colors = {
        "High Oil and High Water": "red",
        "High Oil and Low Water": "green",
        "Low Oil and High Water": "blue",
        "Low Oil and Low Water": "magenta",
      };

      classes.forEach((cls) => {
        traces.push({
          x: data
            .filter((item) => item["Class 1"] === cls)
            .map((item) => item.X),
          y: data
            .filter((item) => item["Class 1"] === cls)
            .map((item) => item.Y),
          mode: "markers",
          type: "scatter",
          name: cls,
          marker: {
            symbol: markers[cls],
            color: colors[cls],
          },
        });
      });

      var layout = {
        title: "Heterogeneity Index Location Analysis",
        xaxis: { title: "Hi Water Production" },
        yaxis: { title: "Hi Oil Production" },
        showlegend: true,
      };

      Plotly.newPlot("myDiv", traces, layout);
    };

    reader.readAsText(file);
  });
