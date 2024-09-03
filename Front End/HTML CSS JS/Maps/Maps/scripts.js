mapboxgl.accessToken =
  "pk.eyJ1Ijoic2lkZGhhbnRnMjAwMiIsImEiOiJjbHR2NHh6NXkxODlmMmtxcDE0b2lrb3FnIn0.EyJofCkmeIqiMJ2PlJoVcw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/standard",
  projection: "globe", // Display the map as a globe, since satellite-v9 defaults to Mercator
  zoom: 9,
  center: [77.209, 28.6139],
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.enable();
const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })
map.addControl(directions, "top-left")

map.on("style.load", () => {
  map.setFog({}); // Set the default atmosphere style
});

// The following values can be changed to control rotation speed:

// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = 240;
// Above zoom level 5, do not rotate.
const maxSpinZoom = 5;
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 3;

let userInteracting = false;
const spinEnabled = true;

function spinGlobe() {
  const zoom = map.getZoom();
  if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    let distancePerSecond = 360 / secondsPerRevolution;
    if (zoom > slowSpinZoom) {
      // Slow spinning at higher zooms
      const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
      distancePerSecond *= zoomDif;
    }
    const center = map.getCenter();
    center.lng -= distancePerSecond;
    // Smoothly animate the map over one second.
    // When this animation is complete, it calls a 'moveend' event.
    map.easeTo({ center, duration: 1000, easing: (n) => n });
  }
}

// Pause spinning on interaction
map.on("mousedown", () => {
  userInteracting = true;
});
map.on("dragstart", () => {
  userInteracting = true;
});

// When animation is complete, start spinning if there is no ongoing interaction
map.on("moveend", () => {
  spinGlobe();
});

spinGlobe();
