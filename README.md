# HAIBAZO Book Review Application

## Overview

HAIBAZO Book Review Application is a full-stack web application developed as a technical assessment project.

The system allows users to manage Authors, Books, and Reviews through a simple and user-friendly interface. Data is stored in PostgreSQL and managed through RESTful APIs built with FastAPI.

---

## Tech Stack

### Frontend

* ReactJS
* Axios
* CSS3

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL

### Version Control

* Git
* GitHub

---

## Features

### Author Management

* Create Author
* View Author List
* Update Author
* Delete Author
* Pagination
* Form Validation

### Book Management

* Create Book
* View Book List
* Update Book
* Delete Book
* Select Author
* Pagination
* Form Validation

### Review Management

* Create Review
* View Review List
* Update Review
* Delete Review
* Select Book
* Pagination
* Form Validation

---

## Database Structure

### Authors

| Field | Type    |
| ----- | ------- |
| id    | Integer |
| name  | String  |

### Books

| Field     | Type    |
| --------- | ------- |
| id        | Integer |
| title     | String  |
| author_id | Integer |

### Reviews

| Field   | Type    |
| ------- | ------- |
| id      | Integer |
| review  | Text    |
| book_id | Integer |

---

## Project Structure

```text
book-review-app
│
├── backend
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── seed.py
│   ├── main.py
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── AuthorsPage.jsx
│   │   │   ├── BooksPage.jsx
│   │   │   └── ReviewsPage.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
└── README.md
```

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Validation Rules

### Authors

* Name is required

### Books

* Title is required
* Author must be selected

### Reviews

* Book must be selected
* Review content is required

---

## Pagination

Pagination is implemented on:

* Authors List
* Books List
* Reviews List

Each page displays 5 records.

---

## Author

**Huynh Doan Tan Phat**

Technical Assessment Submission for HAIBAZO.
