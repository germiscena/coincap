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
      nextLabel={<span style={{ visibility: "hidden" }}>Previous</span>}
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageCount={pageCount}
      previousLabel={<span style={{ visibility: "hidden" }}>Previous</span>}
      renderOnZeroPageCount={null}
      previousLinkClassName={styles.previous}
      nextClassName={styles.next}
    />
  );
};

export default Pagination;
