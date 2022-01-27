import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Title = styled.span`
  font-size: 200px;
`;
const Box = styled.div`
  background-color: white;
  height: 500px;
  width: 500px;
`;
function Tv() {
  return (
    <Box>
      <FontAwesomeIcon icon={faArrowRight} size="4x" />
    </Box>
  );
}

export default Tv;
