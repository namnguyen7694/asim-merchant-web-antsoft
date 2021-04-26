import React from "react";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface Props {
  useCheckAll?: boolean;
  resourceList?: any[];
  selectingItem?: any[];
  column: { name: string; width?: string; align?: "center" | "end" }[];
  handleCheckAll?: (e: CheckboxChangeEvent) => void;
}
const ListHeading: React.FC<Props> = (props) => {
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
        {props.column.map((col, idx) => (
          <div key={idx} style={{ width: col.width ?? "10%", textAlign: col.align ?? "start" }}>
            {col.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListHeading;
