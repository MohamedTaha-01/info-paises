const calcItemsFrom_Number = (slicedData, currentPage) => {
  let aux = 0;
  for (let j = 0; j < currentPage; j++) {
    aux = slicedData[j].length + aux;
  }
  return aux + 1;
};

const calcItemsTo_Number = (slicedData, currentPage) => {
  let aux = 0;
  for (let j = 0; j < currentPage; j++) {
    aux = slicedData[j].length + aux;
  }
  return aux + slicedData[currentPage].length;
};

export { calcItemsFrom_Number, calcItemsTo_Number };
