
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");

module.exports = {
    context: path.resolve('./'),
    entry: {
        'app': './app/main.ts'
    },

    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
                // link(https://www.npmjs.com/package/css-loader)
                // loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            }
        ]
    },


    resolve: {
        alias: {
            openlayers: "openlayers/dist/ol.js",
        },
    },

    output: {
        path: path.resolve('./dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        inline: true
    }
    ,

    plugins: [
        new ExtractTextPlugin('[name].css')
        ,
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        }),
        new webpack.ProvidePlugin({
            ol: "openlayers",
        }),

    ]
};
