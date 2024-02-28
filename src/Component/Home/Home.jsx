import React, { useEffect, useState } from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "1ab8b687ee2cc0ecc4f0a847f38fcdac";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";


const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>

    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {

    const fetchUpcoming = async () => {
      const reponse = await fetch(`${url}/movie/${upcoming}?api_key=${apiKey}`)
      const data = await reponse.json();
      setUpcomingMovies(data.results)
    }

    const fetchNowPlaying = async () => {
      const reponse = await fetch(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
      const data = await reponse.json();
      setNowPlayingMovies(data.results)
    }

    const fetchPopular = async () => {
      const reponse = await fetch(`${url}/movie/${popular}?api_key=${apiKey}`)
      const data = await reponse.json();
      setPopularMovies(data.results)
    }

    const fetchTopRated = async () => {
      const reponse = await fetch(`${url}/movie/${topRated}?api_key=${apiKey}`)
      const data = await reponse.json();
      setTopRatedMovies(data.results)
    }

    const getAllGenre = async () => {
      const reponse = await fetch(`${url}/genre/movie/list?api_key=${apiKey}`)
      const data = await reponse.json();
      setGenre(data.genres);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    getAllGenre();

  }, [])

  return (
    <div>
      <section className='home'>
        <div
          className="banner"
          style={{
            backgroundImage: popularMovies[0]
              ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
              : "rgb(16, 16, 16)",
          }}
        >
          {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
          {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

          <div>
            <button><BiPlay /> Play  </button>
            <button>My List <AiOutlinePlus /> </button>
          </div>
        </div>

        <Row title={'Upcoming Movies'} arr={upcomingMovies} />
        <Row title={'Now Playing Movies'} arr={nowPlayingMovies} />
        <Row title={'Popular Movies'} arr={popularMovies} />
        <Row title={'Top Rated Movies'} arr={topRatedMovies} />

        <div className="genreBox">
          {genre.map((item) => (
            <Link key={item.id} to={`/genre/${item.id}`}>
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
