const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

export default {
  app: path.resolve('src'),
  vendor: [
    'axios',
    'classnames',
    'prop-types',
    'react',
    'react-dom',
    'react-redux',
    'react-spinners',
    'redux',
    'redux-thunk'
  ],
  filename: 'app.bundle.js',
  path: path.resolve('public/scripts'),
  sourceMapFilename: '[file].map',
  alias: {
    actions: path.resolve(__dirname, '../src/actions/'),
    components: path.resolve(__dirname, '../src/components/'),
    constants: path.resolve(__dirname, '../src/constants/')
  },
  devtool: isProd ? 'source-map' : 'nosources-source-map',
  vendorName: 'vendor',
  vendorFileName: 'vendor.bundle.js',
  cssFilePath: '../styles/css.bundle.css'
};