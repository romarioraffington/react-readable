const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require('dotenv').load();
const clientFolder = `${process.cwd()}/client`;

// Pull out variables to define with 
// webpack to be used in the api file
const { 
  NODE_ENV, 
  SERVER_PROTOCOL,
  SERVER_HOST,
  SERVER_PORT,
  SERVER_API_TIMEOUT,
} = process.env;

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
    },
    {
      test: /\.(svg|png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          }  
        }
      ]
    }],
  },
  resolve: {
    modules: [clientFolder, 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV),
        SERVER_PROTOCOL: JSON.stringify(SERVER_PROTOCOL),
        SERVER_HOST: JSON.stringify(SERVER_HOST),
        SERVER_PORT: JSON.stringify(SERVER_PORT),
        SERVER_API_TIMEOUT: JSON.stringify(SERVER_API_TIMEOUT),
      }
    }),
    new HTMLWebpackPlugin({
      inject: true,
      template: `${clientFolder}/public/template.html`,
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'assets/bundle.[hash].css',
      disable: NODE_ENV === 'development',
    }),
  ],
}