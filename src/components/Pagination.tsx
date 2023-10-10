import React from "react";
import styles from "../styles/Pagination.module.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({ onChange }: any) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => onChange(event.selected + 1)}
      pageRangeDisplayed={10}
      pageCount={10}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
