import { KarabinerRules, Modifiers } from '../types'
import { openKeyAlone } from '../utils'

const modifiers: Modifiers = {
  mandatory: ['right_command', 'right_control', 'right_shift', 'left_option'],
}

export const mainWorkflow: KarabinerRules[] = [
  {
    manipulators: [
      {
        type: 'basic',
        from: { key_code: 'left_command' },
        to: [{ key_code: 'left_control' }],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: ['com.neovide.neovide'],
          },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'left_command' },
        to: [{ key_code: 'left_control' }],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: ['com.github.wez.wezterm'],
          },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'left_command' },
        to: [{ key_code: 'left_control' }],
        conditions: [
          {
            type: 'frontmost_application_if',
            bundle_identifiers: ['net.kovidgoyal.kitty'],
          },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'quote', modifiers },
        to: [{ key_code: 'tab', modifiers: ['right_command'] }],
      },
      {
        type: 'basic',
        from: { key_code: 'f3', modifiers },
        to: [
          {
            set_variable: { name: 'fig-terminal-workflow', value: 'terminal' },
          },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'f4', modifiers },
        to: [
          { set_variable: { name: 'fig-terminal-workflow', value: 'figma' } },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'semicolon', modifiers },
        to: [{ shell_command: 'open -a WezTerm' }],
        conditions: [
          {
            type: 'variable_if',
            name: 'fig-terminal-workflow',
            value: 'terminal',
          },
          {
            type: 'frontmost_application_unless',
            bundle_identifiers: ['com.github.wez.wezterm'],
          },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'semicolon', modifiers },
        to: [{ shell_command: 'open -a Figma' }],
        conditions: [
          {
            type: 'variable_if',
            name: 'fig-terminal-workflow',
            value: 'figma',
          },
          {
            type: 'frontmost_application_unless',
            bundle_identifiers: ['com.figma.Desktop'],
          },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'semicolon', modifiers },
        to: [{ shell_command: 'open -a Arc' }],
      },

      // right shift
      {
        type: 'basic',
        from: { key_code: 'right_shift' },
        to: openKeyAlone("-a 'ChatGPT'"),
        conditions: [
          { type: 'variable_if', name: 'right_shift pressed', value: 1 },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'right_shift' },
        to: [
          { set_variable: { name: 'right_shift pressed', value: 1 } },
          { key_code: 'right_shift' },
        ],
        to_delayed_action: {
          to_if_invoked: [
            { set_variable: { name: 'right_shift pressed', value: 0 } },
          ],
          to_if_canceled: [
            { set_variable: { name: 'right_shift pressed', value: 0 } },
          ],
        },
      },

      // left shift
      {
        type: 'basic',
        from: { key_code: 'left_shift' },
        to: [
          { key_code: 'v', modifiers: ['left_option'] },
          { key_code: 'h', modifiers: ['left_option'] },
        ],
        conditions: [
          { type: 'variable_if', name: 'left_shift pressed', value: 1 },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'left_shift' },
        to: [
          { set_variable: { name: 'left_shift pressed', value: 1 } },
          { key_code: 'left_shift' },
        ],
        to_delayed_action: {
          to_if_invoked: [
            { set_variable: { name: 'left_shift pressed', value: 0 } },
          ],
          to_if_canceled: [
            { set_variable: { name: 'left_shift pressed', value: 0 } },
          ],
        },
      },
    ],
  },
]
