export default function validateCemeteryCoordinates(data) {
  for (let i=0; i<data.length; i++) {
    if (!(/^[\-\+]?[0-9]+\.[0-9]+$/.test(data[i].cemetery_coordinates_latitude) && /^[\-\+]?[0-9]+\.[0-9]+$/.test(data[i].cemetery_coordinates_longitude))) {
      return false;
    }
  }

  return true;
}