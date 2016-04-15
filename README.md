How to deploy the Node.js framework:

  - Install (if you have Node.js installed)
Download and install Node.js from here: https://nodejs.org/en/download/

  - Install the project and its dependecies, by opening the terminal and navigating to the project folder:
cd FOLDER_PATH
npm install --save

  - Deploy locally by running in the terminal when being in the project folder:
node app.js
npm start
  - Open the browser and go to the following URL: http://localhost:3000/

	(https://ionicapplication.herokuapp.com/) 
  - Deploy on Heroku by running in the terminal when being in the project folder:
git add . 
git rm -r --cached node_modules
git commit -m "Another commit"
git remote rm origin
git remote -v
git push heroku master
heroku open
heroku logs --tail
heroku logs -n 50