FROM node:12-alpine

# Create app directory
WORKDIR /usr/app

# Copy app source code
COPY . .

RUN npm install

#Expose port and start application
EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
