import React from "react";
import { getBooks } from "../data/fakeBookData";
import Like from "./common/like";

class Movies extends React.Component {
  state = {
    books: getBooks(),
  };

  handleLiked = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    this.setState({ books });
  };

  handleDelete = (book) => {
    console.log(book);
    const books = this.state.books.filter((b) => b.isbn !== book.isbn);
    this.setState({ books });
  };

  render() {
    const { length: mCount } = this.state.books;

    if (mCount === 0) return <p>There are no books in the shelf.</p>;

    return (
      <>
        <p>Showing {mCount} books in the shelf.</p>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Author</th>
              <th>Pages</th>
              <th>Published</th>
              <th>Ratings</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book) => (
              <tr key={book.isbn}>
                <td>{book.title}</td>
                <td>{book.genre.name}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
                <td>{book.published}</td>
                <td>{book.ratings}</td>
                <td>
                  <Like
                    onClick={() => this.handleLiked(book)}
                    liked={book.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(book)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movies;
