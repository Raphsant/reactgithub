import React from "react";
import "../weather.css";
const conditions = (props) => {
  return (
    <div className="weather-info">
      {props.responseObj.cod === 200 ? (
        <div>
          <h1>Today's weather in {props.responseObj.name}</h1>
          <div>
            <h2>{Math.round(props.responseObj.main.temp)} degrees </h2>
            <h4>
              ({Math.round(props.responseObj.main.temp_max)} |{" "}
              {Math.round(props.responseObj.main.temp_min)}){" "}
            </h4>
            <h3 className="weather-info__description">
              {props.responseObj.weather[0].description}.
            </h3>
            <div className="weather-info__additional">
              Feels like: {Math.round(props.responseObj.main.feels_like)}
            </div>
            <div className="weather-info__additional">
              Pressure: {Math.round(props.responseObj.main.pressure)}
            </div>
            <div className="weather-info__additional">
              Humidity: {Math.round(props.responseObj.main.humidity)}
            </div>
            <div className="weather-info__additional"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default conditions;
