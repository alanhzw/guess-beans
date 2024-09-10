

# 拉取 nginx 镜像
FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

# 安装项目依赖
RUN npm install

# 编译项目
RUN npm run build

EXPOSE 3001

# 启动应用
CMD ["node", "./dist/main.js"]


# docker build -f ./Docker/Dockerfile -t gusee-beans-service . --no-cache
# docker run -d --name gusee-beans-service-instance -p 3001:3001 --restart=always gusee-beans-service