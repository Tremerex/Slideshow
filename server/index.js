import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import clearConsole from 'react-dev-utils/clearConsole';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import openBrowser from 'react-dev-utils/openBrowser';
import { choosePort, createCompiler, prepareProxy, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
import path from 'path';

import config from '../config/webpack.config.dev.babel';
import createDevServerConfig from '../config/webpackDevServer.config';

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

    let protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    let urls = prepareUrls(protocol, HOST, port);

    let compiler = createCompiler(webpack, config, 'slideshow', urls);
    let proxyConfig = prepareProxy(null, path.resolve(__dirname, '../public'));
    let serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);

    const devServer = new WebpackDevServer(compiler, serverConfig);

    devServer.listen(port, HOST, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Starting the development server...\n');
        openBrowser(urls.localUrlForBrowser);
    });

    ['SIGINT', 'SIGTERM'].forEach(sig => {
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
