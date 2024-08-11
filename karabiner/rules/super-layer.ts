import { Conditions, KarabinerRules } from '../types'

const conditions: Conditions[] = [
  { type: 'variable_if', name: 'super_duper_layer', value: 1 },
]
export const superLayer: KarabinerRules[] = [
  {
    description: 'Super Layer',
    manipulators: [
      {
        type: 'basic',
        from: { simultaneous: [{ key_code: 's' }, { key_code: 'd' }] },
        to: [{ set_variable: { value: 1, name: 'super_duper_layer' } }],
        to_after_key_up: [
          { set_variable: { value: 0, name: 'super_duper_layer' } },
        ],
        to_if_alone: [{ key_code: 's' }, { key_code: 'd' }],
      },
      {
        type: 'basic',
        from: { key_code: 'j' },
        to: [{ key_code: 'j', modifiers: ['command', 'shift'] }],
        conditions,
      },
      {
        type: 'basic',
        from: { key_code: 'k' },
        to: [{ key_code: 'f', modifiers: ['option', 'command'] }],
        conditions,
      },

      {
        type: 'basic',
        from: { key_code: 'f' },
        to: [
          {
            key_code: 'l',
            modifiers: ['command', 'shift'],
          },
        ],
        conditions,
      },

      {
        type: 'basic',
        from: { key_code: 'l' },
        to: [
          {
            key_code: 'equal_sign',
            modifiers: ['control', 'shift'],
          },
        ],
        conditions,
      },
    ],
  },
]
