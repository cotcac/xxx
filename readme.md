# Express Sequelize boilerplate
```
cp .env.example .env
```
# Quick start

You need to have postgres server running first.

## Docker

```
docker-compose build
docker-compose up
```
## No docker
```
npm i
// run migration
npx sequelize-cli db:migrate
nodemon bin/www
```
# Undo Migration
If you change your database structure you need to remigration.
```
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate
```

# Test
```
npm test
```
# Coverage

```
npm run coverage
```
Open browser
{root}/coverage/index.html

# Postman

https://documenter.getpostman.com/view/7994605/SW7T8rPa?version=latest

# API doc swagger

https://app.swaggerhub.com/apis-docs/cotcac/xxx/1.0.0

# Eslint

```
npm run -s eslint .
```
