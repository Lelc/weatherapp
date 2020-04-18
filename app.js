window.addEventListener("load", () => {
  let long;
  let lat;
  const locationTimezone = document.querySelector(".location-timezone");
  const weatherIcon = document.querySelector(".weather-icon");
  const degreeSection = document.querySelector(".degree-section");
  const degreeSectionSpan = document.querySelector(".degree-section span");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const temperatureDesciption = document.querySelector(
    ".temperature-description"
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherapi.com/v1/forecast.json?key=db7b1a54604c437b85a81713201804&q=${lat}, ${long}&days=1`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_c, temp_f, condition } = data.current;
          // set DOM elements from API
          temperatureDegree.textContent = temp_c;
          temperatureDesciption.textContent = condition.text;
          locationTimezone.textContent = data.location.tz_id;
          weatherIcon.innerHTML = '<img src="' + condition.icon + '" />';

          degreeSection.addEventListener("click", () => {
            if (degreeSectionSpan.textContent === "°C") {
              degreeSectionSpan.textContent = "°F";
              temperatureDegree.textContent = temp_f;
            } else {
              degreeSectionSpan.textContent = "°C";
              temperatureDegree.textContent = temp_c;
            }
          });
        });
    });
  } else {
    alert("Your browser doesn't support geolocation");
  }
});
