from mysql:latest

COPY init.sql /usr/local/init.sql

EXPOSE 3307

CMD [ "mysqld", "--init-file", "/usr/local/init.sql", "--port", "3307" ]

