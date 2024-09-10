
# 拉取 nginx 镜像
FROM nginx

COPY dist /usr/share/nginx/html

COPY Docker/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 5473

CMD ["nginx","-g","daemon off;"]


# docker build -f ./Docker/Dockerfile -t guess-beans . --no-cache
# docker run -d --name guess-beans-instance -p 5473:5473 --restart=always guess-beans