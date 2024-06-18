[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
## Description
Estructura base de todos los micro servicios que se tengan dentro del ecosistema, la idea es que se clone para iniciar nuevos micro servicios y sea acá donde se definen aspectos básicos de estos servicios como gestión de conexiones y middlewares.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
# Migrations
## Seed Commodities:

$ npx nestjs-command seed:example
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Prisma
[Prisma](https://docs.nestjs.com/recipes/prisma) is an ORM that helps app developers build faster and make fewer errors.

To use prism you need to use the environment variable DATABASE_URL. 

Generate Prisma Client JS by running
If you need to use prism when running the project you have to run this command.
Note: Every time you update schema.prisma re-generate Prisma Client JS.

```bash
$ npm run prisma:generate
```

Command to apply migrations.

```bash
$  npm run prisma:migrate
```

Command to format the schema.prism file, for when schemas are mixed.

```bash
$  npm run prisma:format 
```

Command to apply seeders.

```bash
$  npm run prisma:seed
```

Prism commands can be run by positioning yourself in the src file, at the prism folder level.

## Prismix
[Prismix](https://www.npmjs.com/package/prismix) library is used to keep the schemas files separate, it mixes all the files you have.

Every time you make a change in the schemas or add one, you must run this command:

```bash
$ npx prismix
```

## Support

## Example  .env
[Confluence](https://grainchain.atlassian.net/wiki/spaces/CRM/pages/2361196600/Environment+Example)
