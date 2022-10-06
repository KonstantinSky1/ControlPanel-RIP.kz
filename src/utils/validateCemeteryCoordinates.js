export default function validateCemeteryCoordinates(data) {
  for (let i=0; i<data.length; i++) {
    console.log(data[i])
    if (!(/^[\-\+]?[0-9]+\.[0-9]+$/.test(data[i].cemetery_coordinates_latitude)) && !(/^[\-\+]?[0-9]+\.[0-9]+$/.test(data[i].cemetery_coordinates_longitude))) { // доделать!!!!!
      console.log('false')
      return false;
    }
  }
  console.log('true')
  return true;
}