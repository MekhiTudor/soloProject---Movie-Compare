import movies from "../movie-data.json";
import Chart from "chart.js/auto";
import { getLocaleStorageKey, setLocaleStorageKey } from "./locale-storage";
const xBarValues = [];
const yBarValues = [];
const chartColors = [];
const doughChartData = [0, 0, 0, 0, 0, 0];
const scatterValuesCritic = [];
const scatterValuesAudience = [];
if (!getLocaleStorageKey("movies")) {
  setLocaleStorageKey("movies", movies);
}
const movie = getLocaleStorageKey("movies");
console.log(movie);

//get an array of values from movies
const dataFilter = () => {
  for (let i = 0; i < movie.length; i++) {
    //console.log(`Critic Score: ${movies[i].criticScore}, Title: ${movies[i].title}`);
    xBarValues.push(movie[i].domestic);
    //converted to a string to see if the concatination would work still didn't
    yBarValues.push(movie[i].title);
    //doughChart.push(movies[i].genre);
    chartColors.push("black");
    if (movie[i].genre === "action") {
      doughChartData[0]++;
    } else if (movie[i].genre === "comedy") {
      doughChartData[1]++;
    } else if (movie[i].genre === "adventure") {
      doughChartData[2]++;
    } else if (movie[i].genre === "drama") {
      doughChartData[3]++;
    } else if (movie[i].genre === "horror") {
      doughChartData[4]++;
    } else if (movie[i].genre === "concert") {
      doughChartData[5]++;
    }
    scatterValuesCritic.push({
      x: movie[i].criticScore,
      y: movie[i].domestic,
    });
    scatterValuesAudience.push({
      x: movie[i].audienceScore,
      y: movie[i].domestic,
    });
  }
};
dataFilter();
//console.log(xValues);
//console.log(scatterValuesCritic);
//making my chart
const barData = {
  labels: yBarValues,
  datasets: [
    {
      label: "Domestic Gross",
      lineTension: 0,
      backgroundColor: "rgba(143,199,232,1)",
      borderColor: "rgba(108,108,108,1)",
      borderWidth: 1,
      color: "rgba(255,255,255,1)",
      pointBackgroundColor: "#535353",
      data: xBarValues,
    },
  ],
};

const doughnutData = {
  labels: ["Action", "Comedy", "Adventure", "Drama", "Horror", "Concert"],
  datasets: [
    {
      label: "My First Dataset",
      data: doughChartData,
      backgroundColor: [
        " rgb(123, 45, 67)",
        " rgb(255, 200, 100)",
        " rgb(34, 139, 34)",
        " rgb(70, 130, 180)",
        " rgb(220, 20, 60)",
        "rgb(128, 0, 128)",
      ],
      hoverOffset: 4,
    },
  ],
};
const scatterData = {
  datasets: [
    {
      label: "Critic Score",
      data: scatterValuesCritic,
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Audience Score",
      data: scatterValuesAudience,
      backgroundColor: "rgb(70, 130, 180))",
    },
  ],
};

//bar chart

new Chart("myBarChart", {
  type: "bar",
  data: barData,
  options: {
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    responsiveAnimationDuration: 0,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (parseInt(value) >= 1000) {
              return (
                "$" + value.toString().replace(/(?<=\d)0{5,}$/, "00") + "M"
              );
            } else {
              return "$" + value;
            }
          },
        },
      },
    },
  },
});

new Chart("myDoughChart", {
  type: "doughnut",
  data: doughnutData,
});

new Chart("myScatterChart", {
  type: "scatter",
  data: scatterData,
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            if (parseInt(value) >= 1000) {
              return (
                "$" + value.toString().replace(/(?<=\d)0{5,}$/, "00") + "M"
              );
            } else {
              return "$" + value;
            }
          },
        },
      },
    },
  },
});

const clearData = () => {
  xBarValues.length = 0;
  yBarValues.length = 0;
  chartColors.length = 0;
  doughChartData.length = 0;
  scatterValuesCritic.length = 0;
  scatterValuesAudience.length = 0;
};

export const handleChartUpdate = (event) => {
  clearData();
  dataFilter(movie);
  console.log(barData);
  myBarChart.update();
};

//barChart();
//dooNotChart();
//scatterChart();
// const updateBarChart = () => {
//   let newData = barData;
//console.log(barData);

//updateBarChart();
