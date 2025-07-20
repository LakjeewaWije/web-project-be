# Getting Started
===============

## Clone the Project

```bash
git clone https://github.com/LakjeewaWije/web-project-be
```

## Install Dependencies

```bash
cd web-project-be
npm install
```

## Run the Docker Compose File

```bash
docker-compose up -d
```

This will start the database container in detached mode.

## Run the Project Locally

```bash
npm run start:dev
```

This will start the development server, and you can access the application at [http://localhost:3200](http://localhost:3200).



# Dependencies
=============

The following dependencies are installed in this project, excluding Nest-generated dependencies:

### Bcrypt

* A library for hashing and verifying passwords.
* [Bcrypt on npm](https://www.npmjs.com/package/bcrypt)

### Class-Transformer

* A library for transforming plain JavaScript objects to class instances.
* [Class-Transformer on npm](https://www.npmjs.com/package/class-transformer)

### Class-Validator

* A library for validating class instances.
* [Class-Validator on npm](https://www.npmjs.com/package/class-validator)

### Libphonenumber-js

* A library for parsing and formatting phone numbers.
* [Libphonenumber-js on npm](https://www.npmjs.com/package/libphonenumber-js)

### Pg

* A PostgreSQL driver for Node.js.
* [Pg on npm](https://www.npmjs.com/package/pg)


### Typeorm-Transactional

* A library for working with transactions in TypeORM.
* [Typeorm-Transactional on npm](https://www.npmjs.com/package/typeorm-transactional)