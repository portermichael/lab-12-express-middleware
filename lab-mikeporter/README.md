#lab 12 documentation


Install this program by cloneing the git project and calling npm init -y in the lab-mikeporter folder. From there install all dependencies with npm i -S.

The server starts with npm run start-db, and stops with npm run stop-db.

The program starts with npm start.

Tests can be performed after installing developer dependencies with npm i -D and then calling npm test.

#Base object
Our base object is a dog. This dog requires a breed, age and name properties.

#post
The post request requires a body including a breed as a string, a colnameor as a string and a age as a number to /api/dogs. The response includes a 200 status and the properties of the object created in the body including \_id, breed, name and age.

Sending partial dog properties or no dog properties results in a 400 status.

#get
The get request requires a valid id in the url, /api/dogs/:id. With a valid id, the dog and it's properties are sent in the body with a 200 response. With no :id or an invalid :id a 404 response is sent.

#put
A put request requires a valid dog url to /api/dogs/:id and a body to update. With a valid id and body to update the response includes the updated dog. A valid update includes any combination of breed, name and age properties. With no dog properties sent or an invalid id, a 404 response is sent.

#delete
A valid delete request requires a url to /api/dogs/:id. With a valid id the object is deleted and a 204 is sent. With an invalid or missing id a 404 not found response is sent.
