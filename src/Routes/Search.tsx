import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Isearchmovie, Searchmovie } from "../api";
import { makeImagePath } from "../utils";
const Wrapper = styled.div`
  padding-top: 100px;
  padding-left: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const SearchColumn = styled.div`
  padding-bottom: 10px;
`;
const Title = styled.div`
  font-size: 20px;
  color: red;
`;
const Poster = styled.div<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-position: center;
  background-size: cover;
  width: 80%;
  height: 300px;
  border-radius: 20px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<Isearchmovie>(["search", keyword], () =>
    Searchmovie(keyword)
  );
  return (
    <Wrapper>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <>
          {data?.results.map((movie) => (
            <SearchColumn>
              <Poster $bgPhoto={makeImagePath(movie.backdrop_path)}>
                <Title key={movie.id}>{movie.title}</Title>
              </Poster>
            </SearchColumn>
          ))}
        </>
      )}
    </Wrapper>
  );
}
export default Search;
