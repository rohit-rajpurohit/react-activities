import React from "react";
import { getBooks } from "../data/fakeBookData";
import { getGenres } from "../data/fakeGenreData";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends React.Component {
  state = {
    books: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    //adding new object 'All Genres' to show all the books and then pass this to genres in state
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ books: getBooks(), genres });
  }

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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: mCount } = this.state.books;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      books: allBooks,
    } = this.state;

    if (mCount === 0) return <p>There are no books in the shelf.</p>;

    //filtering data on the basis on selectedGenre,if nothing selected all the items are stored
    //selectedGenre._id condition because genres in state contain "All Genres" without id
    const filtered =
      selectedGenre && selectedGenre._id
        ? allBooks.filter((b) => b.genre._id === selectedGenre._id)
        : allBooks;

    //passing filtered data to paginate to paginate the filtered data
    const books = paginate(filtered, currentPage, pageSize);

    return (
      <>
        <div className="row">
          <div className="col-3 m-2">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p>Showing {filtered.length} books in the shelf.</p>
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
              itemsCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
