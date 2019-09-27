import React, { Component } from "react";
import "./MainPage.css";
import SideBar from "../SideBar/SideBar";
import { connect } from "react-redux";
import { setCity } from "../../store/actions";
import WeatherInfo from "../WeatherInfo/WeatherInfo";

const API_KEY = "1cb9b090e2784b370f4d38bb82f7f181";

class MainPage extends Component {
  state = {
    weatherValues: {
      temp: undefined,
      city: undefined,
      humidity: undefined,
      country: undefined,
      sunrise: undefined,
      sunset: undefined,
      pressure: undefined,
      weatherDesc: undefined,
      error: undefined
    }
  };

  componentWillReceiveProps() {
    this.getWeather();
  }
  getWeather = async e => {
    console.log(this.props.currentCity);
    if (this.props.currentCity !== undefined) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.props.currentCity}&appid=${API_KEY}&units=metric`
      )
        .then(response => response.json())
        .then(data => {
          console.log(data, "NEW API!!!!!");
          /*SUNSET CALCULATING */
          let sunset = data.sys.sunset;
          var sunsetDate = new Date(sunset * 1000);
          // Hours part from the timestamp
          var sunsetHours = sunsetDate.getHours();
          // Minutes part from the timestamp
          var sunsetMinutes = "0" + sunsetDate.getMinutes();
          // Seconds part from the timestamp
          var sunsetSeconds = "0" + sunsetDate.getSeconds();
          var sunsetDate = sunsetHours + ":" + sunsetMinutes.substr(-2);

          /*SUNRISE CALCULATING */
          let sunrise = data.sys.sunrise;
          var sunriseDate = new Date(sunrise * 1000);
          // Hours part from the timestamp
          var sunriseHours = sunriseDate.getHours();
          // Minutes part from the timestamp
          var sunriseMinutes = "0" + sunriseDate.getMinutes();
          // Seconds part from the timestamp
          var sunriseSeconds = "0" + sunriseDate.getSeconds();
          var sunriseDate = sunriseHours + ":" + sunriseMinutes.substr(-2);

          this.setState({
            weatherValues: {
              temp: data.main.temp,
              city: data.name,
              humidity: data.main.humidity,
              country: data.sys.country,
              sunrise: sunriseDate,
              sunset: sunsetDate,
              pressure: data.main.pressure,
              weatherDesc: data.weather[0].description,
              error: undefined
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({
        weatherValues: {
          error: "Введите название города!"
        }
      });
    }
  };
  render() {
    return (
      <div className="mainPage-container">
        <SideBar></SideBar>
        {this.props.currentCity && <WeatherInfo weatherValues={this.state.weatherValues}></WeatherInfo>}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    currentCity: state.currentCity
  };
};

const mapDispatchToProps = {
  setCity
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default enhancer(MainPage);
