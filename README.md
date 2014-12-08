LandingPage
===========
## Install and run
npm install - you may need sudo before npm install

After installation, run gulp and a server will start up at localhost:8000 

## Push to online-pt.no
Install https://github.com/git-ftp/git-ftp 

**You may need to use to command for the first time**

git ftp init -u &lt;username&gt; -p &lt;password&gt; ftp://online-pt.no/public_html

**To push new code:**

git ftp push -u &lt;username&gt; -p &lt;password&gt; ftp://online-pt.no/public_html

