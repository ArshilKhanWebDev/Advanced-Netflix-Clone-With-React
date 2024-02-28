import React from 'react'
import '../../App.scss';
import logo from '../../logo.png'
import {Link} from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";


const Header = () => {
  return (
    <>
      <nav className="header">
        <img src={logo} alt="" />

        <div>
            <Link to="/tvshows">TV Shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/relatedadded">Related Added</Link>
            <Link to="/mylist">My List</Link>
        </div>
        <IoMdSearch />
      </nav>
    </>
  )
}

export default Header
