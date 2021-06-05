# Features  
This application provides an ability to host any .html file with propriate static files like css, js, icons and others. Browser sync provided as well, it means that your changes will displayed automatically (automatic page reload, not HMR).  
A source of inspiration was LiveServer extension for VS Code.
# Instalation  
Setup:
``` bash 
    cd  ~
    mkdir utils
    cd utils/
    git clone https://github.com/taratatuy/LiveServerReplica.git
```
Add alias to ~/.bash_aliases :
``` bash
    alias golive='node ~/utils/LiveServerReplica/golive.js'
```
Usage:
``` bash 
    golive path/to/folder hosted.html port
```
Example:
``` bash
    golive $(pwd) index.html 10259
```

# How it works?
The app based on express server. When browser request html file we inject a script with websocket directly to body of the page and then return it.  
Once any file in the passed directory has updated server emit websocket event to reload the page for every listening browser.
