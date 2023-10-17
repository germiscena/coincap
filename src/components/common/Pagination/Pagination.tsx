import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import AppContext from "../../../context";
import React from "react";

const Pagination = () => {
  const { pageCount, setCurrentPage }: any = React.useContext(AppContext);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageCount={pageCount}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
