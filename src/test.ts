import { generate } from "./lib/generator.js";
import { loadCorpus } from "./lib/corpus.js";

console.log(generate('狗屁不通', loadCorpus('corpus/data.json')));