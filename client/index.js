const express = require('express');
const webpack = require('webpack');
const chalk = require('chalk');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');
const pkg = require('../package.json');

const app = express();
const distFolder = `${__dirname}/dist`;
const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) module.hot.accept();

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));

  // Serve all requests to index.html
  // to allow React to handle all the
  // routing
  app.get("*", (req, res, next) => {
    compiler.outputFileSystem.readFile(`${distFolder}/index.html`, (err, html) => {
      if (err) return next(err);
      res.set('Content-Type', 'text/html').send(html);
    });
  });

} else {
  app.use(compression());
  
  // Serve static assets and make 
  // all routes go to index.html
  app.use(express.static(distFolder));
  app.use(express.static(distFolder));
  app.get("*", (req, res) => res.sendFile(`${distFolder}/index.html`));
}

app.listen(process.env.PORT, () => {
  console.log(`
    --
    ${chalk.cyan(`${pkg.name} - Frontend 🌎`)}
    
    Environment :   ${process.env.NODE_ENV}
    Host        :   ${process.env.HOST}
    Port        :   ${process.env.PORT}
    --`
  );
});