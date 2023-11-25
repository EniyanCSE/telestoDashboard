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
//       line: { color: "lightblue" }, // Light blue color for Instantaneous VRR
//     };

//     let trace2 = {
//       x: xValues,
//       y: yValuesCumulative,
//       name: "Cumulative VRR",
//       type: "scatter",
//       yaxis: "y2",
//       line: { color: "darkblue" }, // Dark blue color for Cumulative VRR
//     };

//     let layout = {
//       title: "VRR Analysis",
//       xaxis: {
//         title: "Date",
//         rangeselector: {
//           buttons: [
//             {
//               count: 1,
//               label: "1m",
//               step: "month",
//               stepmode: "backward",
//             },
//             {
//               count: 6,
//               label: "6m",
//               step: "month",
//               stepmode: "backward",
//             },
//             { step: "all" },
//           ],
//         },
//         rangeslider: { range: [d3.min(xValues), d3.max(xValues)] },
//         type: "date",
//       },
//       yaxis: { title: "Instantaneous VRR" },
//       yaxis2: {
//         title: "Cumulative VRR",
//         overlaying: "y",
//         side: "right",
//       },
//       width: 800,
//       height: 600,
//     };

//     Plotly.newPlot("gd", [trace1, trace2], layout);
//   })
//   .catch(function (error) {
//     console.error("Error loading CSV: ", error);
//   });

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
      line: { color: "lightblue" }, // Light blue color for Instantaneous VRR
    };

    let trace2 = {
      x: xValues,
      y: yValuesCumulative,
      name: "Cumulative VRR",
      type: "scatter",
      yaxis: "y2",
      line: { color: "darkblue" }, // Dark blue color for Cumulative VRR
    };

    let layout = {
      title: "VRR Analysis",
      autosize: true,
      xaxis: {
        title: "Date",
        rangeselector: {
          buttons: [
            {
              count: 1,
              label: "1m",
              step: "month",
              stepmode: "backward",
            },
            {
              count: 6,
              label: "6m",
              step: "month",
              stepmode: "backward",
            },
            { step: "all" },
          ],
        },
        rangeslider: { range: [d3.min(xValues), d3.max(xValues)] },
        type: "date",
      },
      yaxis: { title: "Instantaneous VRR" },
      yaxis2: {
        title: "Cumulative VRR",
        overlaying: "y",
        side: "right",
      },
      width: 800,
      height: 600,
    };

    Plotly.newPlot("gd", [trace1, trace2], layout);
    windows.onresize = function () {
      Plotly.relayout("gd", {});
    };
  })
  .catch(function (error) {
    console.error("Error loading CSV: ", error);
  });
