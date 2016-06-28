const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const shouldMinify = argv.p;
const entry = ['babel-polyfill', './index.js'];
const loaders = [];
const plugins = [];

if (argv.open) {
  const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

  plugins.push(new OpenBrowserWebpackPlugin({url: 'http://localhost:8080'}));
}

if (shouldMinify) {
  loaders.push(...[{
    test: /\.html?$/,
    loaders: ['html', 'html-minify'],
    exclude: /node_modules/
  }, {
    test: /\.(scss|sass)?$/,
    loader: ExtractTextPlugin.extract('style', 'css!csso!postcss!sass')
  }]);
  plugins.push(...[
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]);
} else {
  loaders.push(...[{
    test: /\.html?$/,
    loaders: ['html'],
    exclude: /node_modules/
  }, {
    test: /\.(scss|sass)?$/,
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
  }]);
}

module.exports = {
  context: path.join(__dirname, '/app'),
  entry,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.[hash].js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'htmlhint',
      exclude: /node_modules/
    }, {
      test: /\.(scss|sass)$/,
      loader: 'stylelint'
    }],
    loaders: loaders.concat([{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }])
  },
  postcss () {
    return [autoprefixer({browsers: ['last 2 versions']})];
  },
  plugins: plugins.concat([
    new ExtractTextPlugin('bundle.[hash].css'),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]),
  devtool: 'source-map',
  devServer: {
    inline: true,
    noInfo: true,
    contentBase: 'app',
    outputPath: path.join(__dirname, '/dist')
  }
};
