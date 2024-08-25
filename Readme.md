# Autobot

This is a full-stack application that enables autobots, comments, and posts. This application is built using Node.js, Vue.js, and MySQL, with real-time updates provided by WebSockets.

![Autobots](https://github.com/niy42/autobot_v/blob/main/client/src/assets/autobots.png)
![Autobots](https://github.com/niy42/autobot_v/blob/main/client/src/assets/auto.gif)

## Features

- Generates 500 new, distinct Autobots, 10 new posts, and 10 new comments automatically every hour in the background.
- Real-time updates using WebSockets.
- Pagination and rate-limited API endpoints.
- Responsive front-end design using Vue.js.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm (v6.x or higher) or Yarn
- MySQL (v8.x or higher)

### Clone the Repository


- git clone `https://github.com/niy42/autobots_v.git` 
- cd `autobots_v`

```bash

### Backend Setup

1. Navigate to the backend directory:

    
    cd backend
    

2. Install the dependencies:


    npm install
   

3. Run database migrations and seeders:

    Run the following commands to migrate the database and seed initial data:

    
    npx sequelize db:migrate
    npx sequelize db:seed:all
 

4. Start the backend server:

    Start the server by running:

   
    npm run dev
 
```
## **Creating the `autobots` Database in MySQL**

To set up the `autobots` database in MySQL, follow these steps:

### 1. Create the Database

Use the MySQL Command Line Interface (CLI) to create the database. Open your terminal or command prompt and enter the following command:

```sql
CREATE DATABASE autobots;
```
This command initializes a new database named autobots. Ensure you have the necessary privileges to create databases.

### 2. Configure Database Connection
You can find the config.json file located in the config folder to interact with the autobots database from your application:

```bash
{
  "development": {
    "username": "root",
    "password": "0000",
    "database": "autobots",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "autobots",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "autobots",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
This config.json file allows your application to establish a seamless connection to the autobots database, facilitating interactions such as querying, updating, and managing data.

### 3. Verify Connection
After configuring the config.json file, ensure your application is able to connect to the autobots database. This typically involves loading the configuration settings and using them to establish a connection through your application’s database library or ORM.

### 4. Set Up Tables

After connecting to the `autobots` database, you can define and create the necessary tables using Sequelize, an ORM for Node.js. Below is an example of how to define and create a table for storing autobot information:

1. **Define the Autobot Model**: In the application, a Sequelize model similar to the below is already created for the `autobots` table.

    ```javascript
    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = new Sequelize('autobots', 'your-username', 'your-password', {
      host: 'localhost',
      dialect: 'mysql'
    });

    const Autobot = sequelize.define('Autobot', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      }
    });

    module.exports = Autobot;
    ```

2. **Sync the Model with the Database**: To create the `autobots` table in the database, sync the model:

    ```javascript
    sequelize.sync({ force: true }).then(() => {
      console.log("Autobots table has been created.");
    });
    ```

    This will generate the `autobots` table in the database with columns for `id`, `name`, `username`, `email`, `createdAt`, and `updatedAt`.

By following these steps, you'll have a fully set up `autobots` table in your MySQL database using Sequelize, and your application will be able to interact with it seamlessly.

```bash

### Frontend Setup

1. Navigate to the frontend directory:


    cd client
    

2. Install the dependencies:

    
    npm install
    

3. Start the frontend development server:
    Start the server by running:


    npm run dev


    Open your browser and go to http://localhost:5173 to view the application.
    
```
## **API Documentation**
The API is documented using `Swagger`:

To view the documentation locally:

Ensure your backend server is running.
Visit `http://localhost:3000/api-docs` in your browser.