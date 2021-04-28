import React, { useState } from "react";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

interface ISortColumn {
  fieldName: string;
  order: string;
}
interface Props {
  useCheckAll?: boolean;
  resourceList?: any[];
  selectingItem?: any[];
  column: { name: string; fieldName?: string; width?: string; align?: "center" | "end" }[];
  handleCheckAll?: (e: CheckboxChangeEvent) => void;
  // sortColumn?: ISortColumn;
  handleSortChange?: (e: ISortColumn) => void;
}
const ListHeading: React.FC<Props> = (props) => {
  const [sortColumn, setSortColumn] = useState<ISortColumn>();

  const handleSortChange = (fieldName) => {
    if (fieldName === sortColumn?.fieldName) {
      const order = sortColumn.order === "asc" ? "desc" : "asc";
      setSortColumn({ fieldName, order });
    } else {
      setSortColumn({ fieldName, order: "asc" });
    }
  };
  return (
    <div className="custom-list-heading">
      {props.useCheckAll && props.resourceList && props.selectingItem && (
        <Checkbox
          // onChange={(e) => props.handleCheckAll!(e)}
          style={{ width: "5rem" }}
          indeterminate={props.selectingItem?.length > 0 && props.selectingItem?.length !== props.resourceList?.length}
          checked={props.selectingItem?.length === props.resourceList?.length}
        />
      )}
      <div>
        {props.column.map((col, idx) => {
          const isSortASC = col.fieldName === sortColumn?.fieldName && sortColumn?.order === "asc";
          const isSortDESC = col.fieldName === sortColumn?.fieldName && sortColumn?.order === "desc";

          return (
            <div
              className="ant-table-column-sorters"
              key={idx}
              style={{ width: col.width ?? "10%", textAlign: col.align ?? "start" }}
            >
              <span className="col-name">{col.name}</span>
              <span className="ant-table-column-sorter-inner">
                <span
                  role="img"
                  aria-label="caret-up"
                  className={"anticon anticon-caret-up ant-table-column-sorter-up" + (isSortASC && "active")}
                >
                  <AiFillCaretUp></AiFillCaretUp>
                </span>
                <span
                  role="img"
                  aria-label="caret-down"
                  className={"anticon anticon-caret-down ant-table-column-sorter-down" + (isSortDESC && "active")}
                >
                  <AiFillCaretDown></AiFillCaretDown>
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListHeading;
