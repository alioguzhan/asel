FROM python:3.5

# Install node prereqs, nodejs and yarn
# Ref: https://deb.nodesource.com/setup_8.x
# Ref: https://yarnpkg.com/en/docs/install
RUN \
  apt-get update && \
  apt-get install -yqq apt-transport-https apt-utils
RUN \
  echo "deb https://deb.nodesource.com/node_8.x jessie main" > /etc/apt/sources.list.d/nodesource.list && \
  wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
  wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  apt-get update && \
  apt-get install -yqq nodejs yarn && \
  rm -rf /var/lib/apt/lists/*

RUN rm -r /usr/src/app ; mkdir -p usr/src/app

WORKDIR /usr/src/app

COPY app/ /usr/src/app/

RUN python3.5 -m venv venv

RUN /bin/bash -c "source venv/bin/activate"

RUN pip install -r req.pip

RUN yarn install

EXPOSE 5000

CMD [ "./wait-for-it.sh", "db:3307", "-t", "30", "--", "yarn", "start"]

