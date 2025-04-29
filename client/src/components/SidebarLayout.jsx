// layouts/SidebarLayout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4 pr-5">
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;
