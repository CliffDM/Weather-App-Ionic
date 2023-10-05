import React, { useState, useEffect } from 'react';
import {
  IonInput,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';

const apiKey = '545b8d928ffde592ff164cdc587ec935';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const Home: React.FC = () => {
  const [city, setCity] = useState('Manado');
  const [weather, setWeather] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const fetchWeatherData = async (cityName: string) => {
    try {
      setError(null);
      const response = await fetch(
        `${apiUrl}?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);

     
    } catch (error) {
      setError('City not found');
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Ionic Weather App
            <div style={{ fontSize: '0.8rem', color: 'gray' }}>
              by: Clifford D. Mandagi
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <div
        style={{
          backgroundColor: '#171717',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: "white",
          fontFamily: "sans"
        }}
      >
      {weather.weather && weather.weather[0] && (
        <div style={{ display: 'flex', flexDirection: "column"}}>
        <p style={{ fontSize: '40px', marginBottom: "0px" }}>{weather.main.temp} °C</p>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="Weather Icon"
            style={{width: '200px'}}
          />
            <p style={{textTransform: "capitalize", textAlign: "center", margin: "0px"}}>{weather.weather[0].description}</p>
        </div>
      )}
  
      <IonInput
        label="Masukan Kota"
        labelPlacement="floating"
        value={city}
        onIonChange={(e) => setCity(e.detail.value!.trim())}
        style={{
          width: "300px"
        }}
      />
      {error && (
        <div style={{ marginTop: '10px' }}>
          <IonText color="danger">{error}</IonText>
        </div>
      )}
  </div>
    </IonContent>
  );
};

export default Home;
