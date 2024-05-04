'use client';

import { Menu } from '../Menu';
import { useState } from 'react';

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="bg-white p-4 shadow-md">
      <nav className="container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="flex-1 text-lg font-bold sm:text-xl">
          Secure Real-Time Dashboard
        </h1>
        <button
          className="text-xl leading-none sm:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          &#9776;
        </button>
        <div
          className={`${isNavOpen ? 'block' : 'hidden'} w-full sm:block sm:w-auto`}
        >
          <Menu onLinkClick={() => setIsNavOpen(false)} />
        </div>
      </nav>
    </header>
  );
};
