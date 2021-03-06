import React from "react";
import propTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  console.log(currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  if (pages.length === 1 || pages.length === 0) return null;

  return (
    <nav>
      <ul className="pagination">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              onPageChange(currentPage === 1 ? currentPage : currentPage - 1)
            }
            className="page-link"
          >
            Previous
          </div>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => onPageChange(page)}
              className="page-link"
            >
              {page}
            </div>
          </li>
        ))}
        <li
          className={
            currentPage === pagesCount ? "page-item disabled" : "page-item"
          }
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              onPageChange(
                currentPage === pagesCount ? currentPage : currentPage + 1
              )
            }
            className="page-link"
          >
            Next
          </div>
        </li>
      </ul>
    </nav>
  );
};

//Typechecking on the props for a component to catch bugs
Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default Pagination;
