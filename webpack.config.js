const path = require("path");
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    entry: ["./src/js/index.js", "./src/scss/style.scss"],
    output: {
        path: __dirname + '/public',
        filename: "js/main.min.js"
    },
    devtool: "source-map",
    mode: "production",
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                extractComments: true
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, "./src/scss"),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        attrs: ['img:src','link:href','source:srcset']
                    }
                }
            },
            {
                test: /\.(svg|png|jpg|eot)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:4].[ext]",
                        outputPath: "./images"
                    }
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: "./src/index.html"
        }),

        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '80'
            },
            jpegtran: {
                quality: '50',
                progressive: true
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.output = {
            path: path.join(__dirname, '/public'),
            filename: 'js/index_bundle.[contentHash:4].min.js'
        };
        config.plugins.shift();
        config.plugins.push(new CleanWebpackPlugin());
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/style.[contentHash:4].min.css"
            })
        )
    }
    return config;
};
