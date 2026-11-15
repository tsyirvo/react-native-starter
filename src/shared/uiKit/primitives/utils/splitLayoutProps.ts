import type { LayoutStyleProps } from '../types';

export const splitLayoutProps = <Props extends LayoutStyleProps>({
  align,
  gap,
  justify,
  m,
  mb,
  mt,
  mx,
  my,
  p,
  pb,
  pt,
  px,
  py,
  self,
  ...viewProps
}: Props) => ({
  layout: { align, gap, justify, m, mb, mt, mx, my, p, pb, pt, px, py, self },
  viewProps,
});
