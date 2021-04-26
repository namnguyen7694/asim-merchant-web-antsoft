import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

interface Props {
  title?: string;
  startDate?: string;
  endDate?: string;
  handleChangeDateRange: (val) => void;
}

const { RangePicker } = DatePicker;

const CustomRangePicker: React.FC<Props> = (props) => {
  const { startDate, endDate, title } = props;

  return (
    <div style={{ position: "relative" }}>
      {title && <div style={{ position: "absolute", top: "-22px", fontSize: "14px" }}>{title}</div>}
      <RangePicker
        className="custom_range_picker"
        onChange={(val: any) => props.handleChangeDateRange(val)}
        value={[startDate ? moment(startDate) : null, endDate ? moment(endDate) : null]}
        format={"MMM DD, YYYY"}
        suffixIcon={
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 2H3C1.89543 2 1 2.89543 1 4V16C1 17.1046 1.89543 18 3 18H17C18.1046 18 19 17.1046 19 16V4C19 2.89543 18.1046 2 17 2H6ZM6 2V0M6 2V4M14 0V2V4"
              stroke="#2D3742"
              strokeWidth="1.5"
            />
            <rect x="4.51245" y="9.44043" width="2.5" height="2.5" rx="1.25" fill="#2D3742" />
            <rect x="4.51245" y="12.8818" width="2.5" height="2.5" rx="1.25" fill="#2D3742" />
            <rect x="12.9849" y="5.99902" width="2.5" height="2.5" rx="1.25" fill="#2D3742" />
            <rect x="12.9849" y="9.44043" width="2.5" height="2.5" rx="1.25" fill="#2D3742" />
            <rect x="8.74854" y="5.99902" width="2.5" height="2.5" rx="1.25" fill="#2D3742" />
            <rect x="8.74854" y="9.44043" width="2.5" height="2.5" rx="1.25" fill="#2D3742" />
          </svg>
        }
        getPopupContainer={(node) => node}
      />
    </div>
  );
};

export default CustomRangePicker;
