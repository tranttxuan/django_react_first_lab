const path = require("path");
const webpack = require("webpack");
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    publicPath: '/frontend/',
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new BundleTracker({ path: "../", filename: 'webpack-stats.json' }),
  ],
  devServer: {
    hot: true,
    writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets
    static:true
  },

};
