# Simple budget app for people who just need help living paycheck to paycheck.

## Getting started
- Install Docker https://docs.docker.com/install/
- Install Heroku https://devcenter.heroku.com/articles/heroku-cli#download-and-install
- `heroku login` log in to Heroku. this will ask to open chrome so you can sign in
<br></br>
## Setting up the project environment and build process
after docker and heroku  have been installed
- `git clone git@github.com:stevecfischer/paycheck2paycheck.git`
- `cd paycheck2paycheck`
- `heroku container:login`
- `heroku create` creates a project (Ex. Creating app... done, ⬢ gentle-woodland-60237)
- `heroku container:push web --app gentle-woodland-60237` pass the app name from above to this command
- `heroku container:release web --app gentle-woodland-60237`
- `heroku open --app gentle-woodland-60237`

### running project locally
`docker-compose up --build` runs the docker-compose.yml in project root.<br />This will install node_modules for both client and
server in the docker image only. No need to manually install node_modules.

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
 - https://devcenter.heroku.com/categories/deploying-with-docker
