const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].js',
        publicPath: '/'
    },
    devtool: 'cheap-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        compress: true,
        port: 9000,
        contentBase: './src',
        watchContentBase: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: '/node_modules/',
                use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './img'
                        },
                    }
                    
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=8192',
                options: {
                    name: '[name].[ext]',
                    outputPath: './fonts'
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.EvalSourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new HtmlPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './css/styles.css'
        }),
        new CopyPlugin([
            {from: './src/img',to: './img'},
        ]),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
          })

    ]
}