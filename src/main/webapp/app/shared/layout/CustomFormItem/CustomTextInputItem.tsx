import React, { ReactText } from "react";
import { Input, Form, InputNumber } from "antd";
import { Rule } from "antd/lib/form";

interface Props {
  className?: string;
  title: string;
  name: string | ReactText[];
  description?: string;
  size?: "small" | "medium" | "large";
  placeholder?: string;
  rules?: Rule[];
  allowClear?: boolean;
  suffix?: string;
  disabled?: boolean;
  type?: "text" | "number" | "text_area" | "password";
  onChangeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNumber?: (val: string | number | undefined) => void;
  formatter?: (val) => string;
  minHeight?: string;
  maxLength?: number;
}

const CustomTextInputItem: React.FC<Props> = (props) => {
  return (
    <>
      <div className="custom-form-item-title">{props.title}</div>
      <div className="custom-form-item-des">{props.description}</div>
      <Form.Item rules={props.rules ?? []} name={props.name}>
        {props.type === "text_area" ? (
          <Input.TextArea
            disabled={props.disabled}
            className={
              props.size && props.size === "small"
                ? "input__text-sm"
                : props.size && props.size === "large"
                ? "input__text-lg"
                : "input__text-md"
            }
            placeholder={props.placeholder}
            style={{ minHeight: props.minHeight }}
          />
        ) : props.type === "password" ? (
          <Input.Password
            disabled={props.disabled}
            placeholder={props.placeholder}
            className={
              props.size && props.size === "small"
                ? "input__text-sm"
                : props.size && props.size === "large"
                ? "input__text-lg"
                : "input__text-md"
            }
            maxLength={props.maxLength}
            onChange={props.onChangeInput}
          />
        ) : props.type === "number" ? (
          <InputNumber
            disabled={props.disabled}
            placeholder={props.placeholder}
            className={
              props.size && props.size === "small"
                ? "input__text-sm"
                : props.size && props.size === "large"
                ? "input__text-lg"
                : "input__text-md"
            }
            formatter={props.formatter}
            maxLength={props.maxLength}
            onChange={props.onChangeNumber}
          />
        ) : (
          <Input
            disabled={props.disabled}
            allowClear={props.allowClear ?? true}
            className={
              props.size && props.size === "small"
                ? "input__text-sm"
                : props.size && props.size === "large"
                ? "input__text-lg"
                : "input__text-md"
            }
            placeholder={props.placeholder}
            suffix={props.suffix}
            onChange={props.onChangeInput}
            onPressEnter={(event) => event.preventDefault()}
          />
        )}
      </Form.Item>
    </>
  );
};

export default CustomTextInputItem;
