import React from "react";
import { Pagination } from "antd";

interface Props {
  pageNumber: number;
  total: number;
  pageSize: number;
  handleChangePage: (page_number) => void;
  onShowSizeChange: (current: number, size: number) => void;
  length: number;
}
const ListPagination: React.FC<Props> = (props) => {
  const startIndex = (props.pageNumber - 1) * props.pageSize + 1;
  const endIndex = (props.pageNumber - 1) * props.pageSize + props.length;
  return (
    <div className="d_flex sp_bw">
      <div style={{ color: "#AFAFAF" }}>{`${startIndex} - ${endIndex} trong ${props.total} mục`}</div>

      <Pagination
        showSizeChanger
        onShowSizeChange={props.onShowSizeChange}
        onChange={(page_number) => props.handleChangePage(page_number)}
        current={props.pageNumber}
        total={props.total}
        pageSize={props.pageSize ?? 0}
      />
    </div>
  );
};

export default ListPagination;
