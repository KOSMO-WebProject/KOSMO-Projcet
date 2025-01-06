const axios = require("axios");

// 날씨 정보 API
const getWeather = async (req, res) => {
  const { city } = req.query; // 도시 이름을 요청에서 받아옴

  if (!city) {
    return res.status(400).json({ message: "도시 이름을 입력해주세요." });
  }

  try {
    // OpenWeather API 호출
    const apiKey = "b0f20cdb4b9b1af2ef553dc1416a11c2"; //process.env.OPENWEATHER_API_KEY; // .env에 API 키 저장
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

    // OpenWeather로부터 날씨 데이터 가져오기
    const weatherResponse = await axios.get(weatherUrl);

    const weatherData = weatherResponse.data;

    // 필요한 데이터만 응답
    const weatherInfo = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`, // 날씨 아이콘
    };

    res.status(200).json(weatherInfo);
  } catch (error) {
    console.error(
      "날씨 정보 가져오기 실패:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error:
        "날씨 정보를 가져오는 데 실패했습니다." + error.response?.data ||
        error.message,
    });
  }
};

module.exports = {
  getWeather,
};
