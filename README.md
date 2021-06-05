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
    golive path/to/file hosted.html port
```
Example:
``` bash
    golive $(pwd) index.html 10259
```
