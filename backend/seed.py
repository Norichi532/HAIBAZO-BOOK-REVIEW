from database import SessionLocal, Base, engine
from models import Author, Book, Review

Base.metadata.create_all(bind=engine)

db = SessionLocal()

db.query(Review).delete()
db.query(Book).delete()
db.query(Author).delete()

db.commit()

authors = []

for name in [
    "J.K. Rowling","George R.R. Martin","J.R.R. Tolkien","Agatha Christie",
    "Stephen King","Jane Austen","Mark Twain","Ernest Hemingway","F. Scott Fitzgerald",
    "Charles Dickens","Leo Tolstoy","Fyodor Dostoevsky","Haruki Murakami","Gabriel Garcia Marquez","Isabel Allende"
]:
    author = Author(name=name)
    db.add(author)
    authors.append(author)

db.commit()

for author in authors:
    db.refresh(author)

books = []

for index, title in enumerate([
    "Harry Potter and the Sorcerer's Stone","A Game of Thrones","The Lord of the Rings",
    "Murder on the Orient Express","It","Pride and Prejudice","The Catcher in the Rye",
    "The Great Gatsby","The Great Gatsby","The Great Gatsby","The Great Gatsby",
    "The Great Gatsby","The Great Gatsby","The Great Gatsby","The Great Gatsby"
    ]):
    book = Book(title=title, author_id=authors[index].id)
    db.add(book)
    books.append(book)

db.commit()

for book in books:
    db.refresh(book)

for i in range(30):
    review = Review(review=f"This is review number {i + 1}.", book_id=books[i % len(books)].id)
    db.add(review)

db.commit()
db.close()

print("Seed data created successfully.")



