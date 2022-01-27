import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Isearchmovie, Searchmovie } from "../api";
import Detail from "../Component/Detail";
import SearchDetail from "../Component/SearchDetail";
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
  cursor: pointer;
  width: 80%;
  height: 300px;
  border-radius: 20px;
`;
const Bigmovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 1);
`;

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useViewportScroll();
  const movieMatch = useMatch(`/search/:movie`);
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery<Isearchmovie>(["search", keyword], () =>
    Searchmovie(keyword)
  );
  const onSearchClick = (movie: string) => {
    navigate(`/search/${movie}`);
  };
  const onOverlayclick = () => {
    navigate(-1);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <>
          {data?.results.map((movie) => (
            <SearchColumn>
              <Poster
                onClick={() => onSearchClick(movie.id + "")}
                $bgPhoto={makeImagePath(movie.backdrop_path)}
              >
                <Title key={movie.id}>{movie.title}</Title>
                <Detail />
              </Poster>
            </SearchColumn>
          ))}
          <AnimatePresence>
            {movieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayclick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <Bigmovie
                  layoutId={movieMatch.params.movie}
                  style={{ top: scrollY.get() + 100 }}
                >
                  <SearchDetail />
                </Bigmovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Search;
