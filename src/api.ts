import { json } from "stream/consumers";

const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  backdrop_path: string;
  title: string;
  overview: string;
  poster_path: string;
  id: number;
  name: string;
  media_type: string;
}

export interface IGetMoviesResult {
  dates: { maximum: number; minimum: number };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetLatestMovie {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  poster_path: string;
}

export interface Isearchmovie {
  page: number;
  results: IMovie[];
}
export interface IGetMovieDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  name: string;
  runtime: number;
  number_of_seasons: number;
}
export interface IgetTvDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  name: string;
  runtime: number;
  number_of_seasons: number;
}
interface ITV {
  backdrop_path: string;
  name: string;
  overview: string;
  poster_path: string;
  id: number;
}
export interface IGetTv {
  page: number;
  results: ITV[];
}
export function getMovie() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
export function getMovieHome() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function Searchmovie(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}
export function Searchtv(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}

export function getUpMovie() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=2`
  ).then((responese) => responese.json());
}
export function getTopmovie() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=2`
  ).then((response) => response.json());
}

export function getMovieDetail(movieId?: string) {
  return fetch(`
  ${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`).then(
    (response) => response.json()
  );
}

export function getTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getPopularTv() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
export function getAiringtodayTv() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
export function getOntheAir() {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=2`
  ).then((response) => response.json());
}
export function getTvDetail(tvId?: string) {
  return fetch(`
  ${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=ko-KR`).then((response) =>
    response.json()
  );
}
