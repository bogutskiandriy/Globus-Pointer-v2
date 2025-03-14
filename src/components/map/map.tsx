import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import L from 'leaflet';
import { getDistance } from 'geolib';
import { MapControls } from './mapControls';
import 'leaflet/dist/leaflet.css';
import './map.css';

export const Map = component$(() => {
    
  // Загальний стан для координат, перемикання шару та обчисленої відстані
  const state = useStore<{
    centerCoordinates: string;
    markerCoordinates: string;
    useEsri: boolean;
    distance: string;
  }>({
    centerCoordinates: 'Center: 0, 0',
    markerCoordinates: 'Marker: 0, 0',
    useEsri: true,
    distance: 'Distance: 0 m',
  });

  useVisibleTask$(() => {
    const mapElement = document.getElementById('map');
    if (!mapElement || mapElement.dataset.loaded) return;
    mapElement.dataset.loaded = 'true';

    // Ініціалізація карти
    const map = L.map(mapElement).setView([50.4501, 30.5234], 12);

    let tileLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: '&copy; Esri' }
    ).addTo(map);

    // Функція перемикання шару базової карти
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

    // Подія для кнопки перемикання базової карти
    document.getElementById('switch-map-button')?.addEventListener('click', switchLayer);

    // Створення центрального маркера із плюсом
    const crossIcon = L.divIcon({
      className: 'custom-cross-icon',
      html: '+',
      iconSize: [20, 20],
      iconAnchor: [10, 27],
    });
    const crossMarker = L.marker(map.getCenter(), { icon: crossIcon, interactive: false }).addTo(map);

    // Оновлення координат центру карти та положення центрального маркера
    const updateCenterCoordinates = () => {
      const { lat, lng } = map.getCenter();
      state.centerCoordinates = `Center: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      crossMarker.setLatLng(map.getCenter());
    };
    map.on('move', updateCenterCoordinates);
    map.on('moveend', updateCenterCoordinates);
    map.on('zoomend', updateCenterCoordinates);

    // Масив для збереження доданих маркерів
    let markers: L.Marker[] = [];

    // Функція для обчислення відстані між двома маркерами за допомогою geolib
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

    // Додавання маркера за кліком по карті (якщо маркерів менше двох)
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

    // Додавання маркера за кліком на кнопку
    document.getElementById('add-marker-button')?.addEventListener('click', () => {
      if (markers.length < 2) {
        const center = map.getCenter();
        const marker = L.marker(center, { draggable: true }).addTo(map);
        markers.push(marker);
        state.markerCoordinates = `Marker: ${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`;

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

    // Видалення останнього маркера за кліком на кнопку
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
  });

  return (
    <div class="flex flex-col items-center m-5">
      <div id="map" class="w-full h-[500px]" />
      <MapControls
        centerCoordinates={state.centerCoordinates}
        markerCoordinates={state.markerCoordinates}
        distance={state.distance}
      />
    </div>
  );
});
