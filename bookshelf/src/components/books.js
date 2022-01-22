import React from "react";
import { getBooks } from "../data/fakeBookData";
import { getGenres } from "../data/fakeGenreData";
import { paginate } from "../utils/paginate";
import BooksTable from "./booksTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./searchBox";
import _ from "lodash";

class Movies extends React.Component {
  state = {
    books: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    selectedGenre: null,
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

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      books: allBooks,
    } = this.state;

    //filtering data on the basis of selectedGenre or serachQuery,if nothing selected all the items are stored
    //selectedGenre._id condition because genres in state contain "All Genres" with empty id string
    let filtered = allBooks;
    if (searchQuery)
      filtered = allBooks.filter((b) =>
        b.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allBooks.filter((b) => b.genre._id === selectedGenre._id);

    //sorting filtered list on the basis of columns
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    //passing filtered data to paginate to paginate the filtered data
    const books = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: books };
  };

  render() {
    const { length: bCount } = this.state.books;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (bCount === 0) return <p>There are no books in the shelf.</p>;

    const { totalCount, data } = this.getPageData();

    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-sm-2 m-2">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div className="col py-3">
              <p className="pt-2 border-top border-2 border-dark">
                Showing {totalCount} books in the shelf.
              </p>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <BooksTable
                books={data}
                sortColumn={sortColumn}
                onSort={this.handleSort}
                onDelete={this.handleDelete}
                onLike={this.handleLiked}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
