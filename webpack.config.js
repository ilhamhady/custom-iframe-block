const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  performance: {
    hints: false,
  },
  entry: "./src/block/index.js",
  output: {
    path: __dirname + "/build",
    filename: "index.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Remove comments
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
