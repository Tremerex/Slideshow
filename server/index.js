import clearConsole from 'react-dev-utils/clearConsole';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import openBrowser from 'react-dev-utils/openBrowser';
import {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls
} from 'react-dev-utils/WebpackDevServerUtils';
import config from '../build/webpack.config.dev.babel';
import createDevServerConfig from '../build/webpackDevServer.config';

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const INDEX_HTML = path.resolve(__dirname, '../public/index.html');
const INDEX_JS = path.resolve(__dirname, '../src/index.js');

if (!checkRequiredFiles([INDEX_HTML, INDEX_JS])) {
  process.exit();
}

choosePort(HOST, PORT).then(port => {

  if (!port) {
    return;
  }

  const protocol = Boolean(process.env.HTTPS) ? 'https' : 'http';
  const urls = prepareUrls(protocol, HOST, port);

  const compiler = createCompiler(webpack, config, 'slideshow', urls);
  const proxyConfig = prepareProxy(null, path.resolve(__dirname, '../public'));
  const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);

  const devServer = new WebpackDevServer(compiler, serverConfig);

  devServer.listen(port, HOST, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Starting the development server...\n');
    openBrowser(urls.localUrlForBrowser);
  });

  ['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });

}).catch(err => {

  if (err && err.message) {
    console.log(err.message);
  }
  process.exit();

});
