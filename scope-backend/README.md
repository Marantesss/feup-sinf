# Scope Backend

## Using Docker

Navigate to the project's root folder (where the `docker-compose.yml` file is) and run the following command:

```
docker-compose up scope-backend
```

This will build (if not already) a docker image and run it. Don't worry, everything is already configured for you, so you only need to go to `localhost:8000` on your browser or API testing app like *Postamn*. Feel free to make changes and watch the magic happen when you press `ctrl`+`s` and the container hot-reloads the changes you made.

## Local Machine

### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn dev
```

#### Compiles and minifies for production
```
yarn build
```

#### Lints and fixes files
```
yarn lint
```