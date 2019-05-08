"use strict"
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackNotifier = require("webpack-notifier");
var isProd = process.env.NODE_ENV.trim() === 'production';

module.exports = {
    // mode: mode,
    performance: {
        hints: false
    },
    watch: isProd ? false : true,
    entry: {
        main: ["./Assets/js/index.tsx"],
        vendor: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, "Public/js"),
        filename: "[name].bundle.js",
        chunkFilename: '[name].bundle.js'   
    },
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.jsx', '.js', '.json', '.vue']
    },
    // optimization: {
    //     minimizer: [
    //         new OptimizeCssAssetsPlugin(),
    //         new UglifyJsPlugin({
    //             cache: isProd ? true : false,
    //             parallel: true,
    //             uglifyOptions: {
    //                 compress: {
    //                     warnings: false, // Suppress uglification warnings
    //                     pure_getters: true,
    //                     unsafe: true,
    //                     unsafe_comps: true,
    //                 },
    //                 ecma: 6,
    //                 mangle: true
    //             },
    //             sourceMap: true
    //         })
    //     ],
    //     // splitChunks: {
    //     //     chunks: 'all',
    //     //     maxInitialRequests: Infinity,
    //     //     minSize: 0,
    //     //     cacheGroups: {
    //     //         commons: {
    //     //             test: /[\\/]node_modules[\\/]/,
    //     //             name: "vendor",
    //     //             chunks: "initial",
    //     //         },    
    //     //     }
    //     // },
    // },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader"
            //     }
            // },
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: {
            //         loaders: {
            //             'scss': 'vue-style-loader!css-loader!sass-loader',
            //             'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            //             // js: {
            //             //     loader: 'babel-loader',
            //             //     options: {
            //             //         presets: ['env'],
            //             //         plugins: ['transform-object-rest-spread']
            //             //     }
            //             // }
            //         }
            //     }
            // },
            {
                test: /\.(scss|sass)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
            },
            // {
            //     test: /\.(jpe?g|png|gif)/,
            //     loader: 'url-loader',
            // }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isProd ? '"production"' : '"development"'
            }
        }),
        new WebpackNotifier({
            title: "Webpack",
            alwaysNotify: true,
            contentImage: path.resolve(__dirname, 'Assets/Images/background.jpg')
        }),
        new MiniCssExtractPlugin({
            filename: "../css/[name].bundle.css",
        }),
        // new webpack.optimize.AggressiveMergingPlugin({
        //     minSize: 10000,
        //     maxSize: 30000
        // }),
        // new VueLoaderPlugin(),
        // new HardSourceWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    // node: {
    //     fs: "empty"
    // }
}