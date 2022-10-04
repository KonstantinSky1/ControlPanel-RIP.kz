export default function createArrayBody(arr) {
  if (arr.length > 0) {
    return arr.slice(1);
  } else {
    return [];
  }
}