# Roadmap Voting App Version-2 

You can deploy Roadmap application yourself and get feedback from your users about your roadmap features. 

In version-2, the users should sign up (via Auth0) to add new features and vote them up. If you prefer the one without authentication, see the [old version](https://github.com/vercel/next.js/tree/canary/examples/with-redis). Also you can configure yourself as admin, to set a feature request as `released` also delete any feature request.  



![](https://github.com/upstash/roadmap/blob/main/public/ss.png)

## Docs
- [Set up](#set-up-environment-variables)
- [Configuring Upstash](#configuring-upstash)
- [Configuring Auth0](#configuring-auth0)
- [Deploy on Vercel](#deploy-your-local-project)


## Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```


## Configuring Upstash

1. Go to the [Upstash Console](https://console.upstash.com/) and create a new database

#### Upstash environment

- `REDIS_URL`: Find the URL in the database details page in Upstash Console clicking on Redis Connect button.


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
- `NEXT_PUBLIC_AUTH0_ADMIN_ID`: This is the  **user_id** of the admin user. First run your application and sign-in yourself. Then find your **user_id** int Auth0 console, **"User Management > Users"** page.

## Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=upstash-roadmap).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
