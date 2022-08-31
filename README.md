# GP

This is our Graduation Project on GitHub

###For startup project in your pc:

####/GP/Back-End/
npm init -y
npm install express mongoose nodemon path body-parser cors

#####modify:
/GP/package.json
modify:
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "nodemon back-end/index.js",
"server": "nodemon back-end/index.js",
"client": "npm start --prefix front-end",
"dev": "concurrently \"npm run server\" \"npm run client\""
},

/GP/Back-End/package.json
add:
"proxy": "http://localhost:5000"
