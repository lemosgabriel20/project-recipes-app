import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const [pageName, setPageName] = useState('');
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const page = pathname.substr(1);
    const title = page.charAt(0).toUpperCase() + page.slice(1);
    if (page.includes('-')) {
      const tempTitle = title.split('-');
      const firstWord = tempTitle[0];
      const secondWord = tempTitle[1];
      const newTitle = `${firstWord} ${secondWord.charAt(0)
        .toUpperCase() + secondWord.slice(1)}`;
      setPageName(newTitle);
    } else {
      setPageName(title);
    }
  }, [pathname]);

  return (
    <div>
      <img data-testid="profile-top-btn" src={ profileImg } alt="Profile" />
      { !pathname.includes('profile') && !pathname.includes('done-recipes')
        && !pathname.includes('favorite-recipes') ? (
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />) : null}
      <h1 data-testid="page-title">
        { pageName }
      </h1>
    </div>
  );
}
