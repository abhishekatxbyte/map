import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { Divider } from "antd";
import TreeSelectComponent from './../TreeSelectComponent/TreeSelectComponent'
import { useState } from "react";


const Sidebar = ({ SidebarData }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    return (
        <>
            <div className="closedSidebarMenu">

                <MenuUnfoldOutlined style={{ fontSize: '30px', color: '#222', backgroundColor: '#fff', padding: '10px', cursor: 'pointer' }} onClick={() => setIsSideBarOpen(prev => !prev)} />
            </div>

            <div className={isSideBarOpen ? 'sidebar open' : 'sidebar close'}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p className="memu-title">Filer by tier</p>
                        <MenuUnfoldOutlined onClick={() => setIsSideBarOpen(prev => !prev)} style={{ fontSize: '30px', color: '#222', backgroundColor: '#fff', padding: '10px', cursor: 'pointer' }} />
                    </div>
                </div>
                <div>
                    {SidebarData}
                    <p className="memu-title">search ward , zone and circles</p>

                    <TreeSelectComponent />
                </div>
            </div>
        </>
    );
};
export default Sidebar