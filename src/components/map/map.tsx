import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import L from 'leaflet';
import { getDistance } from 'geolib';
import dotenv from "dotenv";
import { MapControls } from './mapControls';
import 'leaflet/dist/leaflet.css';
import './map.css';

dotenv.config();

export const Map = component$(() => {
  // Глобальний стан, включаючи дані про погоду
  const state = useStore<{
    centerCoordinates: string;
    markerCoordinates: string;
    useEsri: boolean;
    distance: string;
    weather: any;
    // Додаткові поля для погоди
    temperature: string;
    windspeed: string;
    winddirection: string;
    is_day: string;
  }>({
    centerCoordinates: 'Center: 0, 0',
    markerCoordinates: 'Marker: 0, 0',
    useEsri: true,
    distance: 'Distance: 0 m',
    weather: null,
    temperature: 'Temperature: 0 °C',
    windspeed: 'Windspeed: 0 km/h',
    winddirection: 'Wind direction: 0°',
    is_day: 'Day',
  });

  useVisibleTask$(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement || mapElement.dataset.loaded) return;
    mapElement.dataset.loaded = 'true';

    // Ініціалізація карти (початковий вигляд для Львова)
    const map = L.map(mapElement).setView([49.8397, 24.0297], 10);

    // Додавання шару OpenStreetMap
    let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Створення центрального маркера з плюсом
    const crossIcon = L.divIcon({
      className: 'custom-cross-icon',
      html: '+',
      iconSize: [20, 20],
      iconAnchor: [10, 27],
    });
    const crossMarker = L.marker(map.getCenter(), { icon: crossIcon, interactive: false }).addTo(map);

    // Функція оновлення координат центру карти
    const updateCenterCoordinates = () => {
      const center = map.getCenter();
      const { lat, lng } = center;
      state.centerCoordinates = `Center: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      crossMarker.setLatLng(center);
    };

    map.on('move', updateCenterCoordinates);
    map.on('moveend', updateCenterCoordinates);
    map.on('zoomend', updateCenterCoordinates);

    updateCenterCoordinates();

    // --- Код для оновлення даних погоди ---
    const fetchWeatherData = async (lat: number, lng: number) => {
      try {
        const response = await fetch("http://localhost:8000/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude: lat, longitude: lng }),
        });
        if (!response.ok) {
          console.error("Failed to fetch weather data");
          return;
        }
        const result = await response.json();
        // Очікуємо, що API повертає об'єкт з властивістю current_weather
        const current = result.current_weather;
        if (current) {
          state.weather = current;
          state.temperature = `Temperature: ${current.temperature} °C`;
          state.windspeed = `Windspeed: ${current.windspeed} km/h`;
          state.winddirection = `Wind direction: ${current.winddirection}°`;
          state.is_day = current.is_day ? 'Day' : 'Night';
        }
        console.log("Weather updated:", result);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    const updateWeather = () => {
      const center = map.getCenter();
      const { lat, lng } = center;
      fetchWeatherData(lat, lng);
    };

    updateWeather();
    const intervalId = setInterval(updateWeather, 10000); // оновлення кожні 10 секунд
    // --- Кінець коду для погоди ---

    // Перемикання базових шарів (Esri/OSM)
    const switchLayer = () => {
      map.removeLayer(tileLayer);
      state.useEsri = !state.useEsri;
      tileLayer = L.tileLayer(
        state.useEsri
          ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution: state.useEsri ? '&copy; Esri' : '&copy; OpenStreetMap' }
      ).addTo(map);
    };
    document.getElementById('switch-map-button')?.addEventListener('click', switchLayer);

    // Масив для збереження маркерів
    let markers: L.Marker[] = [];

    // Функція для обчислення відстані між маркерами
    const updateDistance = () => {
      if (markers.length === 2) {
        const latlng1 = markers[0].getLatLng();
        const latlng2 = markers[1].getLatLng();
        const distance = getDistance(
          { latitude: latlng1.lat, longitude: latlng1.lng },
          { latitude: latlng2.lat, longitude: latlng2.lng }
        );
        state.distance = `Distance: ${distance} m`;
      } else {
        state.distance = '';
      }
    };

    // Додавання маркера при кліку на карту (якщо їх менше двох)
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (markers.length < 2) {
        const marker = L.marker(e.latlng, { draggable: true }).addTo(map);
        markers.push(marker);
        state.markerCoordinates = `Marker: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;

        // Видалення маркера при кліку
        marker.on('click', () => {
          map.removeLayer(marker);
          markers = markers.filter(m => m !== marker);
          state.markerCoordinates = markers.length ? 'Marker: 0, 0' : '';
          updateDistance();
        });

        // Оновлення координат після перетягування маркера
        marker.on('dragend', (event) => {
          const { lat, lng } = event.target.getLatLng();
          state.markerCoordinates = `Marker: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          updateDistance();
        });
        updateDistance();
      }
    });

    // Додавання маркера по кнопці
    document.getElementById('add-marker-button')?.addEventListener('click', () => {
      if (markers.length < 2) {
        const center = map.getCenter();
        const marker = L.marker(center, { draggable: true }).addTo(map);
        markers.push(marker);
        state.markerCoordinates = `Marker: ${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`;

        marker.on('click', () => {
          map.removeLayer(marker);
          markers = markers.filter(m => m !== marker);
          state.markerCoordinates = markers.length ? 'Marker: 0, 0' : '';
          updateDistance();
        });

        marker.on('dragend', (event) => {
          const { lat, lng } = event.target.getLatLng();
          state.markerCoordinates = `Marker: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          updateDistance();
        });
        updateDistance();
      }
    });

    // Видалення останнього маркера по кнопці
    document.getElementById('delete-marker-button')?.addEventListener('click', () => {
      if (markers.length > 0) {
        const lastMarker = markers.pop();
        if (lastMarker) {
          map.removeLayer(lastMarker);
          state.markerCoordinates = markers.length ? 'Marker: 0, 0' : '';
          updateDistance();
        }
      }
    });

    // Очищення інтервалу при виході
    return () => clearInterval(intervalId);
  });

  return (
    <div class="flex flex-col items-center m-5">
      <div id="map" class="w-full h-[500px]" />
      <MapControls
        useEsri={state.useEsri}
        centerCoordinates={state.centerCoordinates}
        markerCoordinates={state.markerCoordinates}
        distance={state.distance}
        weather={state.weather}
        temperature={state.temperature}
        windspeed={state.windspeed}
        winddirection={state.winddirection}
        is_day={state.is_day}
      />
    </div>
  );
});
