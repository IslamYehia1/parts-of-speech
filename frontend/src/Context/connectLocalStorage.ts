export function fetchFromStorage(dataPoints: string[]) {
  let data: { [key: string]: string | null } = {};
  for (const dataPoint of dataPoints) {
    const result = localStorage.getItem(dataPoint);
    data[dataPoint] = result;
  }
  return data;
}

export function removeFromStorage(dataPoints: string[]) {
  for (const dataPoint of dataPoints) {
    localStorage.removeItem(dataPoint);
  }
}

export function setStorage(dataPoints: Array<{ item: string; value: string }>) {
  for (const dataPoint of dataPoints) {
    localStorage.setItem(dataPoint.item, dataPoint.value);
  }
}
