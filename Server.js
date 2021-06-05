const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const { inject } = require('./inject.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

class Server {
  constructor(dir, hostFileName, port) {
    this.dir = dir;
    this.hostFileName = hostFileName;
    this.port = port;

    this._startListen();
  }

  _startListen() {
    app.get('/', (req, res) => {
      app.use(express.static(this.dir));
      app.use(express.static(path.resolve(__dirname, 'client')));

      res.send(
        inject(this.dir, this.hostFileName, [
          'https://cdn.socket.io/4.1.2/socket.io.min.js',
          'client-ws.js',
        ])
      );
    });

    io.on('connect', () => {
      console.log('  Loaded. ' + Date.now());
    });

    server.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }

  reloadClient() {
    io.emit('reload');
  }
}

module.exports = { Server };
