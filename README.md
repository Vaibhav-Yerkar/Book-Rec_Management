# Book-Rec_Management

Server  >> Storing Book Data
        >> User Register
        >> Subscribtion


This lis a book record managemnt API Server/ Backend for the library system or managemnet of records or manuals or books

## Fine System : 
fine per day :- 50/- day : for missed by renewal date
fine : 100/- : for missed by subcription date
fine : 100 + (50*3/- day) : for missed by subscription and renewal date

## Subcription Types :
    3 Months (Basic)
    6 Months (Standard)
    12 Months (Premium)

# Routes and Endpoints :

## /users
POST : create a new user
GET : Get all the users info 

## /users/{id}
GET : Get user via id
PUT : Update a user's info via id
DELETE : delete a user via id (check for uncleared fines and issued books)

## /users/subcriptions/{id}
GET : Get subcription details 
        >> Date of Subcription and Vaildity
        >> Uncleared Fine

## /books
GET : Get all the books info
POST : Add new books

## /books/{id}
GET : Get book via id
PUT : Update a book via id
DELETE : delete a book via id

## /books/issued
GET : Get all issued books

## /books/issued/withFines
GET : Get all isuued books with the fine