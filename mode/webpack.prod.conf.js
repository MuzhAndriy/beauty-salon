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
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
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
        }]
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
            {from: './src/fonts', to:'./fonts'}    
        ])

    ]
}