import React, { Component } from 'react';

class App extends Component {
    state = {
        lat: 0,
        lon: 0
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

        console.log(json);
        
    }

    render() {

        return (
            <div>
                {/* <button onClick={this.getLocation}>Location for Weather!</button> */}
                <p> Your current coordinates are... </p>
                <p> Latitude: {this.state.lat} </p>
                <p> Longitude: {this.state.lon}</p>
            </div>
        )
    }
}

export default App;