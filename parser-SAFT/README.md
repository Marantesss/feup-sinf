# SAF-T File Parser

## Populating Database with SAF-T DATA

### Running Database Migrations

In order for the parsing and seeding to work, first we need to create the database's tables. So attach a shell to the running backend container and run migrations with command:

```bash
yarn migrate
```

### Parsing and Seeding

After this, you can simply come back to this application, and run it locally with:

```bash
yarn start
```
