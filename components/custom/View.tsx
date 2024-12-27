import React from 'react';
import {View as RNView} from 'react-native';
import {useThemeColor} from '../../hooks/useThemeColor';
import {formatCommonStyleProps} from './helpers';

import type {ViewProps as RNViewProps} from 'react-native';
import type {CommonStyleProps} from './types';

export interface ViewProps extends RNViewProps, CommonStyleProps {
  lightColor?: string;
  darkColor?: string;
}

export const View = ({lightColor, darkColor, ...props}: ViewProps) => {
  const bgColor = useThemeColor({light: lightColor, dark: darkColor});

  return <RNView {...formatCommonStyleProps({bgColor, ...props})} />;
};

export default View;
