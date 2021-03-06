var request = require('request');

let weather = (city, callback) => {
	// get the URL
	var url = 'http://api.weatherstack.com/current?access_key=d201db4dfa070ef3f78d16bd7982101d&query='+ city +'&units=f';
	
	request({url: url, json: true}, (error, response) => {
		if(error)
		{
			//low level error
			callback("Unable to connect to the Weather API");
		}
		else if(response.body.error)
		{
			// API level error
			callback(`${response.body.error.info}`);
		}
		else
		{
			// if there is no error, generate the data to the callback
			callback(undefined, {
				city: response.body.location.name,
				state: response.body.location.region,
				currentDescription: response.body.current.weather_descriptions[0],
				currentTemp: response.body.current.temperature,
				feelsLikeTemp: response.body.current.feelslike,
				latitude: response.body.location.lat,
				longitude: response.body.location.lon,
				currentTime: response.body.location.localtime
			});
		}
	});
};


/* let weather = (city, callback) => {
	// get the URL
	var url = 'http://api.weatherstack.com/current?access_key=d201db4dfa070ef3f78d16bd7982101d&query='+ city +'&units=f';
	
	request({url: url, json: true}, (error, {body}) => {
		if(error)
		{
			//low level error
			callback("Unable to connect to the Weather API");
		}
		else if(body.error)
		{
			// API level error
			callback(`${body.error.info}`);
		}
		else
		{
			// if there is no error, generate the data to the callback
			callback(undefined, {
				city: body.location.name,
				state: body.location.region,
				currentDescription: body.current.weather_descriptions[0],
				currentTemp: body.current.temperature,
				feelsLikeTemp: body.current.feelslike,
				latitude: body.location.lat,
				longitude: body.location.lon,
				currentTime: body.location.localtime
			});
		}
	});
}; */
module.exports = weather;