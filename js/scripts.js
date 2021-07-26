const startApp = () => {
  const cityInput = document.getElementById('city-name');
  const searchBtn = document.getElementById('search-btn');
  const formError = document.querySelector('.form-error');

  const cardLoading = document.querySelector('.card-loading');
  const cardWeather = document.querySelector('.card__weather');
  const cardCity = document.querySelector('.card__city');
  const cardDegree = document.querySelector('.card__degree__value');
  const cardFeelsLike = document.querySelector('.feels-like');
  const cardWind = document.querySelector('.wind');
  const cardHumidity = document.querySelector('.humidity');

  function toggleErrorMessage(text) {
    formError.textContent = text;
    formError.classList.toggle('hidden')
  }

  function toggleLoad() {
    cardLoading.classList.toggle('hidden');
  }

  const searchWeather = async (city) => {
    try {
      toggleLoad();
      const searchQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ef2baee52d51ed3ba7f6526f591cbe2e`;
      const response = await fetch(searchQuery, {
        mode: 'cors'
      });
      const weatherData = await response.json();
      if (response.status === 404) {
        toggleLoad();
        toggleErrorMessage(response.statusText)
      } else {
        cardWeather.textContent = weatherData.weather[0].main;
        cardCity.textContent = weatherData.name;
        cardDegree.textContent = weatherData.main.temp;
        cardFeelsLike.textContent = weatherData.main.feels_like;
        cardWind.textContent = weatherData.wind.speed;
        cardHumidity.textContent = weatherData.main.humidity;
        toggleLoad()
      }
    } catch (error) {
      toggleLoad();
      toggleErrorMessage('error: ' + error);
    }
  };

  cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });

  searchBtn.addEventListener('click', () => {
    if (cityInput.value == '') {
      toggleErrorMessage('Please enter city name');
    } else {
      const cityValue = cityInput.value;
      searchWeather(cityValue);
    }
  });

  searchWeather('istanbul') //default
}

startApp();