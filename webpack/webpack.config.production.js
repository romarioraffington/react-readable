const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          query: {
            modules: true,
            sourceMap: true,
            importLoaders: 3,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          },
        },
        'sass-loader',
        'postcss-loader',
        ]
      })
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true,
        }
      }],
    }],
  },
  plugins: [
    require('autoprefixer'),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
      },
      canPrint: false,
    }),
  ],
}