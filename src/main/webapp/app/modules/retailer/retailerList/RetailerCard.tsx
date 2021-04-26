import React from "react";
import { Card } from "antd";
// import { RetailerOutputModel } from "app/store/retailer/retailerTypes";
interface Props {
  // data: RetailerOutputModel;
  data: any;
  handleSelectItem: (id: string, type: "check" | "uncheck") => void;
  defaulSelect: boolean;
  index: number;
  handleUpdateItem: (item) => void;
}
const RetailerCard: React.FC<Props> = (props) => {
  const { data } = props;
  const merchant_profile = data.merchant_profile;

  const status = data.is_active ? "active" : "inactive";
  return (
    <Card className="custom-item-card">
      {/* <Checkbox
        onChange={(e) => {
          if (e.target.checked === true) {
            props.handleSelectItem(data.id.toString(), "check");
          } else {
            props.handleSelectItem(data.id.toString(), "uncheck");
          }
        }}
        style={{ width: "5rem" }}
        checked={props.defaulSelect}
      /> */}
      <div onClick={() => props.handleUpdateItem(data)}>
        <Card.Meta className="custom-item-card--info" title={props.index} />
        <Card.Meta className="custom-item-card--info w-25" title={merchant_profile.merchant_name} />
        <Card.Meta className="custom-item-card--info w-15" title={data.username} />
        <Card.Meta className="custom-item-card--info w-15" title={merchant_profile.represent_name} />
        <Card.Meta className="custom-item-card--info w-15" title={merchant_profile.represent_phone_number} />
        <Card.Meta className="custom-item-card--info" title={Number(data.user_wallet.balance).toLocaleString()} />
        <Card.Meta className={`custom-item-card--info retailer-card-status ${status}`} title={status} />
      </div>
    </Card>
  );
};

export default RetailerCard;
