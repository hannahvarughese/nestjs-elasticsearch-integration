# Nestjs & ElasticSearch

This is a simple NestJS project with ElasticSearch added as a database. This project has endpoints with basic CRUD opreations.

### Prerequisites
Ensure you have the following installed:

Node.js (v16 or later) - [Download](https://nodejs.org/en)

NestJS CLI (optional, for development) - Install via:
```
npm install -g @nestjs/cli
```

Elasticsearch (v8.x recommended) - [Download & Install](https://www.elastic.co/downloads/elasticsearch)

Ensure Elasticsearch is running:
```
elasticsearch.bat # Windows
./bin/elasticsearch # Linux/Mac
```

###  Installation & Setup
1. Clone the Repository
```
git clone https://github.com/your-repo/nestjs-elasticsearch-integration.git
cd nestjs-elasticsearch
```
2. Install Dependencies
```
npm install
```
3. Update the `.env`
```
PORT=3000 # If you want to run it on some other port, update this
```
Start the Application
```
npm run start:dev
```
The application will run on PORT 3000 if no other port is specified in `.env`

### API Endpoints

** 1. Add an Elasticsearch index **

  Endpoint: POST `/books/:index/create`
  Request Body (optional):
  ```
  {
    "properties": {
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "category": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      },
      "price": {
        "type": "float"
      }
    }
  }
  ```
  Ex: `/books/new-books/create`

** 2. Add a single document **

  Endpoint: POST `/books/:index/add`
  Request Body:
  ```
  { 
    name: "The Blade Itself", 
    price: 16.99, 
    category: "Fantasy" 
  }
  ```
  Ex: `/books/new-books/add`

** 3. Add multiple documents **

  Endpoint: POST `/books/:index/bulk-insert`
  Request Body:

  ```
  [
    { 
      name: "Bird Box", 
      price: 12.99, 
      category: "Thriller" 
    },
    ...
  ]
  ```
  Ex: `/books/new-books//bulk-insert`

** 4. Search documents **

  Endpoint: GET `/books/:index/search`
  Request Body:
  ```
  {
    "term": {
      "_id": {
        "value": "12234",
        "boost": 1.0
      }
    }
  }
  ```
  or
  ```
  {
    "match": {
      "category": "Science Fiction"
    }
  }
  ```
  Example: `/books/new-books/search`

** 5. Update a document **

  Endpoint: PUT `/books/:index/update/:id`
  Request Body:
  ```
  {
    "price": 899.99
  }
  ```
  Example: `/books/new-books/update/1133`

** 6. Delete an Item **

  Endpoint: DELETE `/books/:index/delete/:id`
  Example: `/books/new-books/delete/113223`