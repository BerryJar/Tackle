"use client"

import React, { useState } from 'react';
import ShellComponent from '../custom_components/ShellComponent';

export default function ClientDashboard(props: { user: any }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userName = props.user

    const handleSideBarMinimizeChange = (isOpen: boolean) => {
        setIsSidebarOpen(!isOpen);
    }
    console.log("clientdashboard page.tsx user " + userName)

    return (
        <div>
            <ShellComponent user={userName} setIsSidebarOpen={handleSideBarMinimizeChange}></ShellComponent>
            
        </div>
    )
}