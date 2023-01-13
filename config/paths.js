const { realpathSync, existsSync } = require('node:fs');
const { resolve } = require('node:path');
const { cwd } = require('node:process');

const appDirectory = realpathSync(cwd());
/**
 * 
 * @param {string} targetPath 
 */
const resolveApp = (targetPath) => resolve(appDirectory, targetPath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) => existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const PATH_MAP = {
  appHtml: resolveApp('/public/index.html'),
  appEntry: resolveModule(resolveApp, '/src/browser/index'),
  appDist: resolveApp('/src/dist')
};

module.exports = PATH_MAP;