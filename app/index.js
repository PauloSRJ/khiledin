const express = require('express');
const compression = require('compression');
const server = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const minify = require('express-minify');
const session = require('express-session');
let MongoStore = require('connect-mongo');
const db = require('./database/index');

var events = require('events');
global.event = new events.EventEmitter();
global.log = require('signale');
global.fs = require('fs');
global.fileUpload = require('express-fileupload');
global.io = require('socket.io');
global.bots = require('./public/src/js/modules/bots/bots');

global.App = class App {

  static getInstance(){
    if(!App._instance){
      App._instance = new App();
    }
    return App._instance;
  }

  constructor() {

    this.app = express();
    this.config();
    this.listen();

  }

  config() {

    this.httpServer = this.httpServer();

    const sessionInit = session({
      secret: 'keyboard cat',
      resave: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
      }),
      saveUninitialized: true,
      cookie: {
        expires: new Date(253402300000000)
      }
    });

    io = io(this.httpServer);

    this.sockets = require('./sockets')(io);

    // setar metodos essenciais
    this.set(
      ['port', process.env.PORT || 3000],
      ['views', path.join(__dirname, 'views')],
      ['view engine', 'ejs'],
      ['trust proxy', 1],
      ['socketio', io]
    );

    this.use(
      cookieParser(),
      sessionInit,
      fileUpload(),
      compression(),
      minify(),
      express.urlencoded({
        extended: false
      }),
      express.json(),
      ['/', express.static(__dirname + '/public')]
    );

    const routes = require('./routes/index')(this.app);

  }

  httpServer() {
    return server.Server(this.app);
  }

  use(...uses) {
    return uses.map((useConfig) => Array.isArray(useConfig) ? this.app.use(...useConfig) : this.app.use(useConfig));
  }

  set(...seteds) {
    return seteds.map((setConfig) => this.app.set(...setConfig));
  }

  listen() {
    this.httpServer.listen(this.app.get('port'), () =>
      log.success(`[Listening on]: ${ this.app.get('port') }`)
    );
  }

}

module.exports = App.getInstance();
