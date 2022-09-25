import {
  Link
} from 'react-router-dom';

import { NavList } from '~/components';

export function Header() {
  return (
    <div className="w-full bg-black text-white">
      <div className="header flex flex-col gap-4 md:gap-8 p-4 py-8 md:px-8 lg:px-16 lg:py-16 max-w-screen-lg mx-auto">
        <h1 className="leading-none">
          <Link to="/">
            Ruin Press
          </Link>
        </h1>

        <NavList />
      </div>
    </div>
  )
};

