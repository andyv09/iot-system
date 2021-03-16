FROM node:14
WORKDIR /usr/app
COPY package*.json .
RUN npm install
RUN npm install express
#RUN npm ci --only=production
COPY . .
CMD ["node", "index.js"]