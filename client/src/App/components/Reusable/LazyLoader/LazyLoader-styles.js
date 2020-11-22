import styled from "styled-components";

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: ${props => props.height};
  background-color: ${props => props.theme.GRAY_1};
  z-index: 10;
  margin: 0;
`;
