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
import { makeImagePath } from "../utils";
const Loading = styled.div`
  width: 100%;
  height: 100%;
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

  const { data: movieDE, isLoading: MovieDL } = useQuery<IGetMovieDetail>(
    ["movie", "Detail"],
    () => getMovieDetail(movieMatch?.params.moveieId)
  );
  const { data: tvDE, isLoading: TvDL } = useQuery<IgetTvDetail>(
    ["tv", "tvDetail"],
    () => getTvDetail(TvMatch?.params.tvId)
  );
  console.log(tvDE);
  const isLoading = MovieDL || TvDL;
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {movieMatch ? (
            <>
              <Bigimg
                $bgPhoto={makeImagePath(movieDE?.backdrop_path || "")}
              ></Bigimg>
              <Bigtitle>{movieDE?.title}</Bigtitle>
              <span>{movieDE?.overview}</span>
            </>
          ) : (
            <>
              <Bigimg
                $bgPhoto={makeImagePath(tvDE?.backdrop_path || "")}
              ></Bigimg>
              <Bigtitle>{tvDE?.name}</Bigtitle>
              <span>{tvDE?.overview}</span>
            </>
          )}
        </>
      )}
    </>
  );
}
export default Detail;
