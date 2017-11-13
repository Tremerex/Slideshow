import webpack from 'webpack';
import path from 'path';
import eslintFormatter from 'react-dev-utils/eslintFormatter';

export default {
  entry: {
    app: path.resolve('src'),
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'axios', 'prop-types']
  },
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
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint')
            },
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
        ]
      },
      { 
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
      new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
