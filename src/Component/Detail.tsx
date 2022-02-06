import { useQuery } from "react-query";
import { useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetail,
  getPopularTv,
  getTvDetail,
  IGetMovieDetail,
  IGetMoviesResult,
  IGetTv,
  IgetTvDetail,
} from "../api";
import Home from "../Routes/Home";
import { makeImagePath } from "../utils";
const Loading = styled.span`
  width: 900px;
  height: 900px;
  background-color: ${(props) => props.theme.black.lighter};
`;
const Bigimg = styled.div<{ $bgPhoto: string }>`
  height: 300px;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.$bgPhoto});
  width: 100%;
`;
const Bigtitle = styled.h3`
  position: relative;
  top: -60px;
  padding-left: 20px;
  font-size: 32px;
  color: ${(props) => props.theme.white.lighter};
`;
function Detail() {
  const TvMatch = useMatch("/tv/:tvId");
  const movieMatch = useMatch("/movie/:moveieId");
  const HomeMatch = useMatch("/home/:moveieId");
  const MovieID = HomeMatch?.params.moveieId || movieMatch?.params.moveieId;

  const { data: movieDE, isLoading: MovieDL } = useQuery<IGetMovieDetail>(
    ["movie", "Detail"],
    () => getMovieDetail(MovieID)
  );
  const { data: tvDE, isLoading: TvDL } = useQuery<IgetTvDetail>(
    ["tv", "tvDetail"],
    () => getTvDetail(TvMatch?.params.tvId)
  );
  const isLoading = MovieDL || TvDL;
  return (
    <>
      {isLoading ? (
        <Loading>Loading!!</Loading>
      ) : (
        <>
          {MovieID ? (
            <>
              <Bigimg
                $bgPhoto={makeImagePath(movieDE?.backdrop_path || "")}
              ></Bigimg>
              <Bigtitle>{movieDE?.title}</Bigtitle>
              <span>{movieDE?.overview}</span>
            </>
          ) : null}
        </>
      )}
    </>
  );
}
export default Detail;
