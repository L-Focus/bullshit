import { generate } from "./lib/generator";
import { loadCorpus } from "./lib/corpus";

console.log(generate('狗屁不通', loadCorpus('corpus/data.json')));