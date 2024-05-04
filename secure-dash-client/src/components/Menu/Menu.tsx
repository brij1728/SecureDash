'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface MenuProps {
  onLinkClick: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onLinkClick }) => {
  const pathName = usePathname();
  const links = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Dashboard ',
      href: '/dashboard',
    },
    {
      name: 'Login',
      href: '/login',
    },
    {
      name: 'Register',
      href: '/register',
    },
  ];

  return (
    <ul className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      {links.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className={`font-md rounded p-2 ${pathName === item.href ? 'bg-btn text-primary ' : 'text-secondary hover:text-btn '}`}
            onClick={onLinkClick}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
