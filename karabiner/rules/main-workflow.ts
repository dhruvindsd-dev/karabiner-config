import { KarabinerRules, Modifiers } from '../types'

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
        to: [{ set_variable: { name: 'fig-terminal-workflow', value: 'terminal' } }],
      },
      {
        type: 'basic',
        from: { key_code: 'f4', modifiers },
        to: [{ set_variable: { name: 'fig-terminal-workflow', value: 'figma' } }],
      },
      {
        type: 'basic',
        from: { key_code: 'semicolon', modifiers },
        to: [{ shell_command: 'open -a WezTerm' }],
        conditions: [
          { type: 'variable_if', name: 'fig-terminal-workflow', value: 'terminal' },
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
          { type: 'variable_if', name: 'fig-terminal-workflow', value: 'figma' },
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
    ],
  },
]
