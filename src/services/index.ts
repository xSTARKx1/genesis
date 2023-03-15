export const createArray = (int: number) => {
  const arr: number[] = [];

  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }

  return arr;
};
