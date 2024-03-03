# Ad website (WORK IN PROGRESS)

### [Try it out here](https://ads.2qcrpf08feqps.eu-central-1.cs.amazonlightsail.com/)

## Description

This project is an AD website, a simplified version of https://www.skelbiu.lt/ or the like. A place where people can sell or give away their used things.

## Motivations

It is my personal opinion that you should try to avoid throwing out things as much as possible. If it's something I don't use anymore, I will try to find a new owner for it, even if it's for free. This is why I like and respect websites like this.

Main purpose of this project was to try out many different relations in `TYPEORM`.

- We have simple One-to-Many with `user` and `ad`, where they are created at different times.
- A One-to-Many with `ad` and `image`, where `image` is fully controlled through creation and updating of and `ad`.
- A Many-to-Many between `ad` and `category`. Categories could have been done different but I wanted to use Many-to-Many to learn it.
- A more advanced Many-to-Many between `ad` and `user` in a form of a `comment`, that has some extra fields with it.

Added `admin` status to user to use both authentication and authorization.

## Setup

1. `npm install`
2. Create a PostgreSQL database.
3. Setup `.env` files in `client` and `server` based on `.env.example` files.
4. Run server and client
5. Go to `/debug` and reset the database to Seed some example entries.
6. You can now login with pre-made account or create your own.

## Tests

```bash
# front end unit and E2E tests
npm test -w client

# front end unit tests
npm run test:unit -w client

# front end E2E tests
npm run test:e2e -w client

# back end tests with an in-memory database
npm test -w server
```
