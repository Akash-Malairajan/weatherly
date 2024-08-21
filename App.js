import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";

const API_KEY = "b21134d557e1aa0c338d3d6445ed843e"; // Replace with your OpenWeatherMap API key

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [description, setDescription] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [icon, setIcon] = useState(null);

  const getWeather = () => {
    if (city.trim() === "") {
      setWeather("Please enter a city");
      setTemperature(null);
      setVisibility(null);
      setFeelsLike(null);
      setHumidity(null);
      setDescription(null);
      setWindSpeed(null);
      setIcon(null);
    } else {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
        .then((response) => {
          const { description, icon } = response.data.weather[0];
          const temp = response.data.main.temp;
          const humidity = response.data.main.humidity;
          const feels_like = response.data.main.feels_like;
          const speed = response.data.wind.speed;
          const visibility = response.data.visibility;

          setWeather(description);
          setTemperature(`${temp}°C`);
          setFeelsLike(`${feels_like}°C`);
          setVisibility(`${visibility / 1000} km`);
          setHumidity(`${humidity}%`);
          setDescription(description);
          setWindSpeed(`${speed} m/s`);
          setIcon(`https://openweathermap.org/img/wn/${icon}.png`);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error.message); // Improved error logging
          setWeather("Failed to fetch weather data. Please check the city name and try again.");
          setTemperature(null);
          setVisibility(null);
          setFeelsLike(null);
          setHumidity(null);
          setDescription(null);
          setWindSpeed(null);
          setIcon(null);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Weather App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
          {city}
        </Text>
        <View style={styles.logo}>
          {icon && (
            <Image
              style={{ width: 120, height: 120 }}
              source={{ uri: icon }}
            />
          )}
          <Text
            style={{
              fontSize: 23,
              marginRight: 14,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {temperature}
          </Text>
        </View>
        <Text style={styles.description}>{weather}</Text>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              style={styles.smallIcon}
              source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/thermometer.png' }}
            />
            <Text style={styles.infoText}>{feelsLike}</Text>
            <Text style={styles.infoText}>Feels Like</Text>
          </View>
          <View style={styles.info}>
            <Image
              style={styles.smallIcon}
              source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/humidity.png' }}
            />
            <Text style={styles.infoText}>{humidity}</Text>
            <Text style={styles.infoText}>Humidity</Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              style={styles.smallIcon}
              source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/visibility.png' }}
            />
            <Text style={styles.infoText}>{visibility}</Text>
            <Text style={styles.infoText}>Visibility</Text>
          </View>
          <View style={styles.info}>
            <Image
              style={styles.smallIcon}
              source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/wind-speed.png' }}
            />
            <Text style={styles.infoText}>{windSpeed}</Text>
            <Text style={styles.infoText}>Wind Speed</Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={getWeather}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightyellow",
    width: "90%",
    height: "80%",
    marginLeft: "5%",
    marginTop: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#D0EAFA",
    width: "100%",
    paddingVertical: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  weatherText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  temperatureText: {
    marginLeft: 150,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  description: {
    textAlign: "center",
    fontSize: 20,
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
  },
  info: {
    backgroundColor: "#D0EAFA",
    padding: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  smallIcon: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
