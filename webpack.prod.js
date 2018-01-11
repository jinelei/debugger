const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            filename:'index.html',
            template: './src/index.html'
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});