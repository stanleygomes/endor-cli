# Mark II - A nodeJS bot to test a duolingo story

This is for testing only porposes 🚀

*It was crafted on [Nodevader](https://github.com/stanleygomes/nodevader)*.

## Requirements

- Node: `10.x`
- Global dependencies: `nodemon, mocha and eslint`

## Startup

Step by step to get this up and running

### Clone repo and go to project folder

```
git clone https://github.com/stanleygomes/mark-ii.git && cd nodevader
```

### Install dependencies

```bash
npm install
npm i -g nodemon mocha eslint
```

### Start server

Via express server

```bash
npm run dev
```

### Start enviroment

Copy enviroment variables template

```bash
cp .env.template .env
```

Via docker-compose (start database, run migrations and start server)

```bash
docker-compose up
```

Replace your duolingo credentials on `.env` file

```
# duolingo credentials
DUOLINGO_USERNAME=your-email@test.com
DUOLINGO_PASSWORD=yourSecureAndSecretPassword
```

To test it on the browser, simply go to: `http://localhost:3000/crawler`
