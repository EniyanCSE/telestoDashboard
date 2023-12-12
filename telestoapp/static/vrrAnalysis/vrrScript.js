d3.csv("VRR_Analysis.csv", function (d) {
  return {
    date: new Date(d.Date),
    instantaneousVRR: +d["Instantaneous VRR"],
    cumulativeVRR: +d["Cummulative VRR"],
  };
})
  .then(function (data) {
    // Separate the data into x, y1, and y2
    let xValues = data.map((d) => d.date);
    let yValuesInstantaneous = data.map((d) => d.instantaneousVRR);
    let yValuesCumulative = data.map((d) => d.cumulativeVRR);

    // Plot the data using Plotly
    let trace1 = {
      x: xValues,
      y: yValuesInstantaneous,
      name: "Instantaneous VRR",
      type: "scatter",
      yaxis: "y",
      line: { color: "lightblue" },
    };

    let trace2 = {
      x: xValues,
      y: yValuesCumulative,
      name: "Cumulative VRR",
      type: "scatter",
      yaxis: "y2",
      line: { color: "darkblue" },
    };

    let layout = {
      title: "VRR Analysis - Well HJN045",
      xaxis: {
        title: "",
        showgrid: true,
        rangeselector: {
          buttons: [],
        },
      },
      yaxis: { title: "Instantaneous VRR" },
      yaxis2: {
        title: "Cumulative VRR",
        showgrid: false,
        overlaying: "y",
        side: "right",
      },
      autosize: true,
      responsive: true,
    };

    Plotly.newPlot("gd", [trace1, trace2], layout);
  })
  .catch(function (error) {
    console.error("Error loading CSV: ", error);
  });
var slider = document.getElementById("yearSlider");
var output = document.getElementById("sliderValue");
var baseYear = 1995; // Starting year
var stepSize = 1; // Increment size in years

// Function to calculate the year based on the slider value
function calculateYear(sliderValue) {
  return baseYear + sliderValue * stepSize;
}

// Initialize slider display
output.innerHTML = calculateYear(slider.value);

// Update when the slider is moved
slider.oninput = function () {
  var selectedYear = calculateYear(this.value);
  output.innerHTML = selectedYear;
  let startDate = new Date(selectedYear, 0, 1);
  let endDate = new Date(selectedYear + stepSize, 0, 1);

  let update = {
    "xaxis.range": [startDate, endDate],
  };
  Plotly.relayout("gd", update);
};

// d3.csv("VRR_Analysis.csv", function (d) {
//   return {
//     date: new Date(d.Date),
//     instantaneousVRR: +d["Instantaneous VRR"],
//     cumulativeVRR: +d["Cummulative VRR"],
//   };
// })
//   .then(function (data) {
//     // Separate the data into x, y1, and y2
//     let xValues = data.map((d) => d.date);
//     let yValuesInstantaneous = data.map((d) => d.instantaneousVRR);
//     let yValuesCumulative = data.map((d) => d.cumulativeVRR);

//     // Plot the data using Plotly
//     let trace1 = {
//       x: xValues,
//       y: yValuesInstantaneous,
//       name: "Instantaneous VRR",
//       type: "scatter",
//       yaxis: "y",
//       line: { color: "lightblue" },
//     };

//     let trace2 = {
//       x: xValues,
//       y: yValuesCumulative,
//       name: "Cumulative VRR",
//       type: "scatter",
//       yaxis: "y2",
//       line: { color: "darkblue" },
//     };

//     let layout = {
//       title: "VRR Analysis - Well HJN045",
//       xaxis: {
//         title: "",
//         rangeselector: {
//           buttons: [
//             {
//               count: 1,
//               label: "1y",
//               step: "year",
//               stepmode: "backward",
//             },
//             {
//               count: 3,
//               label: "3y",
//               step: "year",
//               stepmode: "backward",
//             },
//             {
//               count: 5,
//               label: "5y",
//               step: "year",
//               stepmode: "backward",
//             },
//             {
//               count: 10,
//               label: "10y",
//               step: "year",
//               stepmode: "backward",
//             },
//             { step: "all" },
//           ],
//         },
//       },
//       yaxis: { title: "Instantaneous VRR" },
//       yaxis2: {
//         title: "Cumulative VRR",
//         overlaying: "y",
//         side: "right",
//       },
//       width: 1500,
//       height: 700,
//     };

//     Plotly.newPlot("gd", [trace1, trace2], layout);
//   })
//   .catch(function (error) {
//     console.error("Error loading CSV: ", error);
//   });
// var slider = document.getElementById("yearSlider");
// var output = document.getElementById("sliderValue");
// var baseYear = 1995; // Starting year
// var stepSize = 5; // Increment size in years

// // Function to calculate the year based on the slider value
// function calculateYear(sliderValue) {
//   return baseYear + sliderValue * stepSize;
// }

// // Initialize slider display
// output.innerHTML = calculateYear(slider.value);

// // Update when the slider is moved
// slider.oninput = function () {
//   var selectedYear = calculateYear(this.value);
//   output.innerHTML = selectedYear;
//   let startDate = new Date(selectedYear, 0, 1);
//   let endDate = new Date(selectedYear + stepSize, 0, 1);

//   let update = {
//     "xaxis.range": [startDate, endDate],
//   };
//   Plotly.relayout("gd", update);
// };
