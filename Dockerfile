FROM node:lts

#Create and set working dir of the image
WORKDIR /usr/image-shop-api/

# Install app dependencies
COPY package*.json ./
RUN npm install

#Bundle app source 
COPY ./ ./

# For typescript, compiling typescript
RUN npm run build

CMD ["npm", "start"]