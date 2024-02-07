/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Checkbox, Divider } from "antd";
import TreeSelectComponent from "./../TreeSelectComponent/TreeSelectComponent";
import { useState } from "react";

const Sidebar = ({ SidebarData, zoneData }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <div className="closedSidebarMenu">
        <MenuUnfoldOutlined
          style={{
            fontSize: "30px",
            color: "#222",
            backgroundColor: "#fff",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => setIsSideBarOpen((prev) => !prev)}
        />
      </div>

      <div className={isSideBarOpen ? "sidebar close" : "sidebar open"}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span></span>
            <MenuUnfoldOutlined
              onClick={() => setIsSideBarOpen((prev) => !prev)}
              style={{
                fontSize: "30px",
                color: "#222",
                backgroundColor: "#fff",
                padding: "10px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div>
          {SidebarData}
          <p className="headerSidebar">
            Search <br /> Ward , Zone and Circles
          </p>

          <TreeSelectComponent zoneData={zoneData} />
          <p className="headerSidebar">Platforms</p>
          <div style={{ display: "flex", gap: "0.5em", paddingTop: "1em" }}>
            <Checkbox defaultChecked disabled />
            Zomato
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
