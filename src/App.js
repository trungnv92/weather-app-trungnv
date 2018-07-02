import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = 'b7d4ccb617e09c234b56b1880c712e85';
class App extends Component {
  state = {
    temputure: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
    const data = await api_call.json();
    console.log(data.cod);
    if(city && country){
      if(data.cod === 200){
        this.setState({
          temputure: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: "",
        })
      }else{
        this.setState({
          temputure: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: data.message,
        })
      }
    }
    else{
      this.setState({
        temputure: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter correct city.",
      })
    }
  }
  render() {
    return (
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-5 title-container'>
                  <Title />
                </div>
                <div className='col-xs-7 form-container'>
                  <Form getWeather={this.getWeather}/>
                  <Weather
                      temputure={this.state.temputure}
                      city={this.state.city}
                      humidity={this.state.humidity}
                      country={this.state.country}
                      description={this.state.description}
                      error={this.state.error}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;