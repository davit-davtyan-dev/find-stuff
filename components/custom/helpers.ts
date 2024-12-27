import type {StyleProp} from 'react-native';
import type {
  CommonStyleProps,
  DimensionValueWithPixel,
  DimensionPixelValue,
} from './types';

function isPixelValue(
  size: DimensionValueWithPixel | undefined,
): size is DimensionPixelValue {
  return typeof size === 'string' && size.endsWith('px');
}

function formatSize(size: DimensionValueWithPixel | undefined) {
  return typeof size === 'number'
    ? size * 4
    : isPixelValue(size)
    ? Number(size.replace('px', ''))
    : size;
}

export function clearUndefinedValues<T extends Record<string, any>>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function formatCommonStyleProps<
  T extends Record<string, any> = Record<string, any>,
>(props: CommonStyleProps & T & {style?: StyleProp<any>}): T {
  const {
    size,
    w = size,
    width = formatSize(w),
    h = size,
    height = formatSize(h),
    minW,
    minWidth = formatSize(minW),
    minH,
    minHeight = formatSize(minH),
    maxW,
    maxWidth = formatSize(maxW),
    maxH,
    maxHeight = formatSize(maxH),

    center,
    justifyContent = center ? 'center' : undefined,
    alignItems = center ? 'center' : undefined,
    alignSelf,
    alignContent,
    flexDir,
    flexDirection = flexDir,
    flex,
    flexWrap,
    flexShrink,
    flexGrow,
    flexBasis,
    gap,

    overflow,
    position,
    top,
    bottom,
    left,
    right,

    m,
    margin = formatSize(m),
    mb,
    marginBottom = formatSize(mb),
    mt,
    marginTop = formatSize(mt),
    ml,
    marginLeft = formatSize(ml),
    mr,
    marginRight = formatSize(mr),
    mx,
    marginHorizontal = formatSize(mx),
    my,
    marginVertical = formatSize(my),

    p,
    padding = formatSize(p),
    pb,
    paddingBottom = formatSize(pb),
    pt,
    paddingTop = formatSize(pt),
    pl,
    paddingLeft = formatSize(pl),
    pr,
    paddingRight = formatSize(pr),
    px,
    paddingHorizontal = formatSize(px),
    py,
    paddingVertical = formatSize(py),

    bgColor,
    backgroundColor = bgColor,
    opacity,
    borderRadius,
    borderColor,
    borderWidth,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderRightRadius,
    borderLeftRadius,
    borderTopRadius,
    borderTopLeftRadius = borderTopRadius || borderLeftRadius,
    borderTopRightRadius = borderTopRadius || borderRightRadius,
    borderBottomRadius,
    borderBottomLeftRadius = borderBottomRadius || borderLeftRadius,
    borderBottomRightRadius = borderBottomRadius || borderRightRadius,

    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation,
    ...restProps
  } = props;

  const style = {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,

    justifyContent,
    alignItems,
    alignSelf,
    alignContent,
    flexDirection,
    flex,
    flexWrap,
    flexShrink,
    flexGrow,
    flexBasis,
    gap,

    overflow,
    position,
    top,
    bottom,
    left,
    right,

    margin,
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,

    padding,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,

    backgroundColor,
    opacity,
    borderRadius,
    borderColor,
    borderWidth,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,

    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation,
  };

  return {
    ...restProps,
    style: [
      clearUndefinedValues(style),
      ...(Array.isArray(restProps.style) ? restProps.style : [restProps.style]),
    ],
  } as T;
}
