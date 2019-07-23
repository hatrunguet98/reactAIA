# README #

###Install all dependencies:###
* npm install
* Run npm start

###Run server mock:###
* install json-server: npm install -g json-server
* cd ${FRONT_HOME_PATH}/server-mock
* json-server --watch db.json

###Package WAR file:###
* build front-end: npm run-script build
* update file dist/index.html: href="./xxxxxx", src="./xxxx"
* package WAR: mvn package
