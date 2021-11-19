import React, { useState, useEffect } from "react";
require('dotenv').config();

/**
 * Component to display some weather info.
 */
function Weather() {
  const API_KEY = process.env.REACT_APP_VISUAL_CROSSING_API_KEY;
  const API_BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&locationMode=single&contentType=json&unitGroup=us&key="
        + API_KEY;

  let [weather, setWeather] = useState();

  /** Update "weather" state with weather from the zip code provided
   * @param {string} zipcode - zip code to get weather for
   */
  async function updateWeather(zipcode) {
    // Weather API - documentation (free key required to use API)
    // https://www.visualcrossing.com/weather-api
    // https://www.visualcrossing.com/resources/documentation/weather-api/how-to-load-weather-data-in-javascript/
    const apiUrl = API_BASE_URL + "&locations=" + zipcode;
    const weather = await fetch(apiUrl);
    const weatherJson = await weather.json();
    console.log("weatherJson: "); //DBG
    console.log(weatherJson);     //DBG
    setWeather(weatherJson);
  }

  useEffect(() => {
    updateWeather("01984");
    // Not sure why next line gets a warning, but don't add a dependency!
  }, []);  // Final ", []" prevents infinite loop!  See
           // https://reactjs.org/docs/hooks-reference.html#useeffect
           // updateVerse() triggers a re-render, which would cause
           // useEffect() to be called, if the [] didn't say not to.


  /** Return the current temperature in whole degrees.
   * Do not call if "weather" is undefined.
   */
  function CurrentTemp() {
    let tempString = "";
    tempString += Math.round( weather.location.currentConditions.temp );
    tempString += " " + String.fromCharCode(176) + "F";
    return( <em>{tempString}</em> );
  }

  return (
      <p>{weather ? <CurrentTemp/> : "(Loading...)"}</p>
  );
}

export default Weather;
