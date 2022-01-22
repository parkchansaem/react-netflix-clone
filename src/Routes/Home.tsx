import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovie, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;
const Loading = styled.span`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 25px;
  width: 50%;
`;

const Silder = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 30px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const rowVar = {
  hidden: { x: window.innerWidth - 10 },
  visible: { x: 0 },
  exit: { x: -window.innerWidth + 10 },
};
const offset = 6;

const boxVar = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -80,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};
const Info = styled(motion.div)`
  bottom: 0;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  width: 100%;
  position: absolute;
  opacity: 0;
  h4 {
    font-size: 18px;
    text-align: center;
  }
`;
const infoVar = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};
function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovie
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      ToggleLeaving();
      const totalMovie = data.results.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const ToggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[1].backdrop_path || "")}
          >
            <Title>{data?.results[1].original_title}</Title>
            <Overview>{data?.results[1].overview}</Overview>
          </Banner>
          <Silder>
            <AnimatePresence initial={false} onExitComplete={ToggleLeaving}>
              <Row
                variants={rowVar}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 2 }}
                exit="exit"
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      variants={boxVar}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      key={movie.Id}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVar}>
                        <h4>{movie.original_title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Silder>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
