// import React from "react";

// const BookForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>BookForm-{match.params.isbn}</h1>
//       <button className="btn btn-primary" onClick={() => history.push("/")}>
//         Save
//       </button>
//     </div>
//   );
// };

// export default BookForm;

import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBook, saveBook } from "../data/fakeBookData";
import { getGenres } from "../data/fakeGenreData";

class BookForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      author: "",
      pages: "",
      published: "",
      ratings: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    isbn: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    author: Joi.string().required().label("Author"),
    pages: Joi.number().required().min(0).label("Pages"),
    published: Joi.date().required().label("Published"),
    ratings: Joi.number().required().min(0).max(5).label("Ratings"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const bookIsbn = this.props.match.params.isbn;
    if (bookIsbn === "new") return;

    const book = getBook(bookIsbn);
    if (!book) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(book) });
  }

  mapToViewModel(book) {
    return {
      isbn: book.isbn,
      title: book.title,
      genreId: book.genre._id,
      author: book.author,
      pages: book.pages,
      published: book.published,
      ratings: book.ratings,
    };
  }

  doSubmit = () => {
    saveBook(this.state.data);

    this.props.history.push("/books");
  };

  render() {
    return (
      <div>
        <h1>Book Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("author", "Author")}
          {this.renderInput("pages", "Pages", "number")}
          {this.renderInput("published", "Published", "date")}
          {this.renderInput("ratings", "Ratings")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BookForm;
