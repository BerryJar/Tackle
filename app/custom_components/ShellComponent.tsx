

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import topbarlogo from "@/assets/topbarlogo.svg"
import { signOut } from '../actions/auth.actions';
import { SignOutButton } from './SignOutButton';
import SleeperRoster from './SleeperRoster';
import SleeperLeagueDetails from './SleeperLeague';
import SleeperUserDetails from './SleeperUser';
import SleeperUserLeagues from './SleeperRoster';
import { ModeToggle } from './ModeToggle';
import CustomSidebar from './CustomSidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardAvatar from './DashboardAvatar';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { validateRequest } from '../lib/auth';


interface ShellComponentProps {
    setIsSidebarOpen: (value: boolean) => void;
    user: string
}


const ShellComponent = ({ setIsSidebarOpen, user }: ShellComponentProps) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isProfileDropVisible, setIsProfileDropVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        setIsSidebarOpen(!isSidebarVisible);
    };

    const toggleProfileDrop = () => {
        setIsProfileDropVisible(!isProfileDropVisible);
        return(
            <p>Test</p>
        )
    }

    

    return (
        <div className="flex h-screen">
            {/* Sidebar
            <aside className={`w-64 bg-white dark:bg-black p-4 transition-all duration-300 ${isSidebarVisible ? '' : '-ml-64'}`}>
                <nav className="space-y-2">
                    <Button variant="default" className="w-full justify-start bg-sky-800 dark:border-t dark:border-l dark:border-r dark:border-b dark:border-zinc-400 dark:bg-black text-white dark:text-white" asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="default" className="w-full justify-start bg-sky-800 dark:border-t dark:border-l dark:border-r dark:border-b dark:border-zinc-400 dark:bg-black dark:text-white text-white" asChild>
                        <Link href="/profile">Profile</Link>
                    </Button>
                    <Button variant="default" className="w-full justify-start bg-sky-800 dark:border-t dark:border-l dark:border-r dark:border-b dark:border-zinc-400 dark:bg-black dark:text-white text-white" asChild>
                        <Link href="/settings">Settings</Link>
                    </Button>
                    <SignOutButton></SignOutButton>
                    <ModeToggle></ModeToggle>
                </nav>
            </aside> */}
            <CustomSidebar isSidebarVisible={isSidebarVisible} user={user} activePage={''} />

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-white dark:bg-neutral-950 shadow-sm p-2 flex flex-row ">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    <Image src={topbarlogo} width={100} height={100} alt="Logo" className="p-2" />
                    <div className="flex ml-auto">
                        <p>Hello, {user}</p>
                        {/* <Avatar onClick={toggleProfileDrop}>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/149718107?v=4"></AvatarImage>
                            <AvatarFallback>FB</AvatarFallback>
                        </Avatar> */}
                        <DashboardAvatar userId={user}></DashboardAvatar>
                    </div>

                </header>

                {/* Page content */}
                <main className="flex-1 p-4 overflow-auto bg-slate-200 dark:bg-zinc-900">
                    <div className="items-center justify-center text-center h-full">
                        <ResizablePanelGroup direction='horizontal'>
                            <ResizablePanel>
                                <SleeperUserLeagues></SleeperUserLeagues>
                            </ResizablePanel>
                            <ResizableHandle />
                            <ResizablePanel>
                                <ResizablePanelGroup direction='vertical'>
                                    <ResizablePanel>
                                        <SleeperLeagueDetails></SleeperLeagueDetails>
                                    </ResizablePanel>
                                    <ResizableHandle />
                                    <ResizablePanel>
                                        <SleeperUserDetails></SleeperUserDetails>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </ResizablePanel>
                            <ResizableHandle />

                        </ResizablePanelGroup>

                        {/* <SleeperRoster></SleeperRoster>
                        <SleeperLeagueDetails></SleeperLeagueDetails>
                        <SleeperUserDetails></SleeperUserDetails> */}
                    </div>
                </main>

            </div>
        </div>
    );
};

export default ShellComponent;