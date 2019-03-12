const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].[contentHash].js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
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
                // loader: 'file-loader', if >= IE 11
                options: {
                    name: '[name].[ext]',
                    outputPath: './fonts'
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/styles.[contentHash].css'
        }),
        new HtmlPlugin({
            template: './src/index.html' 
        }),
        new CopyPlugin([
            {from: './src/img',to: './img'},
        ]),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        })
    ]
}