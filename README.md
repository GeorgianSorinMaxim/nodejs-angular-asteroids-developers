## Simple Asteroid and Groups of Developers application with a web frontend and API backend with a datastore.

## Background:
-We know that behind each Asteroid hides an UFO. Those UFOs are constantly seeking good developers here on Earth. Unfortunately, they only have a certain number of vacancies available and therefore, can only take one Group of developers at a time.
-There is an ingenious process to select this Group, associating the name of the Asteroid with the name of the Group. Both names are converted into a number represented by the product of the letters where 'A' is 1, 'B' is 2 ... 'Z' is 26. If the remainder of the division of the number that represents the Group by 45 is equal to the remainder of the division of the number that represents the Asteroid by 45, then the group will be taken.
-Your task is to write a web application allows users to select an Asteroid and a group name, and displays in the screen whether or not the group will be taken.
-You should use JavaScript, but the choice of framework is up to you.
- Group names and Asteroid names should always be in UPPERCASE.
- Only the letters from 'A' to 'Z' are allowed for both the Asteroid and Group names.
- The application should have at least the a number Asteroids and Groups.

## How to implement authentication for the application:
- Using Passport (passportjs.org), an authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password.

## Specs:
- The back-end is a RESTful API based on Node.js + Express, using MongoDB for the database. The front-end is based on AngularJS and it uses the API to communicate with the backend, not using serverside rendering of templates.
- The UI is separate from the business logic and data layer.
- No unit test or end-to-end test coverage.

## Installation instructions:

  - Download  (if you have Node.js installed ignore this step) and install Node.js from here: https://nodejs.org/en/download/

  - Install the project and its dependecies, by opening the terminal and navigating to the project folder:
``` $ cd FOLDER_PATH```
``` $ npm install``
  - In the case your environment lacks some modules, you might be requied to install them.

  - Run locally when being in the project folder using Nodemon (automatically restarts the server when there are changes to the files):
```$ nodemon server```
  - Open the browser and go to the following URL: http://localhost:3000/


## See below the steps on how to test the API using Postman: 	
	1. Open Postman

	2. For viewing all Asteroids, use the GET request on the following url after starting the application: http://localhost:3000/asteroids

	3. For creating an Asteroid, use the POST request on the following url: http://localhost:3000/asteroid
 	 	In the POST request body choose: x-www-form-urlencoded
 	 	Add the following Key in the Body of the request: "name". For the defined Key add data that represents the name of the Astroid.
 	 	Run the request, a new Asteroid will be created with the inputted data.

	5. For updating an Asteroid, use the POST request on the following url: http://localhost:3000/updateAsteroid
		In the POST request body choose: x-www-form-urlencoded
 	 	Add the following Key in the Body of the request: "name". For the defined Key add data that represents the name of the Asteroid.
 	 	Add an id key that contains an existing ID of a previously created Astroid (run GET to view all existent Asteroids).
 	 	Run the request, the selected Asteroid is now updated with the inputted data.

 	6. For deleting an Asteroid, use the DEL request on the following url: http://localhost:3000/asteroid
 		In the DEL request body choose: x-www-form-urlencoded
 	 	Add an id key that contains an existing ID of a previously created Asteroid.
 	 	Run the request, the selected Asteroid is now deleted.
