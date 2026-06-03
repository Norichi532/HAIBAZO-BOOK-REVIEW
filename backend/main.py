from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Book Review API is running"}


@app.get("/authors")
def get_authors(db: Session = Depends(get_db)):
    return db.query(models.Author).order_by(models.Author.id).all()


@app.post("/authors")
def create_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    if not author.name.strip():
        raise HTTPException(status_code=400, detail="Please enter name")

    new_author = models.Author(name=author.name)
    db.add(new_author)
    db.commit()
    db.refresh(new_author)
    return new_author


@app.put("/authors/{author_id}")
def update_author(author_id: int, author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    item = db.query(models.Author).filter(models.Author.id == author_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Author not found")

    item.name = author.name
    db.commit()
    db.refresh(item)
    return item


@app.delete("/authors/{author_id}")
def delete_author(author_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Author).filter(models.Author.id == author_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Author not found")

    db.delete(item)
    db.commit()
    return {"message": "Author deleted"}


@app.get("/books")
def get_books(db: Session = Depends(get_db)):
    books = db.query(models.Book).order_by(models.Book.id).all()

    return [
        {
            "id": book.id,
            "title": book.title,
            "author_id": book.author_id,
            "author_name": book.author.name if book.author else None,
        }
        for book in books
    ]


@app.post("/books")
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    if not book.title.strip():
        raise HTTPException(status_code=400, detail="Please enter name")

    author = db.query(models.Author).filter(models.Author.id == book.author_id).first()

    if not author:
        raise HTTPException(status_code=400, detail="Please select author")

    new_book = models.Book(title=book.title, author_id=book.author_id)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


@app.put("/books/{book_id}")
def update_book(book_id: int, book: schemas.BookCreate, db: Session = Depends(get_db)):
    item = db.query(models.Book).filter(models.Book.id == book_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Book not found")

    item.title = book.title
    item.author_id = book.author_id
    db.commit()
    db.refresh(item)
    return item


@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Book).filter(models.Book.id == book_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(item)
    db.commit()
    return {"message": "Book deleted"}


@app.get("/reviews")
def get_reviews(db: Session = Depends(get_db)):
    reviews = db.query(models.Review).order_by(models.Review.id).all()

    return [
        {
            "id": review.id,
            "review": review.review,
            "book_id": review.book_id,
            "book_title": review.book.title if review.book else None,
            "author_name": review.book.author.name if review.book and review.book.author else None,
        }
        for review in reviews
    ]


@app.post("/reviews")
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    if not review.review.strip():
        raise HTTPException(status_code=400, detail="Please enter review")

    book = db.query(models.Book).filter(models.Book.id == review.book_id).first()

    if not book:
        raise HTTPException(status_code=400, detail="Please select book")

    new_review = models.Review(review=review.review, book_id=review.book_id)
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review


@app.put("/reviews/{review_id}")
def update_review(review_id: int, review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    item = db.query(models.Review).filter(models.Review.id == review_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Review not found")

    item.review = review.review
    item.book_id = review.book_id
    db.commit()
    db.refresh(item)
    return item


@app.delete("/reviews/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Review).filter(models.Review.id == review_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Review not found")

    db.delete(item)
    db.commit()
    return {"message": "Review deleted"}