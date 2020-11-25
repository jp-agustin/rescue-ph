import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  flex: 0.2;
  padding: 4%;
`;

export const TextArea = styled.textarea`
  width: 100%;
  flex: 1;
  margin-bottom: 3%;
  padding: 4%;
  font-family; inherit;
  font-size: 0.95rem;
`;

export const DateTimeInput = styled.input`
  font-family; inherit;
  font-size: 0.95rem;
  padding: 1.25%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-left: 3%;
  height: 100%;
  border-radius: 2px;
  background-color: ${props => props.theme.PRIMARY};
  transition: 0.3s background-color;
  padding: 1% 3%;
  cursor: pointer;
  color: ${props => props.theme.WHITE};
  font-size: 0.9rem;

  &:hover,
  &:active {
    background-color: ${props => props.theme.PRIMARY_DARK};
  }
`;
