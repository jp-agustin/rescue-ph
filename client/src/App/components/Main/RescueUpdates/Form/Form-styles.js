import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  flex: 0.2;
  padding-top: 5%;
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
