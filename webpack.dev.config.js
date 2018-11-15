const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
/*
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});
*/

module.exports = merge(webpackBaseConfig, {
    devServer: {
        historyApiFallback: true,
        // progress: true,
        inline: true,
		compress: true,
        // https: true,
        host: '0.0.0.0',
        port: 8080,
        contentBase: path.resolve(__dirname, './'),
        proxy: {

        }
    },
    devtool: '#source-map',
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendors', 'manifest']
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/template/index.ejs',
            inject: false
        }),
        new webpack.DefinePlugin({
            BACKEND_URL: JSON.stringify('http://localhost/')
        })
    ]
});