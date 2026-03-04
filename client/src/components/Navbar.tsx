import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GiHealthNormal } from "react-icons/gi";

function Navbar() {
  return (
    <div className='flex flex-wrap justify-around shadow-sm space-y-5'>

        <div className='flex gap-5 items-center' >
            <GiHealthNormal size={40} />
            <span className='text-3xl'>MediTurnos</span>
        </div>

        <div className='flex gap-5 items-center'>
            <span>UserName</span>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    </div>
  )
}

export default Navbar
