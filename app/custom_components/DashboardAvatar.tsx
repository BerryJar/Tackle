import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const UserProfileDropdown = (props: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [displayName, setDisplayName] = useState('User')
  const [avatarUrl, setAvatarUrl] = useState('')
  const userId = props.userId;

  // We'll add more code here
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://avatars.githubusercontent.com/u/149718107?v=4" alt={displayName} />
          <AvatarFallback>{displayName[0]}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Edit Profile</h4>
          <div className="grid gap-2">
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={userId}
            />
            <Input
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="Avatar URL"
            />
            <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserProfileDropdown