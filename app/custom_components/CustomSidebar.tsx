import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, UserIcon, SettingsIcon, LogOutIcon, CircleGaugeIcon, HandCoinsIcon } from "lucide-react";
import { SignOutButton } from './SignOutButton';
import { ModeToggle } from './ModeToggle';
import { Sign } from 'crypto';
import { validateRequest } from '../lib/auth';

interface CustomSidebarProps {
  isSidebarVisible: boolean;
  activePage: string;
  user: any;
}


const CustomSidebar: React.FC<CustomSidebarProps> = ({ isSidebarVisible, activePage, user }) => {


  const userId = user.userId;

  console.log("CustomSidebar user " + user)


  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    // { href: '/profile/' + userId, label: 'Profile', icon: UserIcon },
    { href: '/settings', label: 'Settings', icon: SettingsIcon },
    { href: '/leagues', label: 'Leagues', icon: CircleGaugeIcon },
    { href: '/bets', label: 'Bets', icon: HandCoinsIcon },
  ];

  return (
    <aside className={`w-64 bg-white dark:bg-neutral-950 shadow-lg transition-all duration-300 ${isSidebarVisible ? '' : '-ml-64'}`}>
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-center py-4">
            <h2 className="text-2xl font-bold text-sky-800 dark:text-indigo-300">FanBall</h2>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={`w-full justify-start ${
                  activePage === item.href ? 'bg-red-500 dark:bg-orange-900 text-green-800 dark:text-purple-400' : 'text-black dark:text-white hover:text-white hover:bg-sky-800 dark:hover:bg-sky-800'
                }`}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <SignOutButton />
            <div className="mt-3 text-black dark:text-white">
              <ModeToggle />
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default CustomSidebar;