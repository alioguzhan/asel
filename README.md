# Asel
code-named: Asel --- An authentication system trial with `Flask` - `MySQL` - `Docker`

Documentation and setup instructions for the project.

## Overview

- [Techs](#techs)
- [Installation and Running](#installation-and-running)
- [Development](#development)
- [To Do](#to-do)
- [What is Asel ?](#what-is-asel)

## Techs

Project built with / based on following techs:

- Docker & Docker-Compose
- Python 3.5 & Flask
- MySQL
- React

The project consists of 2 docker containers:
- `db`
- `web_app`

You can inspect [docker-compose.yml](docker-compose.yml) file for more details on images and containers.

### Why Docker ?

```
I didn't like the idea of creating and modifying databases in the host machine. 

With Docker, we have absolute freedom to play with our isolated database.
```

**God save Docker!**

## Installation and Running

### Installation
The only required dependency is `Docker`. This is the docker version of the computer that project was developed:

    $ docker --version
    Docker version 17.09.0-ce, build afdb6d4

`Docker 17 ` is NOT required BUT recommended. Previous versions of docker might work, but not tested.

To install Docker, you can visit official [web site](https://www.docker.com/community-edition).

### Running

To run the application, first, clone the repository:

    $ git clone git@github.com:alioguzhan/asel.git

`cd` into project folder:

    $ cd asel

And start it with docker-compose:

    $ docker-compose up --build

_Note: The `--build` arg is required only for the first time. Unless you don't modify source code of any service, you don't need to `--build` containers every time to run the project._

Now go to [http://localhost:5000](http://localhost:5000) to see it in action.

## Development

If you want to change or update the code, feel free to do it. But once you edited the code, you need to build that service before running. You can either build each container itself, or you can pass an argument to docker-compose command:

    $ docker-compose up --build

This will build all containers before running.

## To Do

- Improve Design for Mobile
- Don't store passwords as raw text in db


## What is Asel?

It is the name of my nephew who was born on the same day as i started this project.