import React, { Component } from 'react';

class App extends Component {
    state = {
        lat: 0,
        lon: 0,
        data: null
    }

    componentDidMount() {
        this.getLocation();
    }    

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    showPosition = (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        this.setState({
            lat,
            lon 
        })

        this.getWeather(lat, lon);
    }

    getWeather = async (lat, lon) => {
        let fetchData = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
        let json = await fetchData.json();

        this.setState({
            location: `${json.name} ${json.sys.country}`,
            data: json
        })      

        console.log(json);
    }

    render() {
        let json = this.state.data;
        let info = null;
        if( json != null ) {
            console.log('TRUE')
            let weather = json.weather[0];
            let temp = json.main.temp;
            let weatherIcon = <img src={weather.icon} ></img>;
            info = <div>
                {weather.main} 
                <br/>
                {weather.description}
                <br/>
                {weatherIcon} 
                <br/>
                {temp} celcius
            </div>
        }

        console.log(info, this.state);

        return (
            <div>
                {/* <button onClick={this.getLocation}>Location for Weather!</button> */}
                <p> Location: {this.state.location}</p>
                <p> Your current coordinates are... </p>
                <p> Latitude: {this.state.lat} </p>
                <p> Longitude: {this.state.lon}</p>
                {info}
            </div>
        )
    }
}

export default App;