const webpack = require('webpack'); // webpack itself
const path = require('path'); // nodejs dependency when dealing with paths
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // require webpack plugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // require webpack plugin
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin'); // require webpack plugin

module.exports = { // config object
  entry: './src/index.js', // entry file
  output: { // output
    path: path.resolve(__dirname, 'public'), // ouput path
    filename: 'output.js' // output filename
  },
  resolve: { // These options change how modules are resolved
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], // Automatically resolve certain extensions
    alias: { // Create aliases
      images: path.resolve(__dirname, 'src/assets/images')  // src/assets/images alias
    }
  },
  module: {
    rules: [ // loader rules
      {
        test: /\.js$/, // files ending with .js
        loader: 'babel-loader' // use this (babel-core) loader
      },
      {
        test: /\.scss$/, // files ending with .scss
        use: ExtractTextWebpackPlugin.extract({ // call our plugin with extract method
          use: ['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader' // fallback for any CSS not extracted
        }) // end extract
      },
      {
        test: /\.jsx$/, // all files ending with .jsx
        loader: 'babel-loader', // use the babel-loader for all .jsx files
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({ // call our plugin with extract method
          use: ['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader' // fallback for any CSS not extracted
        }) // end extract
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
    ] // end rules
  },
  plugins: [ // webpack plugins
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({
        Promise: 'es6-promise-promise'
    }),
    new OptimizeCSSAssets(), // call the css optimizer (minfication)
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new ExtractTextWebpackPlugin('styles.css') // call the ExtractTextWebpackPlugin constructor and name our css file
  ]
}