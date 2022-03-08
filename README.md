
## My first NestJS project
Lesson from: [React, NextJS and NestJS: A Rapid Guide - Advanced
](https://www.udemy.com/course/react-nestjs-advanced)
## Prerequisite
- [node](https://nodejs.dev/download/)
- [Docker](https://docs.docker.com/compose/install)
- [pgAdmin](https://www.pgadmin.org/)

## Get started
### Install dependencies
```bash
yarn install
```

### Run Database docker 
```bash
docker-compose up -d
```

### Start Developement
```bash
yarn start dev
```
It will run on [http://localhost:3000](http://localhost:3000)

### Mock up data
#### Ambassdors
```bash
yarn seed:ambassadors
```

#### Products
```bash
yarn seed:products
```

#### orders
```bash
yarn seed:orders
```