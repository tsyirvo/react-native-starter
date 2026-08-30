import infoCircle from './info-circle.xml';

/*
 * Android header items can only render image sources: SF Symbols and xcassets
 * are iOS only. Every symbol used in a native toolbar therefore needs an XML
 * vector drawable counterpart, bundled by Metro and tinted by Compose.
 */
export const drawables = {
  infoCircle,
} as const;

export type DrawableName = keyof typeof drawables;
