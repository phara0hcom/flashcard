const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // config object
    entry: './src/index.js', // entry file
    output: {
        // output
        path: path.resolve(__dirname, 'public'), // ouput path
        filename: 'output.js' // output filename
    },
    resolve: {
        // These options change how modules are resolved
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.scss',
            '.css',
            '.jpeg',
            '.jpg',
            '.gif',
            '.png'
        ], // Automatically resolve certain extensions
        alias: {
            // Create aliases
            images: path.resolve(__dirname, 'src/assets/images') // src/assets/images alias
        }
    },
    module: {
        rules: [
            // loader rules
            {
                test: /\.(js|jsx)$/, // files ending with .js
                exclude: /node_modules/, // exclude the node_modules directory
                loader: 'babel-loader' // use this (babel-core) loader
            },
            {
                test: /\.(scss|css)$/,
                loaders: ['style-loader', 'postcss-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?context=src/assets/images/&name=images/[path][name].[ext]',
                    {
                        // images loader
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 4
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3
                            }
                        }
                    }
                ],
                exclude: /node_modules/,
                include: __dirname
            }
        ] // end rules
    },
    plugins: [
        // webpack plugins
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/index.html`,
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'public'), // A directory or URL to serve HTML content from.
        historyApiFallback: true, // fallback to /index.html for Single Page Applications.
        inline: true, // inline mode (set to false to disable including client scripts (like livereload)
        open: true, // open default browser while launching
        compress: true, // Enable gzip compression for everything served:
        hot: true // Enable webpack's Hot Module Replacement feature
    },
    devtool: 'eval-source-map' // enable devtool for better debugging experience
};
