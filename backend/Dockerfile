# ใช้ Node 20 alpine เบา
FROM node:20-alpine

# กำหนด working directory
WORKDIR /app

# copy package.json ก่อนเพื่อติดตั้ง dependencies
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# copy source code ทั้งหมด
COPY . .

# expose port
EXPOSE 3000

# start backend
CMD ["npm", "start"]
