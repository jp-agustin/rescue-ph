import styled from "styled-components";

export const UpdatesContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  flex: 0.8;
  width: 100%;
  overflow-y: auto;

  & div:last-child {
    margin-top: auto;
  }

  & div:nth-child(odd) {
    background-color: ${props => props.theme.GRAY_2};
  }

  & div:not(:first-child) {
    margin-bottom: 2%;
  }
`;

export const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 4%;
`;

export const UpdateText = styled.p`
  width: 100%;
  color: ${props => props.theme.WHITE};
  font-size: 0.95rem;
  margin-bottom: 5%;
`;

export const Timestamp = styled.p`
  color: ${props => props.theme.PRIMARY};
  font-size: 0.8rem;
  font-style: italic;
  width: 100%;
  text-align: right;
`;
