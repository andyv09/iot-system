FROM nikolaik/python-nodejs
WORKDIR /usr/app
COPY package*.json .
RUN npm install
#RUN npm ci --only=production
COPY . .
RUN npm install node-rdkafka