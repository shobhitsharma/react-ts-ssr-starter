// Configuration file for client

'use strict';

const { join, resolve } = require('path');
const webpack = require('webpack');
const { smart } = require('webpack-merge');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const Dotenv = require('dotenv-webpack');

const isProd = process.env.NODE_ENV === 'production';
const config = isProd ? require('./webpack.prod.config') : require('./webpack.dev.config');

const common = {
  mode: isProd ? 'production' : 'development',
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts|.tsx$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: 'tsconfig.client.json'
          }
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: isProd ? '.env.prod' : '.env.dev',
      safe: false
    }),
    new ReactLoadablePlugin({
      filename: join('.', 'dist', 'react-loadable.json')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true)
    })
  ]
};

module.exports = smart(common, config);
