import React from 'react';
import {View, type ViewProps} from '.';
import useColors from '../../hooks/useColors';

export const Divider = (props: ViewProps) => {
  const colors = useColors();
  return <View w="100%" h="1px" bgColor={colors.text} {...props} />;
};
