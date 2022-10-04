//функция чтобы добавить недостающие ключи из первого объекта в массиве во все остальные (на случай если в файле Excel не все ячейки заполнены)
//первый объект - это заголовки тадлицы, его используем как эталон
export default function addKeysToObjects(arr) {
  if (arr.length > 0) {
    let standart = Object.keys(arr[0]); //массив ключей объекта с индексом 0 (эталон)

    arr.forEach(obj => {
      for (let i=1; i<standart.length; i++) {
        if (!obj.hasOwnProperty(standart[i])) {
          obj[standart[i]] = '';
        }
      }
    });

    return arr;
  }
}