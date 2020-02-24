FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/apps/falabella
WORKDIR /usr/src/apps/falabella

# Install app dependencies
COPY package*.json /usr/src/apps/falabella/

RUN npm install

# Bundle app source
COPY . /usr/src/apps/falabella/

EXPOSE 3000
CMD [ "npm", "start" ]