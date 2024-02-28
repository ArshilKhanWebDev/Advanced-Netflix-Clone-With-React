import React, { useState } from 'react'
import './GenreMovies.css'
import { useEffect } from 'react'
const apiKey = "1ab8b687ee2cc0ecc4f0a847f38fcdac";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"

const Card = ({ img }) => <img className="movie-img" src={img} alt="cover" />;

const GenreMovies = (props) => {

  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genreName, setGenreName] = useState("");
 
  useEffect(() => {
    const fetchGenre = async () => {
      try {
        // Fetch the list of genres
        const response = await fetch(`${url}/genre/movie/list?api_key=${apiKey}`);
        const data = await response.json();
        setCategories(data.genres);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      }
    };

    const fetchAndBuildMoviesfromGenreId = async () => {
      try {
        // Fetch movies based on the genre ID
        const response = await fetch(`${url}/discover/movie?api_key=${apiKey}&with_genres=${props.genreId}`);
        const data = await response.json();
        setMovies(data.results);

        const genre = categories.find(category => category.id === props.genreId);
        if (genre) {
          setGenreName(genre.name);
        }
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      }
    };

    fetchAndBuildMoviesfromGenreId();
    fetchGenre();
  }, [props.genreId, categories]);

  return (
    <>
      <div className='main'>
      <h1>{genreName}</h1>
        <div className="movies">
            {movies.map((item, index) => (
              <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
            ))}
            {/* <img src="https://image.tmdb.org/t/p/original//h27WHO2czaY5twDmV3Wfx5IdqoE.jpg" alt="" className="movie-img" /> */}
        </div>
      </div>
    </>
  )
}

export default GenreMovies
