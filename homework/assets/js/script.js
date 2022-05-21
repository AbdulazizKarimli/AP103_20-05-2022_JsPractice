const searchInp = document.querySelector("input[type='text']");
const selectBox = document.querySelector(".form-select");
const form = document.querySelector("form");
const resultBox = document.querySelector(".result-box");

async function getDataAsync(url) {
  let promise = await fetch(url);
  let response = await promise.json();

  let responseObj = {
    statusCode: promise.status,
    response,
  };

  return responseObj;
}

form.addEventListener("submit", search);

async function search(e) {
  e.preventDefault();

  let result = await getDataAsync(
    `https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=${searchInp.value}`
  );

  if (result.statusCode === 200) {
    resultBox.innerHTML = `
      <p>City: <span class="cityName">${
        result.response.location.name
      }</span></p>
      <p>Country: <span class="countryName">${
        result.response.location.country
      }</span></p>
      <p>Weather Forecast: <span class="weatherForecast">${
        result.response.current[selectBox.value]
      }</span></p>
      <p>
        Sky Condition: <span class="img"> <img src="https:${
          result.response.current.condition.icon
        }" /> </span> <span class="text"> ${
      result.response.current.condition.text
    }</span>
      </p>
      `;
  } else {
    resultBox.innerHTML = "<p class='text-danger mt-4'>Not Found!!!</p>";
  }
}
