import React from 'react';
import {Text as RNText} from 'react-native';
import {clearUndefinedValues, formatCommonStyleProps} from './helpers';

import type {TextProps as RNTextProps, TextStyle} from 'react-native';
import type {TextStyleProps} from './types';

// TODO: implement fonts
// const fontConfig = {
//   normal: "Manrope-Regular",
//   bold: "Manrope-Bold",
//   100: "Manrope-ExtraLight",
//   200: "Manrope-ExtraLight",
//   300: "Manrope-Light",
//   400: "Manrope-Regular",
//   500: "Manrope-Medium",
//   600: "Manrope-Semibold",
//   700: "Manrope-Bold",
//   800: "Manrope-ExtraBold",
//   900: "Manrope-ExtraBold",
//   // ultralight: "Manrope-Regular", // TODO
//   // thin: "Manrope-Regular", // TODO
//   // light: "Manrope-Regular", // TODO
//   // medium: "Manrope-Regular", // TODO
//   // regular: "Manrope-Regular", // TODO
//   // semibold: "Manrope-Regular", // TODO
//   // condensedBold: "Manrope-Regular", // TODO
//   // condensed: "Manrope-Regular", // TODO
//   // heavy: "Manrope-Regular", // TODO
//   // black: "Manrope-Regular", // TODO
// };

export interface TextProps extends RNTextProps, TextStyleProps {}

export const Text = (props: TextProps) => {
  const {
    color = '#1f2937',
    fontSize = 14,
    fontStyle,
    fontVariant,
    fontWeight,
    textAlign,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecorationLine,
    style,
    ...restProps
  } = formatCommonStyleProps(props);

  return (
    <RNText
      style={[
        clearUndefinedValues({
          color,
          fontSize: Number(fontSize),
          fontStyle,
          // fontFamily: fontConfig[fontWeight || "normal"],
          fontVariant,
          fontWeight:
            fontWeight && (String(fontWeight) as TextStyle['fontWeight']),
          textAlign,
          lineHeight,
          letterSpacing,
          textTransform,
          textDecorationLine,
        }),
        ...(Array.isArray(style) ? style : [style]),
      ]}
      {...restProps}
    />
  );
};

export default Text;
