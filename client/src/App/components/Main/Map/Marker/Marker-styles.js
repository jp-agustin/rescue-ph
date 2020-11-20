import styled from "styled-components";
import { Popup } from 'react-leaflet';

export const CustomPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${props => props.theme.GRAY_1};
    border-radius: 0;
    color: ${props => props.theme.WHITE};
    opacity: 0.9;
  }

  .leaflet-popup-content {
    width: 200px;
    height: auto;
    margin: 13px;
  }

  .leaflet-popup-tip-container {
    visibility: hidden;
  }
`;

export const Accent = styled.span`
  color: ${props => props.theme.PRIMARY};
`;
