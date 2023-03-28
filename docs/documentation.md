## Installation

```bash
# install all dependencies
$ yarn

#setup the database
$ yarn prisma

#setup .env
- Create a .env file and config the credentials based on .env.example file
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Running Tests
```
# Run unit tests
$ yarn test:unit
```

## Insomnia

- Import Insomnia_2022-10-08.json file into your Insomnia app

## Endpoints - /api/#/

### Player
- POST :: player/create [Creates a player]
- POST :: player/auth [Authenticates a player]

### Cards - Authentication required
- POST :: card/create [Creates a card]
- PUT :: card/update [Updates a card]
- DELETE :: card/delete [Deletes a card]
- GET :: card/list [List all player's cards] - card/list?name=any [List all player's cards by given name]


- Access http://localhost:3000/api/#/ (LOCAL) to access *SWAGGER DOCUMENTATION*
