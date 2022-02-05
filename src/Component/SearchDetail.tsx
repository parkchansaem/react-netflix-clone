import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, getTvDetail, IGetMovieDetail } from "../api";
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
interface IType {
  type: string;
}
function SearchDetail({ type }: IType) {
  const searchMatch = useMatch("/search/:moveieId");
  const { data: movieDT, isLoading: MLoading } = useQuery<IGetMovieDetail>(
    ["movie", "searchmDetail"],
    () => getMovieDetail(searchMatch?.params.moveieId)
  );
  const { data: tvDT, isLoading: TLoaidng } = useQuery<IGetMovieDetail>(
    ["tv", "searchtDetail"],
    () => getTvDetail(searchMatch?.params.moveieId)
  );
  const data = type === "movie" ? movieDT : tvDT;
  const isLoading = MLoading || TLoaidng;
  console.log(type);
  return (
    <>
      {isLoading ? (
        <span>loading</span>
      ) : (
        <>
          <Bigimg
            $bgPhoto={
              data?.backdrop_path
                ? makeImagePath(data?.backdrop_path || "")
                : makeImagePath(data?.poster_path || "")
            }
          ></Bigimg>
          <Bigtitle>
            {data?.title}
            {data?.name}
          </Bigtitle>
          <span>{data?.overview}</span>
        </>
      )}
    </>
  );
}
export default SearchDetail;
