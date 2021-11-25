import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchMovieshandler = () => {
  //   fetch("https://swapi.dev/api/films/").then((response) => {
  //     return response.json();
  //   }).then((data)=>{
  //     const transformed = data.results.map((movieData) =>{

  //       return {
  //         id :movieData.episode_id,
  //         title:movieData.title,
  //         openingText:movieData.opening_crawl,
  //         releaseDate:movieData.release_date
  //       }

  //     })
  //     setMovies(transformed);
  //   });
  // };

  //using async await

  // async function fetchMoviesHanlder() {
  //   setIsLoading(true)
  //   const response = await fetch("https://swapi.dev/api/films/");
  //   const data = await response.json();

  //   const transformed = data.results.map((movieData) => {
  //     return {
  //       id: movieData.episode_id,
  //       title: movieData.title,
  //       openingText: movieData.opening_crawl,
  //       releaseData: movieData.release_date,
  //     };
  //   });
  //   setMovies(transformed);
  //   setIsLoading(false)
  // }

  //adding error try {} catch() {}

  // useEffect(()=>{
  //   fetchMovieshandler();
  // },[fetchMovieshandler]) // this goes to infinite loop, hence we using useCallback() hook below

  //   async function fetchMovieshandler() {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch("https://swapi.dev/api/films/");

  //       if (!response.ok) {
  //         throw new Error("Something went wrong!");
  //       }

  //       const data = await response.json();

  //       const transformed = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseData: movieData.release_date,
  //         };
  //       });
  //       setMovies(transformed);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     setIsLoading(false);
  //   }

  // const fetchMovieshandler = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch("https://swapi.dev/api/films/");

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }

  //     const data = await response.json();

  //     const transformed = data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseData: movieData.release_date,
  //       };
  //     });
  //     setMovies(transformed);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  // useEffect(() => {
  //   fetchMovieshandler();
  // }, [fetchMovieshandler]);

  //hear we working on realtime databse ( using firebase DataBase Link)

  const fetchMovieshandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://react-http-9da95-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformed = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date,
        };
      });
      setMovies(transformed);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieshandler();
  }, [fetchMovieshandler]);

  async function addMovieHandler (movie){
  const response = await fetch('https://react-http-9da95-default-rtdb.firebaseio.com/movies.json',{
     method :'POST',
     body :JSON.stringify(movie),
     headers:{
       'Content-Type':'application/json'
     }
   })
   const data = await response.json();
   console.log(data);
  }

  let content = <p>Found no Movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Laoding...</p>;
  }

  if (!isLoading) {
  }
  return (
    <React.Fragment>
      <section>

        <AddMovie onClick ={addMovieHandler} />
 
      </section>
      <section>
      <button onClick={fetchMovieshandler}>Fetch Movies</button>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies}  />}
        {!isLoading && movies.length === 0 && <p>Found no Movies</p>}
        {isLoading && <p>Laoding...</p>}
        {!isLoading && error && <p>{error}</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
