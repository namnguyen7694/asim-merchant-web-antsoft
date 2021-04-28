import { message } from "antd";

export const CustomNotiMessage = (
  type: "success" | "info" | "error" | "warning",
  content: React.ReactNode,
  duration = 4,
  style?: React.CSSProperties
) => {
  return message[type]({
    content,
    duration,
    style,
    className: "custom-noti-msg",
  });
};
