import { generate } from "./lib/generator";
import { loadCorpus, saveCorpus } from "./lib/corpus";
import { createRandomPicker } from "./lib/random";
import options from "./lib/cmd";
import { interact } from "./lib/interact";

const corpus = loadCorpus("corpus/data.json");
let title = options.title || createRandomPicker(corpus.title)();

(async () => {
  if (Object.keys(options).length <= 0) {
    const answers = await interact([
      { text: "请输入文章主题", value: title },
      { text: "请输入最小字数", value: 6000 },
      { text: "请输入最大字数", value: 10000 },
    ]);
    title = answers[0];
    options.min = answers[1];
    options.max = answers[2];
  }

  const article = generate(title, corpus, options.min, options.max);
  const output = saveCorpus(title, article);

  console.log(`生成成功！文章保存于：${output}`);
})();
