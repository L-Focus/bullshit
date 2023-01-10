export const randomInt = (min: number = 0, max: number = 100): number => {
  const p = Math.random();

  return Math.floor(min * (1 - p) + max * p);
};

/**
 * 高阶函数
 * @param corpusArr
 * @returns
 */
export const createRandomPicker = (corpusArr: string[]): (() => string) => {
  // copy数组，以免修改原始数据
  const pickArr = [...corpusArr];

  const randomPick = (): string => {
    const lens = pickArr.length - 1;
    const randomIndex = randomInt(0, lens);
    const randomPicked = pickArr[lens];
    // 将挑选出来的数据与数组的最后一位替换
    [pickArr[randomIndex], pickArr[lens]] = [
      pickArr[lens],
      pickArr[randomIndex],
    ];

    return randomPicked;
  };

  // 抛弃掉第一次取到的结果
  // 因为在第一次取值时，数组的最后一位是取不到的
  // 这样子能保证在第一次取值时，数组中的每一个值都有可能被取到
  randomPick();
  return randomPick;
};
