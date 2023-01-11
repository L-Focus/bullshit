import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dayjs from "dayjs";
import GLOBAL_CONFIG from "../config/config.js";
import { CorpusType } from "../type/index.js";

const currentDirname = dirname(fileURLToPath(import.meta.url));

/**
 * 加载语料库
 * @param targetFilePath
 * @returns
 */
export const loadCorpus = (targetFilePath: string): CorpusType => {
  const dataJsonPath = resolve(currentDirname, "..", targetFilePath);
  const fileData = readFileSync(dataJsonPath, { encoding: "utf-8" });

  return JSON.parse(fileData) as CorpusType;
};

/**
 * 将生成的文章保存在本地
 * @param title
 * @param article
 * @returns
 */
export const saveCorpus = (title: string, article: string[]): string => {
  const outputDir = resolve(currentDirname, "..", "output");
  const time = dayjs().format(GLOBAL_CONFIG.dayjsFormat);
  const outputFile = resolve(outputDir, `${title}${time}.txt`);

  console.log(outputFile);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  const text = `${title}\n\n    ${article.join("\n")}`;
  writeFileSync(outputFile, text);

  return outputFile;
};
