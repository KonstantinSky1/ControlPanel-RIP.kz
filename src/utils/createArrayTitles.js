export default function createArrayTitles(arr) {
  if (arr.length >0) {
    let obj = arr[0];

    return Object.entries(obj);
  } else {
    return [];
  }
}