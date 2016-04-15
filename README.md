How to deploy the Node.js framework:

  - Install (if you have Node.js installed)
Download and install Node.js from here: https://nodejs.org/en/download/

  - Install the project and its dependecies, by opening the terminal and navigating to the project folder:
cd FOLDER_PATH
npm install --save

  - Deploy locally by running in the terminal when being in the project folder. You might be required to install some modules that might be missing from your environment using npm install -g MODULE_NAME:
node server.js

  - Open the browser and go to the following URL: 
http://localhost:3000/

	(https://ionicapplication.herokuapp.com/) 
  - Deploy on Heroku by running in the terminal when being in the project folder after you logged in into your account and creating a new app in the Heroku dashboard. Follow this tutorial for the steps you need to take: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction:
heroku login
heroku create
git add . 
git rm -r --cached node_modules
git commit -m "Another commit"
git push heroku master
heroku open
heroku logs --tail
heroku logs -n 50

  - If you need to remove the origin branch
git remote rm origin
git remote -v


  - For changing the SenderID of the Google Cloud Messaaging project follow this guide in order to create a new SenderID: https://developers.google.com/web/fundamentals/getting-started/push-notifications/step-04?hl=en
  - Change the SenderID in the config/conf.js file, pasting your newly created key in the senderID variabe: 'senderID' : 'YOUR_SENDERID_GOES_HERE'.

  - For changing the database, change the url in the config/conf.js file, pasting your value (free MongoDB database hosting here: https://mlab.com/company/) in the url variabe: 'url' : 'YOUR_URL_GOES_HERE'