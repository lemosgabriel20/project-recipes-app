import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileImg from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const [pageName, setPageName] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation();
  const history = useHistory();
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
      <button onClick={ () => history.push('/profile') }>
        <img
          data-testid="profile-top-btn"
          src={ profileImg }
          alt="Profile"
        />
      </button>
      { !pathname.includes('profile') && !pathname.includes('done-recipes')
        && !pathname.includes('favorite-recipes') ? (
          <button onClick={ () => setSearchActive(!searchActive) }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>) : null}
      { searchActive ? (
        <input data-testid="search-input" type="text" />
      ) : null}
      <h1 data-testid="page-title">
        { pageName }
      </h1>
    </div>
  );
}
