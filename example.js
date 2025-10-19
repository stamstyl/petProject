// find duplicates

function dups(array) {
  const numCount = { dups: {} };

  array.forEach((i, index) => {
    if (!numCount.hasOwnProperty(i)) {
      numCount[i] = 1;
    } else {
      numCount[i]++;
      if (!numCount.dups.hasOwnProperty(i)) {
        numCount.dups[i] = [index];
      } else {
        numCount.dups[i].push(index);
      }
    }
  });
  return numCount;
}

const num = [5, 4, 784, 5, 4, 4, 6, 3, 9, 9];

console.table(dups(num));
