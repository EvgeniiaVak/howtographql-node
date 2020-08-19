# How to GraphQL - node

This repository is an exercise based on https://www.howtographql.com/graphql-js/0-introduction/ tutorial. It's a GraphQL server built with [graphql-yoga](https://github.com/prisma-labs/graphql-yoga), database is managed by [prisma](https://github.com/prisma/prisma)

## Features

* GraphQL query, mutation, subscription examples
* Logging in and using tokens from context
* Paginated queries
* Filtered queries

## Database model changes 

In case some changes need to be made in the database

1. update the model in `prisma/schema.prisma`
2. run `npx prisma migrate save --name "short-useful-migration-name" --experimental` with a custom name
3. apply the migration with `npx prisma migrate up --experimental`