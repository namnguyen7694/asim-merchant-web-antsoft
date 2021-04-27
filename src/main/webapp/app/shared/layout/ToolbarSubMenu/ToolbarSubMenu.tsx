import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  menuItem: { title: string; icon?: string; pathName?: string }[];
  header: { title: string; icon?: string };
  onChange: (idx) => void;
}
const ToolbarSubMenu: React.FC<Props> = (props) => {
  const history = useHistory();
  const pathname = history.location.pathname;
  const [activeMenu, setActiveMenu] = useState(0);

  useEffect(
    () => {
      const idx = props.menuItem.findIndex((item) => item.pathName === pathname);
      setActiveMenu(idx);
    },
    // eslint-disable-next-line
    [pathname]
  );
  return (
    <div className="listing-toolbar__menu">
      <div className="listing-toolbar__menu--header">
        <img src={props.header.icon} alt="menu" /> <span>{props.header.title}</span>
      </div>
      {props.menuItem.map((item, idx) => (
        <div
          key={idx}
          className={`listing-toolbar__menu--item ${activeMenu === idx && "selected"}`}
          onClick={() => {
            setActiveMenu(idx);
            props.onChange(idx);
            // history.push(item.pathName);
          }}
        >
          <img src={item.icon} alt={item.icon} /> <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ToolbarSubMenu;
