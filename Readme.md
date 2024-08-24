# Autobot

The Autobot Management System is a web application that allows users to manage and interact with Autobots, Posts, and Comments. This application is built using Node.js, Vue.js, and MySQL, with real-time updates provided by WebSockets.

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

```bash
git clone https://github.com/niy42/autobots_v.git
cd autobots_v

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
To interact with the autobots database from your application, you'll need to configure the connection settings. Create or update a config.json file with the following structure to store your database credentials and connection details:

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

#### 3. Verify Connection
After configuring the config.json file, ensure your application is able to connect to the autobots database. This typically involves loading the configuration settings and using them to establish a connection through your application’s database library or ORM.

### 4. Set Up Tables
Once the database is created and connected, you can define and create the necessary tables. For example, you might need to create a table to store autobot information. Here is an example SQL statement to create a table:

```sql
USE autobots;

CREATE TABLE autobots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
This statement creates a table named autobots with fields for ID, name, username, email, and timestamps for record creation and updates.

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