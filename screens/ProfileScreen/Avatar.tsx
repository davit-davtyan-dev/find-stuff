import React from 'react';
import {Image} from 'react-native';

interface AvatarProps {
  uri: string;
  /** 72 by default */
  size?: number;
}

const defaultSize = 72;

export default function Avatar(props: AvatarProps) {
  return (
    <Image
      source={{uri: props.uri}}
      width={defaultSize}
      height={defaultSize}
      borderRadius={defaultSize / 2}
    />
  );
}
