## Stack

- node (12.16.1)
- npm (6.13.4)
- typescript (3.9.7)

## Global dependencies

- npm
- node
- typescript (`npm install -g typescript`)

## build

> `yarn tsc`

or

> `npm run build`

## Sequelize commands

Create database

`npx sequelize db:create`

Create migration

`npx sequelize migration:create --name=create-login`

Execute migrate

`npx sequelize db:migrate`

Undo to last migrate

`npx sequelize db:migrate:undo`

Undo all migrates

`npx sequelize db:migrate:undo:all`

Create a seed

`npx sequelize seed:generate --name seed-name`

Run all seeders

`npx sequelize db:seed:all`

Undo the last seed

`npx sequelize db:seed:undo`

Undo all seeds

`npx sequelize db:seed:undo:all`

Undo specifc seed

`npx sequelize db:seed:undo --seed path/to/seed/file.js`