import webpack from 'webpack';
import config from '../config';

export default {
  entry: {
    app: config.app,
    vendor: config.vendor
  },
  output: {
    filename: config.filename,
    path: config.path,
    sourceMapFilename: config.sourceMapFilename
  },
  resolve: {
    alias: {
      Actions: config.alias.actions,
      Components: config.alias.components,
      Constants: config.alias.constants
    }
  },
  devtool: config.devtool,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: config.vendorName,
      filename: config.vendorFileName
    })
  ]
}