**You are able to deploy or use the server locally without creating a new MongoDB database or a new Google Project in the Google Developer Dasbhoard (https://developers.google.com) if you're using the default database and default Google Project.**

## **Quick install** (using the default MongoDB hosted on [mlab.com](Link URL) and the default Google Project)

  - If you have Node.js installed, skip this step:
  - If not, download and install Node.js from here: https://nodejs.org/en/download/.

  - Install the project and its dependecies, by opening the terminal and navigating to the project folder:

```
#!javascript

$ cd FOLDER_PATH
$ npm install
$ npm install nodemon

```

###Deploy locally by running in the terminal when being in the project folder. You might be required to install some modules that might be missing from your environment using nodemon (monitor for any changes in the application and automatically restart the server):
```
#!javascript

$ npm install -g MODULE_NAME (e.g. express):
$ nodemon server

```

  - Open the browser and go to the following URL:
: 

```
#!javascript

http://localhost:3000/

```




###Deploy on Heroku by running in the terminal the following comamnds when being in the project folder, after you logged in into your account and creating a new app in the Heroku dashboard. Follow this tutorial for the steps you need to take: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction:

```
#!javascript

heroku login
heroku create
git add . 
git rm -r --cached node_modules
git commit -m "Another commit"
git push heroku master
git push origin
heroku open
heroku logs --tail
heroku logs -n 50
```

  - Open the browser and go to the following URL: 

```
#!javascript

http://CUSTOM_NAME.herokuapp.com/

```

  - If you need to remove the origin branch

```
#!javascript

git remote rm origin
git remote -v

```

## **Custom install** (using the a newly created MongoDB hosted on [mlab.com](Link URL) and a newly created Google Projec)
###Creating a new Google Project and new MongoDB deployment:

  - For changing the SenderID of the Google Cloud Messaaging project follow this guide in order to create a new SenderID: https://developers.google.com/web/fundamentals/getting-started/push-notifications/step-04?hl=en
  - Change the SenderID in the **config/conf.js** file, pasting your newly created key in the senderID variabe:
```
#!javascript

'senderID' : 'YOUR_SENDERID_GOES_HERE'

```
  - For changing the database, change the url in the **config/conf.js** file, pasting your value (free MongoDB database hosting here: https://mlab.com/company/) in the url variabe: 
```
#!javascript

'url' : 'YOUR_URL_GOES_HERE'

```

 - Follow the rest of the steps defined in the Quick Install section.