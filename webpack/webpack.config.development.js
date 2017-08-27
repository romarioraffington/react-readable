const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const {
  PORT,
  HOST,
} = process.env;

module.exports = {
  cache: true,
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
  ],
  devServer: {
    inline: true,
    port: PORT,
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
       url: `http://${HOST}:${PORT}`,
    }),
  ],
}