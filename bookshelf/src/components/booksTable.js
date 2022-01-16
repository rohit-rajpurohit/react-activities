import React from "react";
import Like from "./common/like";

class BooksTable extends React.Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    //change sorting order if the path is same (descending sort if column already sorted in ascending order and vice versa)
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { books, onDelete, onLike } = this.props;
    return (
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("author")}>Author</th>
            <th onClick={() => this.raiseSort("pages")}>Pages</th>
            <th onClick={() => this.raiseSort("published")}>Published</th>
            <th onClick={() => this.raiseSort("ratings")}>Ratings</th>
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
                <Like onClick={() => onLike(book)} liked={book.liked} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(book)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default BooksTable;
