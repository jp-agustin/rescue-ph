import styled from "styled-components";

export const RescueUpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: absolute;
  top: 2%;
  right: 1%;
  width: 25%;
  height: 80%;
  background-color: ${props => props.theme.GRAY_1}EE;
  border-radius: 4px;
  z-index: 1100;
  padding: 1%;
`;
