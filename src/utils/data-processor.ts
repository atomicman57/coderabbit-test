// Data processor with performance and other issues
export class DataProcessor {
  // Method with nested loops - inefficient, will be flagged
  processLargeDataset(data: number[][]) {
    const results = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        for (let k = 0; k < 1000; k++) {
          // Unnecessary loop
          if (data[i][j] % 2 == 0) {
            results.push(data[i][j] * k);
          }
        }
      }
    }

    return results;
  }

  // Method with long function - will be flagged for complexity
  analyzeData(dataset: any[]) {
    let sum = 0;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    let count = 0;
    let evenCount = 0;
    let oddCount = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    let zeroCount = 0;
    let squareSum = 0;

    // Long function with lots of calculations
    for (const value of dataset) {
      if (typeof value !== "number") continue;

      sum += value;
      count++;

      if (value < min) min = value;
      if (value > max) max = value;

      if (value % 2 === 0) evenCount++;
      else oddCount++;

      if (value > 0) positiveCount++;
      else if (value < 0) negativeCount++;
      else zeroCount++;

      squareSum += value * value;
    }

    const mean = count > 0 ? sum / count : 0;
    const variance = count > 0 ? squareSum / count - mean * mean : 0;
    const stdDev = Math.sqrt(variance);

    return {
      sum,
      min,
      max,
      count,
      mean,
      variance,
      stdDev,
      evenCount,
      oddCount,
      positiveCount,
      negativeCount,
      zeroCount,
    };
  }

  // Function with high cyclomatic complexity - will be flagged
  complexProcessing(
    input: number,
    type: string,
    options: { flag1: boolean; flag2: boolean; threshold?: number }
  ) {
    let result = 0;
    const threshold = options.threshold ?? 100;

    if (type === "A") {
      if (input > threshold && options.flag1) {
        result = input * 2;
        if (options.flag2) {
          result += 50;
        } else {
          result -= 10;
        }
      } else if (input <= threshold && !options.flag1) {
        result = input / 2;
        if (!options.flag2) {
          result -= 5;
        } else {
          result += 10;
        }
      } else {
        result = input;
      }
    } else if (type === "B") {
      if (options.flag1 && options.flag2) {
        result = input + threshold;
      } else if (options.flag1) {
        result = input + threshold / 2;
      } else if (options.flag2) {
        result = input - threshold / 2;
      } else {
        result = input - threshold;
      }
    } else {
      if (input % 2 === 0) {
        result = input * input;
        if (options.flag1 !== options.flag2) {
          result = Math.sqrt(result);
        }
      } else {
        result = input + 1;
      }
    }

    if (result < 0) {
      return 0;
    } else if (result > 1000) {
      return 1000;
    }

    return result;
  }

  // Function with memory leak potential - will be flagged
  cacheData() {
    const cache = {};

    // This could grow indefinitely
    setInterval(() => {
      const timestamp = Date.now();
      cache[timestamp] = { time: timestamp, data: "some data" };
    }, 1000);

    // No cleanup mechanism
  }
}
