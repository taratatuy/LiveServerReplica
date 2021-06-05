const chokidar = require('chokidar');

const { Server } = require('./Server.js');

class LiveServer {
  constructor() {
    if (!process.argv[2]) {
      console.log('Usage: golive path hosted.html port');
      return;
    }

    this.dir = process.argv[2]; // TODO: check path
    this.hostFileName = process.argv[3] || 'index.html'; // TODO: check *.html file
    this.port = process.argv[4] || 3000;
    // TODO: input args with --agrName argVal

    this.timeoutFlag = true;

    this.server = new Server(this.dir, this.hostFileName, this.port);

    this._watchFiles();
  }

  _watchFiles() {
    const watcher = chokidar.watch(this.dir, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
    });

    // Add event listeners.
    watcher
      .on('add', () => this._reloadClient())
      .on('change', () => this._reloadClient())
      .on('unlink', () => this._reloadClient());
  }

  _reloadClient() {
    if (!this.timeoutFlag) return;

    this.timeoutFlag = false;

    console.log('Updating...');
    this.server.reloadClient();

    setTimeout(() => {
      this.timeoutFlag = true;
    }, 600);
  }
}

new LiveServer();
