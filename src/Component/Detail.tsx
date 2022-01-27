import { useQuery } from "react-query";
import { useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IGetMovieDetail, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

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
  const movieMatch = useMatch("/movie/:moveieId");
  console.log(movieMatch?.params.moveieId);
  const { data, isLoading } = useQuery<IGetMovieDetail>(
    ["movie", "Detail"],
    () => getMovieDetail(movieMatch?.params.moveieId)
  );
  console.log(data);

  return (
    <>
      {isLoading ? (
        <div>Loding..</div>
      ) : (
        <>
          <Bigimg $bgPhoto={makeImagePath(data?.backdrop_path || "")}></Bigimg>
          <Bigtitle>{data?.title}</Bigtitle>
          <span>{data?.overview}</span>
        </>
      )}
    </>
  );
}
export default Detail;
