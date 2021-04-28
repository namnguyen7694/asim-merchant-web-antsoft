import * as React from "react";

export interface Props {
  type: string;
  className?: string;
  createOption?: boolean;
}
// export interface State {}
class NullListing extends React.Component<Props> {
  render() {
    return (
      <div className="d_flex_col center" style={{ height: "80vh" }}>
        <div style={{ fontSize: "1.8rem", textAlign: "center", color: "#7A869A", marginTop: "2rem" }}>
          Chưa có mục nào trong danh sách {this.props.type}.
          {this.props.createOption && (
            <div style={{ fontSize: "1.8rem", textAlign: "center" }}>Bấm Tạo mới để thêm {this.props.type}.</div>
          )}
        </div>
      </div>
    );
  }
}
export default NullListing;
