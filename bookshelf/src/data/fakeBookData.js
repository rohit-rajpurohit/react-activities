import * as genresAPI from "./fakeGenreData";
const books = [
  {
    isbn: "9780593336823",
    title: "The Love Hypothesis",
    genre: { _id: "g2", name: "Romance" },
    author: "Ali Hazelwood",
    pages: 472,
    published: "2021-09-14",
    ratings: "4.4",
    liked: false,
  },
  {
    isbn: "9780670867950",
    title: "Treasure Island",
    genre: { _id: "g5", name: "Adventure" },
    author: "Robert Louis Stevenson",
    pages: 292,
    published: "1883-11-14",
    ratings: "3.8",
    liked: false,
  },
  {
    isbn: "9781774816035",
    title: "Alice in Wonderland",
    genre: { _id: "g1", name: "Fantasy" },
    author: "Lewis Carroll",
    pages: 112,
    published: "1865-11-26",
    ratings: "3.9",
    liked: false,
  },
  {
    isbn: "9781409193951",
    title: "Realm Breaker",
    genre: { _id: "g1", name: "Fantasy" },
    author: "Victoria Aveyard",
    pages: 576,
    published: "2021-06-04",
    ratings: "3.7",
    liked: false,
  },
  {
    isbn: "9780008229689",
    title: "The Phoenix",
    genre: { _id: "g3", name: "Thriller" },
    author: "Sydney Sheldon",
    pages: 400,
    published: "2021-07-15",
    ratings: "3.5",
    liked: false,
  },
  {
    isbn: "9781529087949",
    title: "The House in the Cerulean Sea",
    genre: { _id: "g1", name: "Fantasy" },
    author: "T.J. Klune",
    pages: 394,
    published: "2020-03-17",
    ratings: "4.5",
    liked: false,
  },
  {
    isbn: "9780141345659",
    title: "The Fault in Our Stars",
    genre: { _id: "g2", name: "Romance" },
    author: "John Green",
    pages: 313,
    published: "2012-01-10",
    ratings: "4.2",
    liked: false,
  },
  {
    isbn: "9781594633669",
    title: "The Girl on the Train",
    genre: { _id: "g3", name: "Thriller" },
    author: "Paula Hawkins",
    pages: 395,
    published: "2015-01-06",
    ratings: "3.9",
    liked: false,
  },
  {
    isbn: "9780385534635",
    title: "The Night Circus",
    genre: { _id: "g1", name: "Fantasy" },
    author: "Erin Morgenstern",
    pages: 387,
    published: "2011-09-13",
    ratings: "4.5",
    liked: false,
  },
  {
    isbn: "9780670813025",
    title: "It",
    genre: { _id: "g4", name: "Horror" },
    author: "Stephen King",
    pages: 1138,
    published: "1986-09-15",
    ratings: "4.1",
    liked: false,
  },
];

export function getBooks() {
  return books;
}

export function getBook(isbn) {
  return books.find((b) => b.isbn === isbn);
}

export function saveBook(book) {
  let bookData = books.find((b) => b.isbn === book.isbn) || {};
  bookData.title = book.title;
  bookData.genre = genresAPI.genres.find((g) => g._id === book.genreId);
  bookData.author = book.author;
  bookData.pages = book.pages;
  bookData.published = book.published;
  bookData.ratings = book.ratings;
  bookData.liked = false;

  if (!bookData.isbn) {
    bookData.isbn = Date.now().toString();
    books.push(bookData);
  }

  return bookData;
}

export function deleteBook(isbn) {
  let bookData = books.find((b) => b.isbn === isbn);
  books.splice(books.indexOf(bookData), 1);
  return bookData;
}
