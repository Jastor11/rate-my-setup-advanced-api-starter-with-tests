# Rate My Setup Advanced API

This repo should server as a starting point for the Rate My Setup application API. 
## Dev Setup

To get the environment up and running, install the dependencies with `npm install`.

Next, make sure to create a `.env` file from the `.env.template` file by running:

```bash
cp .env.template .env
```

And modify any of the necessary environment variables.

Then (as long as PostgreSQL is running on your machine) create the db and tables by running:

```bash
psql -f rate-my-setup.sql
```

Finally, start up the application with `npm start`.
