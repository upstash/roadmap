# Roadmap Voting App

<img src="https://github.com/upstash/roadmap/blob/main/public/app.png" width="100%">

You can deploy Roadmap application yourself and ask your users to vote for your
roadmap features. See the [live example](https://roadmap.upstash.com).

In this version, the user should sign up to add a new feature and vote them up.
Also you can configure yourself as admin, to set a feature request as `release`
also delete any feature request.

If you prefer the one without authentication, see
the [old version](https://github.com/vercel/next.js/tree/canary/examples/with-redis)
.

## Docs

1) [Set up project](#set-up-project)
2) [Configuring Environment Variables](#configuring-environment-variables)
3) [Set up Database](#authentication)
4) [Set up user authentication with next-auth](#authentication)
5) [Run Your Project](#set-up-admin)
6) [Let's make ourselves admin](#set-up-admin)
7) [Deploy to Vercel](#deploy-to-vercel)

## 1) Set up project

First, open up your terminal and navigate and run the following:

```
npx create-next-app --example https://github.com/upstash/roadmap roadmap
```

This will create a new folder in your current directory called **roadmap**.
Then, you can navigate into the folder, install the dependencies, and launch the
app:

```
cd roadmap && npm i
```

## 2) Configuring Environment Variables

Copy the `.env.local.example` file to `.env.local` (which
will be ignored by Git):

```bash
cp .env.local.example .env.local
```

## 3) Set up Upstash Redis

Go to the [Upstash Console](https://console.upstash.com/) and create a new
database

`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` find the variables in
the database details page in Upstash Console.

<img src="https://github.com/upstash/roadmap/blob/main/public/doc/upstash.png" width="600">

## 4) Set up user authentication with next-auth

We will use the **[next-auth](https://next-auth.js.org/)** library for
authentication. This example is preconfigured to use GitHub OAuth.

To set up GitHub for authentication:

1) Go to [GitHub Developer Settings](https://github.com/settings/apps) on
   GitHub.

2) Click on **"New GitHub App"**.

<img src="https://github.com/upstash/roadmap/blob/main/public/doc/github-2.png" width="600">

3) Name your **"GitHub App name"**

4) Add your **"Homepage URL"** (or a placeholder, if you don't have a website
   yet).

5) For the **"Callback URL"** field, put http://localhost:3000.

> Since GitHub only
> allows one callback URL per app, we have to create separate apps for
> localhost and production (hence the "dev" name in step 3).

<img src="https://github.com/upstash/roadmap/blob/main/public/doc/github-5.png" width="600">

6) If the active field under "Webhook" is checked, uncheck it. Now, click on **"
   Create Github App"**

7) Once your app is created, you should see the following screen. Click on **"
   Generate a new client secret"**

<img src="https://github.com/upstash/roadmap/blob/main/public/doc/github-7.png" width="600">

8) Copy the client secret you generated and paste it under the `GITHUB_SECRET`
   value in your .env file

<img src="https://github.com/upstash/roadmap/blob/main/public/doc/github-8.png" width="500">

9) Copy the **Client ID** and paste it under the `GITHUB_ID` value in your .env
   file

<img src="https://github.com/upstash/roadmap/blob/main/public/doc/github-9.png" width="500">

## 5) Run Your Project

In the project folder, run

```
next dev
```

## 6) Let's make ourselves admin

`NEXT_PUBLIC_ADMIN_ID`: This is the id of the admin user. First run your
application and sign-in yourself. You can find your own user id when you create
the first content.

<img src="https://github.com/upstash/roadmap/blob/main/public/doc/admin.png" width="600">
