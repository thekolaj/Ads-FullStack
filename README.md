# Ad website (WORK IN PROGRESS)

### [Try it out here](https://ads.2qcrpf08feqps.eu-central-1.cs.amazonlightsail.com/)

## Description

This project is an AD website, a simplified version of https://www.skelbiu.lt/ or the like. A place where people can sell or give away their used things.

Full-Stack project with the focus on back-end, deployment and maintenance.

### Tech

TypeScript, Vue, tRPC, TypeORM, Zod, PostgreSQL, Vitest, Playwright, Sentry, Pino Logger, Flowbite, nginx, Docker

## Content

### Implemented:

Most of the original plan for backend got implemented and tested.

- Users. You can create a user, update some of its data and login. Some admin privileges.
- Ads. Create, update, delete, detail view, lists with filters and pagination.
- Images. Simplified version by storing links to external web.
- Categories. List with ad count, badges on ads. Create, update, delete - backend only.
- Comments. Display fully implemented. Create, update, delete - backend only.
- Tests. Unit for all main features. E2E for fully implemented user flows.
- CI. Github workflow with full testing, linting, containerization, and deployment to AWS Lightsail.
- StdOut logging with Pino.
- Sentry for Error management. Client and Server.
- Demo mode. Pre-seeded data for demonstration purposes. Sample users, ads, categories, comments. Instruction on login screen.

### Future features:

Some front end features got cut, is it was taking 3x the time to create them on the client than it did on the server. Since this is a backend focused project, frontend got less focus.

- Categories. Create, update, delete - frontend.
- Comments. Create, update, delete - frontend.
- Images. File storage and validation.
- Admin. Secure admin creation and admin panel.
- Some front-end components from Flowbite used as stand ins for now. (Image carousel)

## Motivations

It is my personal opinion that you should try to avoid throwing out things as much as possible. If it's something I don't use anymore, I will try to find a new owner for it, even if it's for free. This is why I like and respect websites like this.

Main purpose of this project was to try out many different relations in `TYPEORM`.

- We have simple One-to-Many with `user` and `ad`, where they are created at different times.
- A One-to-Many with `ad` and `image`, where `image` is fully controlled through creation and updating of and `ad`.
- A Many-to-Many between `ad` and `category`. Categories could have been done different but I wanted to use Many-to-Many to learn it.
- A more advanced Many-to-Many between `ad` and `user` in a form of a `comment`, that has some extra fields with it.

## Setup

1. `npm ci`
2. Create a PostgreSQL database.
3. Setup `.env` files in `client` and `server` based on `.env.example` files.
4. Run server and client. `npm run dev -w client`, `npm run dev -w server`
5. Go to `/debug` and reset the database to Seed some example entries.
6. You can now login with pre-made account or create your own. Refer to `/login` page.

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
