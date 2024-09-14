import { Conditions, KarabinerRules, KeyCode, Manipulator, To } from '../types'
import { L, createHyperSubLayers, openKeyAlone } from '../utils'

const mod0 = ['option']
const mod1 = ['option', 'shift']
const mod2 = ['left_control', 'shift']

const L_NAME = 'vim-motions'

const conditions: Conditions[] = [
  { type: 'variable_if', name: L_NAME, value: 1 },
]

const bind = (key_code: KeyCode, to: To[]): Manipulator => ({
  type: 'basic',
  from: { key_code },
  to,
  conditions,
})

export const WINDOW_MANAGEMENT: KarabinerRules[] = [
  ...createHyperSubLayers({
    f: {
      to_if_alone: openKeyAlone('-a Figma'),
      h: L('h', mod2),
      j: L('j', mod2, 'Swap anit-clockwise '),
      k: L('k', mod2, 'Swap anit-clockwise '),
      l: L('l', mod2, 'Expande main pane'),
    },
    e: {
      to_if_held_down: [
        { key_code: 'h', modifiers: ['right_command', 'option'] },
      ],
      to_if_alone: [
        { key_code: 'up_arrow', modifiers: ['right_command', 'option'] },
      ],
    },

    // single keys
    d: { to_if_alone: [{ key_code: 'r', modifiers: mod2 }] },
    m: { to_if_alone: [{ key_code: 'f', modifiers: mod2 }] },
    1: { to: [{ key_code: '1', modifiers: mod0 }] },
    2: { to: [{ key_code: '2', modifiers: mod0 }] },
    3: { to: [{ key_code: '3', modifiers: mod0 }] },
    4: { to: [{ key_code: '4', modifiers: mod0 }] },
    5: { to: [{ key_code: '5', modifiers: mod0 }] },
    6: { to: [{ key_code: '6', modifiers: mod0 }] },
  }),
  {
    description: 'Super Layer',
    manipulators: [
      {
        type: 'basic',
        from: { key_code: 'z' },
        to: [{ set_variable: { value: 1, name: L_NAME } }],
        to_after_key_up: [{ set_variable: { value: 0, name: L_NAME } }],
        to_if_alone: [{ key_code: 'z' }],
        parameters: {
          'basic.to_if_alone_timeout_milliseconds': 100,
          'basic.to_if_held_down_threshold_milliseconds': 100,
        },
      },

      bind('l', [{ key_code: 'l', modifiers: mod1 }]),
      bind('h', [{ key_code: 'h', modifiers: mod1 }]),
      bind('j', [{ key_code: 'j', modifiers: mod1 }]),
      bind('k', [{ key_code: 'k', modifiers: mod1 }]),
      bind('p', [{ key_code: 'slash', modifiers: mod0 }]),
      bind('o', [{ key_code: 'comma', modifiers: mod0 }]),
      bind('m', [{ key_code: 'f', modifiers: mod2 }]),
    ],
  },
]
