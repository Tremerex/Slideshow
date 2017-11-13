import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default {
  entry: {
    app: path.resolve('src'),
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'axios', 'prop-types']
  }
  ,
  output: {
    filename: 'app.bundle.js',
    path: path.resolve('public/scripts'),
    sourceMapFilename: '[file].map'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
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
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new ExtractTextPlugin({
      filename: getPath => getPath('../styles/css.bundle.css'),
      allChunks: true
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
};
