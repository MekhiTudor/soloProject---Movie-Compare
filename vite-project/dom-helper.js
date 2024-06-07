import { Chart } from "chart.js";
//import { barChart } from "./charts";
import { handleChartUpdate } from "./charts";
import movies from "../movie-data.json";
import { setLocaleStorageKey } from "./locale-storage";
import { getLocaleStorageKey } from "./locale-storage";
//import { barData } from "./charts";

//import { updateBarChart } from "./charts";
//if there is no movies in local storage set movies to locale storage
if (!getLocaleStorageKey("movies")) {
  setLocaleStorageKey("movies", movies);
}

const makeMovieCard = (movie) => {
  const { title, criticScore, audienceScore, domestic, genre } = movie;

  const li = document.createElement("li");
  const movieContainer = document.createElement("div");
  const textContainer = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const titleH3 = document.createElement("h3");
  const criticP = document.createElement("p");
  const genreP = document.createElement("p");
  const domesticP = document.createElement("p");
  const audienceScoreP = document.createElement("p");

  li.append(movieContainer);
  movieContainer.append(imgContainer, textContainer);
  imgContainer.append(img);
  textContainer.append(titleH3, criticP, genreP, domesticP, audienceScoreP);

  li.classList.add("movie-card");
  imgContainer.classList.add("img-container");
  textContainer.classList.add("text-container");
  titleH3.classList.add("title-text");
  criticP.classList.add("caption-text");
  genreP.classList.add("caption-text");
  domesticP.classList.add("caption-text");
  audienceScoreP.classList.add("caption-text");

  titleH3.textContent = title;
  criticP.textContent = `Critic score: ${criticScore}`;
  genreP.textContent = `Genre: ${genre}`;
  domesticP.textContent = `Domestic Total: ${domestic}`;
  audienceScoreP.textContent = `Audience score: ${audienceScore}`;

  document.querySelector("#movie-list").append(li);
  //console.log(document.querySelector("#movie-list"));
};

const initMovieCard = () => {
  getLocaleStorageKey("movies").forEach(makeMovieCard);
};

const handleMovieSubmit = (event) => {
  event.preventDefault();
  // const myBarChart = document.querySelector("#myBarChart");
  const form = event.target;
  const title = form.movieTitle.value;
  const criticScore = form.criticScore.value;
  const audienceScore = form.audienceScore.value;
  const domestic = form.domesticSales.value;
  const genre = form.genre.value;

  makeMovieCard({
    title,
    criticScore,
    audienceScore,
    domestic,
    genre,
  });
  const movies = getLocaleStorageKey("movies");
  movies.push({
    title,
    criticScore,
    audienceScore,
    domestic,
    genre,
  });
  setLocaleStorageKey("movies", movies);
  //myBarChart.remove();
  //barChart();

  // console.log(barData);
  //updateBarChart();

  // barChart.config.data = barData;
  // barChart.update();
  //console.log(getLocaleStorageKey("movies"));
  form.reset();
};

const resetButtonHelper = (event) => {
  event.preventDefault();
  localStorage.clear();
  setLocaleStorageKey("movies");
};

// export default initMovieCard();
// export default handleMovieSubmit()
// export default handleChartUpdate()
// export default resetButtonHelper()
const main = () => {
  initMovieCard();
  document.querySelector("form").addEventListener("submit", handleMovieSubmit);
  document.querySelector("form").addEventListener("submit", handleChartUpdate);
  document.querySelector("#reset").addEventListener("click", resetButtonHelper);
};

main();
