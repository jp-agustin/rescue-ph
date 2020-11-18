import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import colors from '../../../../assets/res/colors';

import { LoaderContainer } from './LazyLoader-styles';

const LazyLoader = (prop) => {

  return (
    <LoaderContainer height={prop.height || '100vh'}>
      <Loader
        visible={true}
        color={colors.PRIMARY}
        type='TailSpin'
        height={'10rem'}
        width={'10rem'}
      />
    </LoaderContainer>
  );
}

export default LazyLoader;
