export const SplitIntoPairs = (data) => {
    const dividedData = [];
    for (let i = 0; i < data.length; i += 2) {
        const pair = data.slice(i, i + 2);
        dividedData.push(pair);
      }
      return dividedData;
}


