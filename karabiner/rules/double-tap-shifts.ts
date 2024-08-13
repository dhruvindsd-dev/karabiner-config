import { Manipulator } from '../types'
import { openKeyAlone } from '../utils'

const V_NAME_RIGHT = 'right_shift_pressed'
const V_NAME_LEFT = 'left_shift_pressed'

export const DOUBLE_TAP_SHIFTS: Manipulator[] = [
  {
    type: 'basic',
    from: { key_code: 'right_shift', modifiers: { optional: ['any'] } },
    to: openKeyAlone("-a 'ChatGPT'"),
    conditions: [{ type: 'variable_if', name: V_NAME_RIGHT, value: 1 }],
  },
  {
    type: 'basic',
    from: { key_code: 'right_shift', modifiers: { optional: ['any'] } },
    to: [
      { set_variable: { name: V_NAME_RIGHT, value: 1 } },
      { key_code: 'right_shift' },
    ],
    to_delayed_action: {
      to_if_invoked: [{ set_variable: { name: V_NAME_RIGHT, value: 0 } }],
      to_if_canceled: [{ set_variable: { name: V_NAME_RIGHT, value: 0 } }],
    },
  },

  // left shift
  {
    type: 'basic',
    from: { key_code: 'left_shift', modifiers: { optional: ['any'] } },
    to: [
      { key_code: 'h', modifiers: ['left_option'] },
      { key_code: 'v', modifiers: ['left_option'] },
    ],
    conditions: [{ type: 'variable_if', name: V_NAME_LEFT, value: 1 }],
  },
  {
    type: 'basic',
    from: { key_code: 'left_shift', modifiers: { optional: ['any'] } },
    to: [
      { set_variable: { name: V_NAME_LEFT, value: 1 } },
      { key_code: 'left_shift' },
    ],
    to_delayed_action: {
      to_if_invoked: [{ set_variable: { name: V_NAME_LEFT, value: 0 } }],
      to_if_canceled: [{ set_variable: { name: V_NAME_LEFT, value: 0 } }],
    },
  },
]
