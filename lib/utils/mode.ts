export const MODES = {
  SLIDESHOW: 'slideshow',
  SPEAKER: 'speaker',
} as const

export type Mode = (typeof MODES)[keyof typeof MODES]

export default MODES
