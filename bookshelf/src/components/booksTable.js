import React from "react";
import Like from "./common/like";
import TableHeader from "./tableHeader";

class BooksTable extends React.Component {
  //local property columns (not the part of state as this will not change throughout the lifecycle of this component)
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "author", label: "Author" },
    { path: "pages", label: "Pages" },
    { path: "published", label: "Published" },
    { path: "ratings", label: "Ratings" },
    { key: "like" },
    { key: "delete" },
  ];

  render() {
    const { books, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <table className="table table-dark table-striped">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
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
