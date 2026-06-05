# HAIBAZO Book Review Application

## Overview

HAIBAZO Book Review Application is a full-stack web application developed as part of the HAIBAZO Intern Software Engineer Technical Assessment.

The application allows users to manage Authors, Books, and Reviews through a simple and user-friendly interface. The system follows a client-server architecture with a React frontend, FastAPI backend, and PostgreSQL database.

---

## Live Demo

### Frontend

https://haibazo-book-review-ecru.vercel.app/

### Backend API

https://haibazo-book-review-api.onrender.com

### API Documentation

https://haibazo-book-review-api.onrender.com/docs

---

## Tech Stack

### Frontend

* ReactJS
* Axios
* CSS3
* Vite

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

### Database

* PostgreSQL
* Supabase

### Deployment

* Vercel (Frontend)
* Render (Backend)
* Supabase (Database)

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
* Assign Author to Book
* Pagination
* Form Validation

### Review Management

* Create Review
* View Review List
* Update Review
* Delete Review
* Assign Review to Book
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
HAIBAZO-BOOK-REVIEW
│
├── backend
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── seed.py
│   ├── main.py
│   ├── requirements.txt
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

### Backend Setup

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

### Frontend Setup

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

Pagination is implemented for:

* Authors List
* Books List
* Reviews List

Each page displays 5 records.

---

## Deployment Notes

The application is deployed using:

* Frontend: Vercel
* Backend: Render
* Database: Supabase PostgreSQL

Note: The backend is hosted on Render Free Plan. The first request after a period of inactivity may take a few seconds to respond while the service wakes up.

---

## Author

**Huynh Doan Tan Phat**

Information Technology Student
FPT Greenwich Vietnam – Da Nang Campus

Technical Assessment Submission for HAIBAZO.
