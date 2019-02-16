# Simple budget app for people who just need help living paycheck to paycheck.

## Getting started
- Install Docker
- Install Heroku
<br></br>
## Commands:

### Docker Commands

Development:

`docker-compose up`

Production:

`docker build -t pay2pay .` - build an image

`docker run -t -i -p 5000:5000 pay2pay` - creates writable container layer and starts it.
<br></br>

### Heroku Commands
`heroku container:push web` - Build the image and push to Container Registry




<br></br><br></br>
<br></br><br></br>
<br></br><br></br>
## MISC
recipe for post data
- app.use(express.json())
- content-type →application/json;
- in postman: set body to raw/JSON
### helpful links
 - https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
 - https://expressjs.com/en/advanced/best-practice-security.html
 - https://nodesource.com/blog/nine-security-tips-to-keep-express-from-getting-pwned/
