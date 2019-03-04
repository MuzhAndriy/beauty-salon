const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].js',
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
                loader: 'file-loader',
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
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new MiniCssExtractPlugin({
            filename: './css/styles.css'
        }),
        new HtmlPlugin({
            inject: false,
            hash: false,
            template: './src/index.html',
            filename: './index.html'
        }),
        new CopyPlugin([
            {from: './src/img',to: './img'},
            // {from: 'D./src/fonts', to:'./fonts'}    
        ])

    ]
}