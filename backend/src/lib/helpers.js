const ctrl = {};

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const months = ['January','February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const randomClouds = ['broken-clouds', 'sunny', 'raining', 'few-clouds', 'scattered-clouds']

const randomTempvalues = [24, -2, 10, 7, 32, 15, 27, 16, 7, -5]

//return Ejemplo: Monday, March 31, 2020
ctrl.format = date => {
    const newDate = new Date(date);
    const dayWeek = daysOfWeek[newDate.getDay()];
    const month = months[newDate.getMonth()];
    const dateNumber = newDate.getDate();
    const year = newDate.getFullYear();
    return `${dayWeek}, ${month} ${dateNumber}, ${year}`;
}

//return Monday, Tuesday, Wednesday tres dias posteriores a hoy
ctrl.getThreeDays = date => {
    const newDate = new Date(date);
    const oneDay = daysOfWeek[(newDate.getDay() + 1) % daysOfWeek.length];
    const twoDays = daysOfWeek[(newDate.getDay() + 2) % daysOfWeek.length];
    const threeDays = daysOfWeek[(newDate.getDay() + 3) % daysOfWeek.length];
    return {oneDay, twoDays, threeDays}
}

// return "weather":["storm.ico","sunny.ico","sunny.ico"],"temp":[-5,7,32]
ctrl.getThreDaysRandomWeather = (protocol,host) => {
    const URL_SERVER_IMAGES = `${protocol}://${host}/public`;

    let weather = []
    temp = []
    for (let index = 0; index < 3; index++) {
        weather.push(`${URL_SERVER_IMAGES}/icons/${randomClouds[Math.floor(Math.random() * randomClouds.length)]}.ico`)
    }

    for (let index = 0; index < 3; index++) {
        temp.push(randomTempvalues[Math.floor(Math.random() * randomTempvalues.length)])
    }

    return {
        weather: weather,
        temp: temp
    }
}

module.exports = ctrl;