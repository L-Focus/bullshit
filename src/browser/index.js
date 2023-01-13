import { generate } from "../lib/generator";
import { createRandomPicker } from "../lib/random";

const loadCorpus = async (corpuspath) => {
  if (corpuspath) {
    const corpus = await (await fetch(corpuspath)).json();
    return corpus;
  }
  const defaultCorpus = await import('../corpus/data.json');
  return defaultCorpus;
};

const options = document.querySelector(".options");
const config = { min: 2000, max: 5000 };
options.addEventListener("change", ({ target }) => {
  const num = Number(target.value);
  config[target.id] = num;
  target.parentNode.querySelector("input + span").innerHTML = num;
});

const generateButton = document.getElementById("generate");
const anotherTitleButton = document.getElementById(
  "anotherTitle"
);
const article = document.querySelector("article");
const titleEl = document.getElementById("title");

(async function () {
  const corpus = await loadCorpus();
  const pickTitle = createRandomPicker(corpus.title);
  titleEl.value = pickTitle();
  generateButton.addEventListener("click", () => {
    const text = generate(titleEl.value, corpus, config.min, config.max);
    article.innerHTML = `<section>${text.join(
      "</section><section>"
    )}</section>`;
  });
  anotherTitleButton.addEventListener("click", () => {
    titleEl.value = pickTitle();
    if (article.innerHTML) generateButton.click();
  });
})();
