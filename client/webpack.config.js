const merge = require('webpack-merge');
const baseConfig = require('./webpack/webpack.config.base');

module.exports = merge.smart(baseConfig, require(`./webpack/webpack.config.${process.env.NODE_ENV}`));
