This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## After cloning ...

First, install all dependencies

```bash
npm install
```

Set up a secret configs file. This project uses mongo db atlas. You need to have an atlas
account to get working 

```bash
 secret_config.js
------------------

export const config = {
  mongodb_uri:
    "your atlas connection string",
  jwt_signing_key: "random key to sign jwt tokens",
};

```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Features of this project

App should be used as a password manager

- User auth using NextAuth
- Storage using MongoDB Atlas
- Create and read secrets 
- Client side encryption

## To do

- Refactor
- Refine ui (add loading wheels, etc)
- Deploy solution
