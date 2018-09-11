import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import webpackMerge from 'webpack-merge';
import webpackBaseConfig from './webpack.config.base.babel';
import config from '../config';

export default webpackMerge(webpackBaseConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]&minimize=true'
            ]
          })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]&minimize=true',
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV
      }
    }),
    new ExtractTextPlugin({
      filename: getPath => getPath(config.cssFilePath)
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});
