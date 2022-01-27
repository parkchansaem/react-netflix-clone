import { json } from "stream/consumers";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path: string;
  title: string;
  overview: string;
  poster_path: string;
  id: number;
}

export interface IGetMoviesResult {
  dates: { maximum: number; minimum: number };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface Isearchmovie {
  page: number;
  results: IMovie[];
}

export function getMovie() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function Searchmovie(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}
