import React, { useEffect, useState } from 'react'
import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import GenreMovies from './Component/GenreMovies/GenreMovies';
const apiKey = "1ab8b687ee2cc0ecc4f0a847f38fcdac";
const url = "https://api.themoviedb.org/3";

function App() {
  
  const [genre, setGenre] = useState([]);

  useEffect(()=>{
    const getAllGenre = async () => {
      const reponse = await fetch(`${url}/genre/movie/list?api_key=${apiKey}`)
      const data = await reponse.json();
      setGenre(data.genres);
    };

    getAllGenre();
  }, [])

  return (
    <>
      <Router>
      <Header/>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tvshows' element={<Home/>}/>
        <Route path='/movies' element={<Home/>}/>
        <Route path='/relatedadded' element={<Home/>}/>
        <Route path='/mylist' element={<Home/>}/>
         {/* Dynamically generate routes for each genre */}
         {genre.map((item) => (
            <Route
              key={item.id}
              path={`/genre/${item.id}`}
              element={<GenreMovies genreId={item.id} />} // Pass genreId as a prop
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
