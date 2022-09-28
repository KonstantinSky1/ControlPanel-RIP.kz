export default function generateUniqId() {
  let sum = 0;

  var array = new Uint32Array(10);

  window.crypto.getRandomValues(array);

  for (var i = 0; i < array.length; i++) {
    sum = sum + array[i]
  }

  return sum;
}