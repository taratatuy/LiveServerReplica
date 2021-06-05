const ip = document.location.hostname;
const port = document.location.port;

const myIO = io(`http://${ip}:${port}`);

myIO.on('reload', () => {
  console.log('Reloading page...');
  document.location.reload();
});
