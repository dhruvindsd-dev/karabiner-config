import { L, open, openKeyAlone, subLayersType } from '../utils'

const mod1 = ['option', 'shift']
const mod2 = ['option', 'shift', 'right_command']

export const AMETHYST: subLayersType = {
  w: {
    j: L('j', mod2, 'Swap anit-clockwise '),
    k: L('k', mod2, 'Swap anit-clockwise '),
    l: L('l', mod2, 'Expande main pane'),
    h: L('h', mod2, 'Shink main pane'),
    r: L('a', mod2, 'Relaunch amethyst'),
    n: L('spacebar', mod1, 'Next layout'),
    t: L('t', mod2, 'Toggle float'),

    // - bsp - column - fullscreen - row
    b: L('b', mod1, 'BSP layout'),
    f: L('f', mod1, 'Full layout'),
    o: L('c', mod1, 'Two pane'),
  },
  d: {
    // toggle dev window position
    to_if_alone: [{ key_code: 'd', modifiers: ['option', 'shift'] }],
    j: L('q', mod2, 'Move to Screen 1'),
    l: L('w', mod2, 'Move to Screen 2'),
    // l: L('e', mod2, 'Move to Screen 3'),
    b: {
      description: 'Move to left desktop',
      to: [{ key_code: 'h', modifiers: ['left_control', 'left_option'] }],
    },
    n: {
      description: 'Move to right desktop',
      to: [{ key_code: 'l', modifiers: ['left_control', 'left_option'] }],
    },
    c: open('raycast://extensions/raycast/raycast/confetti'),
  },
  f: {
    to_if_alone: openKeyAlone('-a Figma'),
    j: L('q', mod1, 'Move to Screen 1'),
    l: L('w', mod1, 'Move to Screen 2'),
    // l: L('e', mod1, 'Move to Screen 3'),
  },
  q: {
    n: {
      description: 'Cycle layouts',
      to: [{ key_code: 'spacebar', modifiers: ['option', 'shift'] }],
    },
    f: {
      description: 'Full screen layout',
      to: [{ key_code: 'f', modifiers: ['option', 'shift'] }],
    },
    t: {
      description: 'Tall layout',
      to: [{ key_code: 't', modifiers: ['option', 'shift'] }],
    },
    c: {
      description: 'Two columns',
      to: [{ key_code: 'c', modifiers: ['option', 'shift'] }],
    },
    l: {
      description: 'Expand main pane',
      to: [
        {
          key_code: 'k',
          modifiers: ['option', 'right_control', 'right_command'],
        },
      ],
    },
    h: {
      description: 'Expand main pane',
      to: [
        {
          key_code: 'j',
          modifiers: ['option', 'right_control', 'right_command'],
        },
      ],
    },
  },
  m: {
    to_if_alone: [{ key_code: 'f', modifiers: ['option', 'shift'] }],
  },
  e: {
    to_if_held_down: [
      { key_code: 'h', modifiers: ['right_command', 'option'] },
    ],
    to_if_alone: [
      { key_code: 'up_arrow', modifiers: ['right_command', 'option'] },
    ],
  },

  // Layouts
}
