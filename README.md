# 🐶 Dogs server

This project provides an API for the [Dogs](https://github.com/mayconsacht/dogs) platform, a social media network for dogs built purely for fun.

## 👷🏼‍♂️ What is inside?

This project uses the following technologies:

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Kysely](https://kysely.dev/)
- [Vercel Blob Storage](https://vercel.com)

The API was built using [Node.js](https://nodejs.org/) and [Typescript](https://www.typescriptlang.org/), with [Kysely](https://kysely.dev/) as the query builder to explore its capabilities. Additionally, the application is deployed on Vercel, where we not only use a database but also leverage [Vercel Blob Storage](https://vercel.com) for image uploads.

## 📦 Getting Started

This project is live at https://dogs.mayconsacht.com. You can access it through the website, but if you prefer to run it locally, I recommend setting up a PostgreSQL instance on [Vercel](https://vercel.com), as you'll also need to create a [Vercel Blob Storage](https://vercel.com) to configure the token for image uploads.

Once you've created the database instance and the blob storage, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/mayconsacht/dogs-server.git
cd dogs-server
```

2. Create a `.env.local` file and configure the following variables:

```bash
POSTGRES_DATABASE=#your database
POSTGRES_HOST=#your database host
POSTGRES_PASSWORD=#your database password
POSTGRES_URL=#your database url
POSTGRES_USER=#your database user
BLOB_READ_WRITE_TOKEN=#your vercel blob token
JWT_SECRET=#any secret
CLIENT_URL=#http://localhost:3001 if you are running the client locally
NODE_ENV=development
```

3. Install the dependencies:

```bash
yarn install
```

4. Execute the migration to create the database tables:

```bash
yarn migrate
```

## 🚀 Quick Start

After installing the dependencies, start the development server with the following command:

```bash
yarn dev
```

To build the application for deployment, you can use:

```bash
yarn build
```

## 📄 License

This project is licensed under the MIT License.
