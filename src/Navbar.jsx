import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {

  const [nav, setNav] = useState(false);


  const handleNav = () => {
    setNav(!nav);
  };


  const navItems = [


  ];

  return (
    <div className='bg-cyan-800  items-center  mx-auto px-4 text-white'>
      {/* Logo */}
      <h2 className='flex justify-center hover:text-white w-full p-3 text-3xl font-bold text-[rgb(85,255,201)]'>VELS UNIVERSITY</h2>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            {item.text}
          </li>
        ))}
      </ul>





    </div>
  );
};

export default Navbar;