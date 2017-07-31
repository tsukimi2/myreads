## MyReads App

MyReads app is a bookshelf webapp that allows you to select and categorize books you have read, are currently reading, or want to read.

## Software Organization
```
+--public/    
 |-- index.html - DO NOT MODIFY
 |-- favicon.ico - React Icon.
+-- src/
 +-- icons/ - Helpful images for your app. Use at your discretion.
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 |-- App.js - This is the root of the app.
 |-- App.css - Styles for your app.
 |-- App.test.js - Used for testing. Provided with Create React App. 
 |-- Book.js - Book component represents a book.
 |-- Booklist.js - Booklist component represents the list of all books.
 |-- BooklistContainer.js - Container where the fetching and updating of books reside.
 |-- Bookshelf.js - Bookshelf component represents a container for books of a particular category. One of "Currently Read", "Want to Read", and "Read".
 |-- Global.js - Contains global constants and variables.
 |-- Search.js - Component for searching books.
 Testing is encouraged, but not required.
 |-- BooksAPI.js - A JavaScript API for the provided Udacity backend. 
 Instructions for the methods are below.
 |-- index.js - You should not add to modify this file. It is used for DOM rendering only.
 |-- index.css - Global styles. You probably won't need to change anything here.
|-- .gitignore 
|-- CONTRIBUTING.MD - Information about contributing to this repo. 
TL;DR - Fork and clone your own version of this to use it.
|-- README.MD - This README file.
|-- SEARCH_TERMS.md - The whitelisted short collection of available search terms 
for you to use with your app.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Requirements
* Node.js version 6

## Installation
1. Clone the github repository on your local computer with git clone.
2. cd myreads
3. Inside myreads directory, type npm install to install all the required dependencies.

## Deployment
* Deploying on developement server: Inside the myreads directory, type npm start to deploy the app on development server. The app can be accessed via http://localhost:8080
* Build: npm build to build the app.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
