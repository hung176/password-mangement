function arrangeArray (arr) {
  const newArray = arr.map(val => parseInt(val));
  for(let i = 1; i <= newArray.length - 1; i++) {
    newArray[i] = newArray[i - 1] + 1;
  }
  return newArray;
}

export { arrangeArray };