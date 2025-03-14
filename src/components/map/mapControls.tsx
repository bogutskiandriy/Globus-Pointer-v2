import { component$ } from '@builder.io/qwik';

interface MapControlsProps {
  centerCoordinates: string;
  markerCoordinates: string;
  distance: string;
}

export const MapControls = component$((props: MapControlsProps) => {
  return (
    <div class="flex flex-col mt-4 text-center">
      
      <div class="flex justify-center flex-wrap">
        <button
          id="switch-map-button"
          class="cursor-pointer mr-2 mb-2 transition-all bg-gray-500 text-white px-6 py-2 rounded-lg border-gray-600 border-b-4 hover:brightness-110 hover:-translate-y-1 hover:border-b-6 active:border-b-2 active:brightness-90 active:translate-y-2"
        >
          Switch Map
        </button>
        <button
          id="add-marker-button"
          class="cursor-pointer mr-2 mb-2 transition-all bg-gray-500 text-white px-6 py-2 rounded-lg border-gray-600 border-b-4 hover:brightness-110 hover:-translate-y-1 hover:border-b-6 active:border-b-2 active:brightness-90 active:translate-y-2"
        >
          Add Marker
        </button>
        <button
          id="delete-marker-button"
          class="cursor-pointer mb-2 transition-all bg-gray-500 text-white px-6 py-2 rounded-lg border-gray-600 border-b-4 hover:brightness-110 hover:-translate-y-1 hover:border-b-6 active:border-b-2 active:brightness-90 active:translate-y-2"
        >
          Delete Marker
        </button>
      </div>

      <div class="mt-2">{props.centerCoordinates}</div>
      {props.markerCoordinates && <div>{props.markerCoordinates}</div>}
      {props.distance && <div>{props.distance}</div>}
    </div>
  );
});
