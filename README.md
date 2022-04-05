# Roadmap Voting App

![](https://github.com/upstash/roadmap/blob/main/ss.png)

You can deploy Roadmap application yourself and ask your users to vote for your roadmap features. See the [live example](https://roadmap.upstash.com).

In this version, the user should sign up (via Auth0) to add a new feature and vote them up. Also you can configure yourself as admin, to set a feature request as `release` also delete any feature request.

If you prefer the one without authentication, see the [old version](https://github.com/vercel/next.js/tree/canary/examples/with-redis).

## Docs

- [Set up](#set-up)
- [Configuring Upstash](#configuring-upstash)
- [Configuring Auth0](#configuring-auth0)
- [Deploy on Vercel](#deploy-your-local-project)

## Set up

First clone the repo. Copy the `.env.local.example` file to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

## Configuring Upstash

1. Go to the [Upstash Console](https://console.upstash.com/) and create a new database

#### Upstash environment

`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` find the variables in the database details page in Upstash Console.

## Configuring Auth0

1. Go to the [Auth0 dashboard](https://manage.auth0.com/) and create a new application of type **Single Page Web Applications**
2. Go to the settings page of the application
3. Configure the following settings:
   - **Allowed Callback URLs**: Should be set to `http://localhost:3000/` when testing locally or typically to `https://myapp.com/` when deploying your application.
   - **Allowed Logout URLs**: Should be set to `http://localhost:3000/` when testing locally or typically to `https://myapp.com/` when deploying your application.
4. Save the settings.

#### Auth0 environment

- `NEXT_PUBLIC_AUTH0_DOMAIN`: Can be found in the Auth0 dashboard under `settings`.
- `NEXT_PUBLIC_AUTH0_CLIENT_ID`: Can be found in the Auth0 dashboard under `settings`.
- `NEXT_PUBLIC_AUTH0_ADMIN_ID`: This is the **user_id** of the admin user. First run your application and sign-in yourself. Then find your **user_id** in the Auth0 console, **"User Management > Users"** page.

## Replace Your Logo

Copy your logo image to `public` folder. Then edit `components/Header.tsx`.

## Run Your Project

In the project folder, run:
`npm install`
`next dev`

## Deploy Your Project

To deploy your project to Vercel, run `vercel` in the project folder.

Or you can push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=upstash-roadmap).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
