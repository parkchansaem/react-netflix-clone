import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IGetMovieDetail } from "../api";
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
function SearchDetail() {
  const searchMatch = useMatch("/search/:moveieId");
  const { data, isLoading } = useQuery<IGetMovieDetail>(
    ["movie", "searchDetail"],
    () => getMovieDetail(searchMatch?.params.moveieId)
  );
  console.log(data?.id);
  return (
    <>
      {isLoading ? (
        <span>loading</span>
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
export default SearchDetail;
