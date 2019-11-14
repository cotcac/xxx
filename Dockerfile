FROM node:12
# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install

COPY . .

# Run migration. Order is important it have to after copy . .
RUN npx sequelize-cli db:migrate

CMD ["npm", "start"]
