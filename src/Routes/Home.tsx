import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovie, getMovieHome, IGetMoviesResult } from "../api";
import Detail from "../Component/Detail";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  div:first-child,
  div:nth-child(5),
  div:nth-child(7) {
    grid-column: span 2;
  }
`;
const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 200px;
  border-radius: 10px;
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-position: center center;
  background-size: cover;
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
  background-color: rgba(0, 0, 0, 0.8);
`;
function Home() {
  const { scrollY } = useViewportScroll();
  const navigate = useNavigate();
  const BigHomeMatch = useMatch(`/home/:Id`);
  console.log(BigHomeMatch);
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movie", "nowPlaying"],
    getMovieHome
  );
  const onClickHome = (movieId: string) => {
    navigate(`/home/${movieId}`);
  };
  const onOverlayclick = () => {
    navigate("/");
  };
  return (
    <>
      {isLoading ? null : (
        <Wrapper>
          <Grid>
            {data?.results.slice(1, 10).map((movie) => (
              <Box
                onClick={() => onClickHome(movie.id + "")}
                $bgPhoto={makeImagePath(movie.backdrop_path)}
                key={movie.id}
                layoutId={`${movie.id + ""}`}
              >
                {movie.title}
              </Box>
            ))}
          </Grid>
          <AnimatePresence>
            {BigHomeMatch ? (
              <>
                <Overlay
                  onClick={onOverlayclick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <Bigmovie
                  layoutId={`${BigHomeMatch.params.Id}`}
                  style={{ top: scrollY.get() + 100 }}
                >
                  <Detail />
                </Bigmovie>
              </>
            ) : null}
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
}

export default Home;
