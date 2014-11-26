LandingPage
===========
## Install and run
npm install - you may need sudo before npm install

After installation, run gulp and a server will start up at localhost:8000 

## Push to online-pt.no
Install https://github.com/git-ftp/git-ftp 

**You may need to use to command for the first time**

git ftp init -u <user> -p - ftp://host.example.com/public_html

git ftp push --user onlinno  --passwd <password> ftp://online-pt.no/public_html

