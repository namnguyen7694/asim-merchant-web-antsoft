import React, { ReactNode } from "react";

interface BtnProps {
  size?: "medium" | "small" | "large";
  type?: "primary" | "tertiary" | "secondary";
  item: ReactNode;
  shape?: "circle" | "oval" | "square";
  disabled?: boolean;
  shadow?: boolean;
  hover?: boolean;
  opacity?: boolean;
  style?: React.CSSProperties;
  className?: string;
  /* handlers */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}

const CustomButton = React.forwardRef((props: BtnProps, ref: any) => (
  <button
    disabled={props.disabled}
    type="button"
    ref={ref}
    onClick={props.onClick}
    onBlur={props.onBlur}
    style={{ ...props.style }}
    className={`btn btn--transparent btn--shiny ${props.hover ? `btn--hover` : ""} ${
      props.shadow ? `btn--shadow` : ""
    } ${props.type ? `btn--${props.type} btn--${props.type}-active` : ""}  ${
      props.shape ? `btn__${props.shape}` : ""
    } ${props.opacity ? `btn--opacity` : ""} ${props.disabled ? `btn--disabled` : ""} ${
      props.size ? `btn--${props.size}` : "btn--medium"
    } ${props.className}`}
  >
    {props.item}
  </button>
));

CustomButton.defaultProps = {
  className: "",
};

export default CustomButton;
