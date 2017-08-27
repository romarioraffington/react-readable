const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require('dotenv').load();
const clientFolder = `${process.cwd()}/client`;

module.exports = {
  entry: [
    `${clientFolder}/src/index.js`,
  ],
  output: {
    path: `${clientFolder}/dist`,
    filename: 'assets/bundle.[hash].js',
    sourceMapFilename: 'assets/bundle.map',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      enforce: "pre",
      use: ['babel-loader', 'source-map-loader'],
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: `${clientFolder}/public/template.html`
    }),
    new ExtractTextPlugin({
      filename: 'assets/bundle.[hash].css',
      disable: process.env.NODE_ENV === 'development'
    }),
  ],
}