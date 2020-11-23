FROM node:14.14.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add app
COPY . ./

CMD [ "yarn", "dev" ]
