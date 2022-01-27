import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovie, IGetMoviesResult } from "../api";
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
function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovie
  );
  const [index, setIndex] = useState(0);
  return (
    <>
      {isLoading ? null : (
        <Wrapper>
          <Grid>
            {data?.results.slice(0, 9).map((movie) => (
              <Box $bgPhoto={makeImagePath(movie.backdrop_path)} key={movie.id}>
                {movie.title}
              </Box>
            ))}
          </Grid>
        </Wrapper>
      )}
    </>
  );
}

export default Home;
