from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import Relationship
from database import Base

class Author(Base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)

    books = Relationship("Book", back_populates="author", cascade="all, delete")

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    author_id = Column(Integer, ForeignKey("authors.id"), nullable=False)
    author = Relationship("Author", back_populates="books")
    reviews = Relationship("Review", back_populates="book", cascade="all, delete")

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    review = Column(Text, nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    book = Relationship("Book", back_populates="reviews")