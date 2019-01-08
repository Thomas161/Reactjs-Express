const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ["babel-regenerator-runtime", path.resolve(__dirname, "src/")],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    //defines variables in scope of application
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        WEBPACK: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        use: {
          loader: "babel-loader"
        },
        include: path.resolve(__dirname, "src")
      }
    ]
  }
};