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
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0.075;
  width: 100%;
  background-color: ${props => props.theme.GRAY_1};
  border-radius: 4px 4px 0 0;
  postion: relative;
`;

export const Title = styled.h4`
  color: ${props => props.theme.WHITE};
  text-transform: uppercase;
  font-weight: 500;
`;

export const CloseIconContainer = styled.div`
  position: absolute;
  right: 4%;
  color: ${props => props.theme.WHITE};
  cursor: pointer;
  transition: 0.3s color;

  &:hover {
    color: ${props => props.theme.PRIMARY};
  }
`;
