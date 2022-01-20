import React from "react";

const BookForm = ({ match, history }) => {
  return (
    <div>
      <h1>BookForm-{match.params.isbn}</h1>
      <button className="btn btn-primary" onClick={() => history.push("/")}>
        Save
      </button>
    </div>
  );
};

export default BookForm;
