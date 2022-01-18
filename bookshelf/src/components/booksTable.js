import React from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class BooksTable extends React.Component {
  //local property columns (not the part of state as this will not change throughout the lifecycle of this component)
  columns = [
    {
      path: "title",
      label: "Title",
      content: (book) => <Link to={`/books/${book.isbn}`}>{book.title}</Link>, //Link inplace of <a> to avoid reload of packages
    },
    { path: "genre.name", label: "Genre" },
    { path: "author", label: "Author" },
    { path: "pages", label: "Pages" },
    { path: "published", label: "Published" },
    { path: "ratings", label: "Ratings" },
    {
      key: "like",
      content: (book) => (
        <Like liked={book.liked} onClick={() => this.props.onLike(book)} />
      ),
    },
    {
      key: "delete",
      content: (book) => (
        <button
          onClick={() => this.props.onDelete(book)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    console.log(this.props);
    const { books, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={books}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BooksTable;
