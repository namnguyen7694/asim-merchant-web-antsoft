import React from "react";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const CheckboxGroup = Checkbox.Group;

interface Props {
  title?: string;
  defaultCheckedList: string[];
  plainOptions: string[];
  handleChange: (val: string[] | undefined) => void;
}
const CustomCheckboxGroup: React.FC<Props> = (props) => {
  const { defaultCheckedList, plainOptions } = props;
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(
    defaultCheckedList.length > 0 && defaultCheckedList.length !== plainOptions.length
  );
  const [checkAll, setCheckAll] = React.useState(defaultCheckedList.length === plainOptions.length);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    props.handleChange(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    props.handleChange(e.target.checked ? undefined : []);
  };

  return (
    <div className="filter-checkbox">
      <div>{props.title}</div>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Tất cả
      </Checkbox>
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </div>
  );
};

export default CustomCheckboxGroup;
