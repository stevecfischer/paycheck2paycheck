# Simple budget app for people who just need help living paycheck to paycheck.

## Getting started
- Install Docker https://docs.docker.com/install/
- Install Heroku https://devcenter.heroku.com/articles/heroku-cli#download-and-install
- `heroku login` log in to Heroku. this will ask to open chrome so you can sign in
<br></br>
## Setting up the project environment and build process
after docker and heroku  have been installed
1. `heroku container:login` Log in to Container Registry
2. `git clone git@github.com:stevecfischer/paycheck2paycheck.git` clone repo
   1. `cd <repo>`
3. `heroku create <image>` create a Heroku app (ex. `paycheck2paycheck`)
4. not sure if these need to be ran. since we're going to push with docker image
5. `heroku container:push web` Build the image and push to Container Registry
6. `heroku container:release web` Then release the image to your app
7. `heroku open` open the app in your browser
8. `heroku stack:set heroku-18`
9. `git push heroku master`


### running project locally
`docker-compose up` runs the docker-compose in project root. This will install node_modules for both client and
server *in the docker image only*. You don't need to install node_modules at all. Docker does it for you.

to simulate the production env you can run these commands or `heroku open` (see above) 
`docker build -t pay2pay .` - build an image
`docker run -t -i -p 5000:5000 pay2pay` - creates writable container layer and starts it.
<br></br>
## MISC
recipe for post data
- app.use(express.json())
- content-type →application/json;
- in postman: set body to raw/JSON
### helpful links
 - https://devcenter.heroku.com/articles/container-registry-and-runtime
 - https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
 - https://expressjs.com/en/advanced/best-practice-security.html
 - https://nodesource.com/blog/nine-security-tips-to-keep-express-from-getting-pwned/
