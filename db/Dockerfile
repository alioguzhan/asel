from mysql:latest

COPY init.sql /usr/local/init.sql

EXPOSE 3306

CMD [ "mysqld", "--init-file", "/usr/local/init.sql" ]

