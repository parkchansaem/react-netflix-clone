const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path: string;
  original_title: string;
  overview: string;
  poster_path: string;
  Id: number;
}

export interface IGetMoviesResult {
  dates: { maximum: number; minimum: number };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovie() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
