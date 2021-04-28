import React, { ReactText } from "react";
import { Select, Form } from "antd";

const { Option } = Select;

interface Props {
  className?: string;
  description?: string;
  options?: { value: string | number; label?: string }[];
  optionsApi?: any;
  multiple?: boolean;
  tags?: boolean;
  title: string;
  name: string | ReactText[];
  size?: "small" | "medium" | "large";
  defaultOptionsSelected?: string | number;
  placeholder?: string;
  rules?: any[];
  suffix?: string;
  showSearch?: boolean;
  disabled?: boolean;
  onChange?: (val) => void;
}

const CustomSelectItem: React.FC<Props> = (props) => {
  return (
    <>
      <div className="custom-form-item-title">{props.title}</div>
      <div className="custom-form-item-des">{props.description}</div>
      <Form.Item rules={props.rules ?? []} name={props.name}>
        <Select
          onChange={(val) => {
            !!props.onChange && props.onChange(val);
          }}
          showSearch={props.showSearch}
          optionFilterProp="children"
          mode={
            props.multiple && props.multiple === true
              ? "multiple"
              : props.tags && props.tags === true
              ? "tags"
              : undefined
          }
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          disabled={props.disabled}
          className={
            props.size && props.size === "small"
              ? "input__select-sm"
              : props.size && props.size === "large"
              ? "input__select-lg"
              : "input__select-md"
          }
          placeholder={props.placeholder}
          suffixIcon={
            <span>
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.99926 6L0.535156 0.75L7.46336 0.750001L3.99926 6Z" fill="#444C53" />
              </svg>
            </span>
          }
          defaultValue={props.defaultOptionsSelected}
        >
          {props.options.length &&
            props.options.map((opt, index) => (
              <Option
                key={index}
                className={
                  props.size && props.size === "small"
                    ? "input__select-option-sm"
                    : props.size && props.size === "large"
                    ? "input__select-option-lg"
                    : ""
                }
                value={opt.value}
              >
                {opt.label ?? opt.value}
              </Option>
            ))}
          {props.optionsApi}
        </Select>
      </Form.Item>
    </>
  );
};

export default CustomSelectItem;
