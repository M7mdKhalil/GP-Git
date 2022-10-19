# GP

This is our Graduation Project on GitHub

### For startup project in your pc:

#### /GP-Git/
npm install express mongoose nodemon path body-parser cors

-------------------------------------------------------------

#### /GP-Git/front-end
npm i react-router-dom

-------------------------------------------------------------

##### modify:
/GP-Git/package.json
modify:
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "nodemon back-end/index.js",
"server": "nodemon back-end/index.js",
"client": "npm start --prefix front-end",
"dev": "concurrently \"npm run server\" \"npm run client\""
},

/GP-Git/front-end/package.json
add:
"proxy": "http://localhost:5000"
