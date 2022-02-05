import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import noPoster from "../Component/Noposter";
import {
  getAiringtodayTv,
  getMovie,
  getOntheAir,
  getPopularTv,
  getTv,
  getUpMovie,
  IGetMoviesResult,
  IGetTv,
} from "../api";
import Detail from "../Component/Detail";
import { makeImagePath } from "../utils";
const Wrapper = styled.div`
  background-color: black;
  overflow: hidden;
  padding-bottom: 350px;
`;
const Loading = styled.span`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.$bgPhoto});
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
const Category = styled.span`
  position: absolute;
  top: -30px;
  font-size: 18px;
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const UpComSlider = styled.div`
  position: relative;
  margin-top: 300px;
`;
const AiringSlider = styled.div`
  position: relative;
  margin-top: 700px;
`;
const OntheAirSlider = styled.div`
  position: relative;
  margin-top: 1100px;
`;
const NextBtn = styled.div`
  position: absolute;
  right: 0;
  top: 70px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 30px;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const rowVar = {
  hidden: { x: window.outerWidth - 10 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth + 10 },
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
  border-radius: 10px;
  h4 {
    font-size: 20px;
    text-align: center;
  }
`;
const infoVar = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};
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
function Tv() {
  const navigate = useNavigate();
  const bigmovieMatch = useMatch(`/tv/:tv`);
  const { data: toprateTv, isLoading: topLoading } = useQuery<IGetTv>(
    ["tvs", "toprate"],
    getTv
  );
  const { data: popularTv, isLoading: popLoading } = useQuery<IGetTv>(
    ["tvs,popular"],
    getPopularTv
  );
  const { data: airingTv, isLoading: airingLoading } = useQuery<IGetTv>(
    ["tvs", "airring"],
    getAiringtodayTv
  );
  const { data: ontheairTv, isLoading: onairLoading } = useQuery<IGetTv>(
    ["tvs", "ontheair"],
    getOntheAir
  );
  const { scrollY } = useViewportScroll();
  const [index, setIndex] = useState(0);
  const [upIndex, setUpIndex] = useState(0);
  const [airingIndex, setAiringIndex] = useState(0);
  const [onairIndex, setOnairIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (toprateTv) {
      if (leaving) return;
      ToggleLeaving();
      const totalMovie = toprateTv?.results.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const UpIncraseIndex = () => {
    if (popularTv) {
      if (leaving) return;
      ToggleLeaving();
      const totalMovie = popularTv.results.length - 1;
      const maxIndax = Math.floor(totalMovie / offset) - 1;
      setUpIndex((prev) => (prev === maxIndax ? 0 : prev + 1));
    }
  };
  const airringIncraseIndex = () => {
    if (airingTv) {
      if (leaving) return;
      ToggleLeaving();
      const totalMovie = airingTv.results.length - 1;
      const maxIndax = Math.floor(totalMovie / offset) - 1;
      setAiringIndex((prev) => (prev === maxIndax ? 0 : prev + 1));
    }
  };
  const OntheAirIncraseIndex = () => {
    if (ontheairTv) {
      if (leaving) return;
      ToggleLeaving();
      const totalMovie = ontheairTv.results.length - 1;
      const maxIndax = Math.floor(totalMovie / offset) - 1;
      setOnairIndex((prev) => (prev === maxIndax ? 0 : prev + 1));
    }
  };
  const ToggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxclicked = (movie: number) => {
    navigate(`/tv/${movie}`);
  };
  const onOverlayclick = () => navigate(-1);
  const isLoading = topLoading || popLoading || airingLoading || onairLoading;
  return (
    <Wrapper>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(toprateTv?.results[0].backdrop_path || "")}
          >
            <Title>{toprateTv?.results[0].name}</Title>
            <Overview>{toprateTv?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={ToggleLeaving}>
              <Row
                variants={rowVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                <Category>TopRate TV Series Pages({index + 1})</Category>
                {toprateTv?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      variants={boxVar}
                      initial="normal"
                      whileHover="hover"
                      key={movie.id}
                      onClick={() => onBoxclicked(movie.id)}
                      transition={{ type: "tween" }}
                      $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      layoutId={movie.id + ""}
                    >
                      <Info variants={infoVar}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={incraseIndex}>
              <FontAwesomeIcon icon={faArrowRight} size="3x" />
            </NextBtn>
          </Slider>
          <UpComSlider>
            <AnimatePresence initial={false} onExitComplete={ToggleLeaving}>
              <Row
                variants={rowVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={upIndex}
              >
                <Category>UpComing Movie Pages({upIndex + 1})</Category>
                {popularTv?.results

                  .slice(offset * upIndex, offset * upIndex + offset)
                  .map((movie) => (
                    <Box
                      variants={boxVar}
                      initial="normal"
                      whileHover="hover"
                      key={movie.id}
                      onClick={() => onBoxclicked(movie.id)}
                      transition={{ type: "tween" }}
                      $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      layoutId={movie.id + ""}
                    >
                      <Info variants={infoVar}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={UpIncraseIndex}>
              <FontAwesomeIcon icon={faArrowRight} size="3x" />
            </NextBtn>
          </UpComSlider>
          <AiringSlider>
            <AnimatePresence initial={false} onExitComplete={ToggleLeaving}>
              <Row
                variants={rowVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={airingIndex}
              >
                <Category>Airing Tv Pages({airingIndex + 1})</Category>
                {airingTv?.results

                  .slice(offset * airingIndex, offset * airingIndex + offset)
                  .map((movie) => (
                    <Box
                      variants={boxVar}
                      initial="normal"
                      whileHover="hover"
                      key={movie.id}
                      onClick={() => onBoxclicked(movie.id)}
                      transition={{ type: "tween" }}
                      $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      layoutId={movie.id + ""}
                    >
                      <Info variants={infoVar}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={airringIncraseIndex}>
              <FontAwesomeIcon icon={faArrowRight} size="3x" />
            </NextBtn>
          </AiringSlider>
          <OntheAirSlider>
            <AnimatePresence initial={false} onExitComplete={ToggleLeaving}>
              <Row
                variants={rowVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={onairIndex}
              >
                <Category>On the Air Tv Pages({onairIndex + 1})</Category>
                {ontheairTv?.results
                  .slice(offset * onairIndex, offset * onairIndex + offset)
                  .map((movie) => (
                    <Box
                      variants={boxVar}
                      initial="normal"
                      whileHover="hover"
                      key={movie.id}
                      onClick={() => onBoxclicked(movie.id)}
                      transition={{ type: "tween" }}
                      $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      layoutId={movie.id + ""}
                    >
                      <Info variants={infoVar}>
                        <h4>{movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={OntheAirIncraseIndex}>
              <FontAwesomeIcon icon={faArrowRight} size="3x" />
            </NextBtn>
          </OntheAirSlider>
          <AnimatePresence>
            {bigmovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayclick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <Bigmovie
                  layoutId={bigmovieMatch.params.tv}
                  style={{ top: scrollY.get() + 100 }}
                >
                  <Detail />
                </Bigmovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
