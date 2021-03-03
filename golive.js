const fs = require('fs');

class liveServer {
  constructor() {
    if (!process.argv[2]) {
      console.log('Usage: GoLive path hosted.html port');
      return;
    }

    this.dir = process.argv[2]; // TODO: check path
    this.hostFileName = process.argv[3] || 'index.html'; // TODO: check *.html file
    this.port = process.argv[4] || 3000; // TODO: check if port free
    // TODO: input args with -agrName argVal

    this._setWatcher();
  }

  _setWatcher() {
    let server;
    let timeout = true;

    // First load.
    server = new Server(this.dir, this.hostFileName, this.port);

    // Files update watcher. As default 'recursive' flag do not work on Linux.
    // Triggered on save files inside the folder.
    // fs.watch(this.dir, { recursive: true }, (eventType, filename) => {
    fs.watch(this.dir, (eventType, filename) => {
      if (timeout) {
        server.close();
        console.log('Reload server... ' + Date.now());
        server = new Server(this.dir, this.hostFileName, this.port);
        timeout = false;

        // fs.watch triggers twise on one save, so here we have timeout
        // for calling function only ones per save
        setTimeout(() => {
          timeout = true;
        }, 800);
      }
    });
  }
}

class Server {
  constructor(dir, hostFileName, port) {
    this.dir = dir;
    this.hostFileName = hostFileName;
    this.port = port;
    this.listener;

    this._set();
  }

  _set() {
    const express = require('express');
    const app = express();

    app.use(express.static(this.dir));

    app.get('/', (req, res) => {
      res.sendFile(`${this.dir}/${this.hostFileName}`);
    });

    this.listener = app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }

  close() {
    if (this.listener) this.listener.close();
  }
}

new liveServer();
