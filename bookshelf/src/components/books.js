import React from "react";
import { getBooks } from "../data/fakeBookData";
import { getGenres } from "../data/fakeGenreData";
import BooksTable from "./booksTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";

class Movies extends React.Component {
  state = {
    books: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    //adding new object 'All Genres' to show all the books and then pass this to genres in state
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: mCount } = this.state.books;
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      books: allBooks,
    } = this.state;

    if (mCount === 0) return <p>There are no books in the shelf.</p>;

    //filtering data on the basis on selectedGenre,if nothing selected all the items are stored
    //selectedGenre._id condition because genres in state contain "All Genres" with empty id string
    const filtered =
      selectedGenre && selectedGenre._id
        ? allBooks.filter((b) => b.genre._id === selectedGenre._id)
        : allBooks;

    //sorting filtered list on the basis of columns
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    //passing filtered data to paginate to paginate the filtered data
    const books = paginate(sorted, currentPage, pageSize);

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
            <BooksTable
              books={books}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
              onLike={this.handleLiked}
            />
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
