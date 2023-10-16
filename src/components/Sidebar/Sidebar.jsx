import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

import { Divider } from "antd";



export const Sidebar = ({ SidebarData }) => {
    return (
        <Menu>
            <p className="memu-title">Menu</p>
            <Divider />

            {SidebarData}
        </Menu>
    );
};
