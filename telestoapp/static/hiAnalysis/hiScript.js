var allData = [];
var layout = {
  title: "Heterogeneity Index Location Analysis",
  xaxis: { title: "Hi Water Production" },
  yaxis: { title: "Hi Oil Production" },
  showlegend: true,
};

// Load CSV data from a file path
var csvFilePath = "Heterogenity-Index.csv";
console.log("running...");
var xhr = new XMLHttpRequest();
xhr.open("GET", csvFilePath, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var csvData = xhr.responseText;
    allData = Plotly.d3.csv.parse(csvData);
    plotData();
  }
};
xhr.send();

function plotData() {
  var traces = [];
  var classes = [...new Set(allData.map((item) => item["Class 1"]))];
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
      x: allData
        .filter((item) => item["Class 1"] === cls)
        .map((item) => Number(item.X)),
      y: allData
        .filter((item) => item["Class 1"] === cls)
        .map((item) => Number(item.Y)),
      mode: "markers",
      type: "scatter",
      name: cls,
      marker: {
        symbol: markers[cls],
        color: colors[cls],
      },
    });
  });

  Plotly.newPlot("myDiv", traces, layout);
}
