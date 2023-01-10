import { isFunction } from "lodash-es";
import { CorpusType } from "../type";
import { createRandomPicker, randomInt } from "./random";

const sentence = (
  pick: () => string,
  replacer: Record<string, string | (() => string)>
) => {
  let ret = pick();

  Object.entries(replacer).forEach(([key, value]) => {
    const replaceStr = isFunction(value) ? value() : value;
    ret = ret.replace(new RegExp(`{{${key}}}`, "g"), replaceStr);
  });

  return ret;
};

export const generate = (
  title: string,
  corpus: CorpusType,
  min = 6000,
  max = 10000
): string[] => {
  // 将文章长度设置为 min 到 max之间的随机数
  const articleLength = randomInt(min, max);
  const { famous, bosh_before, bosh, said, conclude } = corpus;
  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [
    famous,
    bosh_before,
    bosh,
    said,
    conclude,
  ].map(createRandomPicker);

  const article: string[] = [];
  let totalLength = 0;
  const endReg = /[。？]$/;

  while (totalLength < articleLength) {
    // 如果文章内容的字数未超过文章总字数
    // 添加段落
    let section = "";
    // 将段落长度设为200到500字之间
    const sectionLength = randomInt(200, 500);
    // 如果当前段落字数小于段落长度，或者当前段落不是以句号。和问号？结尾
    while (section.length < sectionLength || !endReg.test(section)) {
      // 取一个 0~100 的随机数
      const n = randomInt(0, 100);
      if (n < 20) {
        // 如果 n 小于 20，生成一条名人名言，也就是文章中有百分之二十的句子是名人名言
        section += sentence(pickFamous, {
          said: pickSaid,
          conclude: pickConclude,
        });
      } else if (20 <= n && n < 50) {
        // 如果 n 小于 50，生成一个带有前置从句的废话
        section +=
          sentence(pickBoshBefore, { title }) + sentence(pickBosh, { title });
      } else {
        section += sentence(pickBosh, { title });
      }
    }
    totalLength += sectionLength;
    article.push(section);
  }

  // 将文章返回，文章是段落数组形式
  return article;
};
