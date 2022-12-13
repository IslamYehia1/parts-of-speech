# Part Of Speech

An interactive activity using ReactJS, NodeJS, and ExpressJS that helps the students practice categorizing a
set of words according to their part of speech.

## Live demo

The backend is hosted on an azure vm instance with Nginx and PM2 running the backend and github actions for the CI/CD
[Live demo link](https://part-of-speech.netlify.app/)

API endpoints :
[Words Endpoint](https://part-of-speech.westeurope.cloudapp.azure.com/words) : Accepts a get requests with no parameters and returns a list of words
[Rank Endpoint](https://part-of-speech.westeurope.cloudapp.azure.com/rank) : Accepts a post request with an object in the body of the form {score : 90} and returns an object of the form {ranking : 80}

## Development server

### Docker Compose

- cd ./
  - Run image `docker compose up`
  - Frontend Running on [http://localhost:3000](`http://localhost:3000`)
  - Backend Running on [http://localhost:4000](`http://localhost:4000`)

---

### Server and client seperately (Recommended)

Frontend:

- cd ./frontend

  - Run `npm ci && npm start`
  - Running on [http://localhost:3000](`http://localhost:3000`)

Backend:

- cd ./backend
  - Run `npm ci && npm run dev`
  - Running on [http://localhost:4000](`http://localhost:4000`)

---

## Production deployment

For the frontend run `npm ci && npm run build`, and deploy the directory frontend/build

The backend can be built with `npm ci && npm run build` command
