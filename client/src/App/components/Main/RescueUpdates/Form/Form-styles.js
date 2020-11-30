import styled, { css, keyframes } from "styled-components";

const shake = keyframes`
  0% { transform: translate(10px); }
  20% { transform: translate(-10px); }
  40% { transform: translate(5px); }
  60% { transform: translate(-5px); }
  80% { transform: translate(2px); }
  100% { origin-transform: translate(0px); }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  resize: none;

  ${props =>
    props.error &&
    css`
      border: 4px solid ${props.theme.DANGER};
      animation: ${shake} 0.4s 1 linear;
    `}
`;

export const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 2px;
  background-color: ${props => props.theme.PRIMARY};
  transition: 0.3s background-color;
  padding: 2% 3%;
  cursor: pointer;
  color: ${props => props.theme.WHITE};
  font-size: 0.9rem;

  &:hover,
  &:active {
    background-color: ${props => props.theme.PRIMARY_DARK};
  }
`;
