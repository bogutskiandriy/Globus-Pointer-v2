import { component$, useStore, useVisibleTask$, } from '@builder.io/qwik';
import { getDistance } from 'geolib';
import dotenv from 'dotenv';
import { MapControls } from './mapControls';
import 'leaflet/dist/leaflet.css';
import './map.css';

dotenv.config();

export const Map = component$(() => {
  const state = useStore({
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

  // Виконується лише в браузері, після рендеру та коли DOM готовий
  useVisibleTask$(async () => {
    // 1. Динамічно імпортуємо leaflet (JS)
    const leafletModule = await import('leaflet');
    const L = leafletModule.default;

    // 2. Шукаємо елемент карти
    const mapElement = document.getElementById('map');
    if (!mapElement || mapElement.dataset.loaded) return;
    mapElement.dataset.loaded = 'true';

    // 3. Ініціалізація карти (Львів)
    const map = L.map(mapElement).setView([49.8397, 24.0297], 10);

    // 4. Додаємо шар OpenStreetMap
    let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // 5. Створюємо «плюсик» у центрі
    const crossIcon = L.divIcon({
      className: 'custom-cross-icon',
      html: '+',
      iconSize: [20, 20],
      iconAnchor: [10, 27],
    });
    const crossMarker = L.marker(map.getCenter(), { icon: crossIcon, interactive: false }).addTo(map);

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

    // --- КОД ДЛЯ ПОГОДИ ---
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
      fetchWeatherData(center.lat, center.lng);
    };

    updateWeather();
    const intervalId = setInterval(updateWeather, 10000);

    // --- Перемикання базових шарів (Esri / OSM) ---
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

    // --- Маркери ---
    let markers: L.Marker[] = [];

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

    // Клік на карту — додати маркер
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (markers.length < 2) {
        const marker = L.marker(e.latlng, { draggable: true }).addTo(map);
        markers.push(marker);
        state.markerCoordinates = `Marker: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;

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

    // Видалення останнього маркера
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

    // При «знятті» компонента очищаємо інтервал
    return () => clearInterval(intervalId);
  }); // <-- виконується на клієнті, коли DOM готовий

  return (
    <div class="flex flex-col items-center m-5">
      <div id="map" class="w-full h-[500px]" />
      <MapControls {...state} />
    </div>
  );
});
