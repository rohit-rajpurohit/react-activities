import React from "react";
import { getBooks } from "../data/fakeBookData";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends React.Component {
  state = {
    books: getBooks(),
    currentPage: 1,
    pageSize: 4,
  };

  handleDelete = (book) => {
    console.log(book);
    const books = this.state.books.filter((b) => b.isbn !== book.isbn);
    this.setState({ books });
  };

  handleLiked = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    this.setState({ books });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: mCount } = this.state.books;
    const { pageSize, currentPage, books: allBooks } = this.state;

    if (mCount === 0) return <p>There are no books in the shelf.</p>;

    const books = paginate(allBooks, currentPage, pageSize);

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
            {books.map((book) => (
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
        <Pagination
          itemsCount={mCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default Movies;
