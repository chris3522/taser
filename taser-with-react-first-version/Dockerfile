# run these commands in a terminal
# $ docker build -t taser-app .
# $ docker run \
#    -it \
#    --rm \
#    -v ${PWD}:/taser-app \
#    -v /taser-app/node_modules \
#    -p 3001:3000 \
#    -e CHOKIDAR_USEPOLLING=true \
#    taser-app


# see taser-app at http://localhost:3001/

FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN yarn global add react-scripts@3.4.1

# add apps
COPY . ./

# start app
CMD ["yarn", "start"]

