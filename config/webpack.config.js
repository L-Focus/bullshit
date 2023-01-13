const HtmlWebpackPlugin = require("html-webpack-plugin");
const PATH_MAP = require('./paths.js');

module.exports = (env, argv) => {
  const nodeModulesReg = /node_modules/;

  return {
    mode: 'development',
    entry: PATH_MAP.appEntry,
    output: {
      path: PATH_MAP.appDist,
      filename: "bundle.js",
    },

    devServer: {
      hot: true,
      compress: true,
      static: false,
      client: {
        logging: "warn",
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      port: 1234,
      host: "0.0.0.0",
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader",
          exclude: nodeModulesReg,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: PATH_MAP.appHtml
      })
    ]
  };
};