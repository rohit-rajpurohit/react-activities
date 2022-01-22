import React from "react";

class TableHeader extends React.Component {
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

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-up mx-2"></i>;
    return <i className="fa fa-sort-down mx-2"></i>;
  };

  render() {
    console.log(this.props);
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              style={{ cursor: "pointer" }}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              <div className="d-flex flex-row justify-content-start">
                {column.label} {this.renderSortIcon(column)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
