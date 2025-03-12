import { AERO } from '../const'
import { KarabinerRules, Modifiers } from '../types'

const modifiers: Modifiers = {
  mandatory: ['right_command', 'right_control', 'right_shift', 'left_option'],
}

const V = {
  name: 'terminal-workflow',
  wezterm: 'wezterm',
  aerospace: 'alternate aerospace 1 2',
  neovide: 'neovide',
}

const IDEN = {
  WEZTERM: 'com.github.wez.wezterm',
  NEOVIDE: 'com.neovide.neovide',
  GHOSTTY: 'com.mitchellh.ghostty',
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
            bundle_identifiers: [IDEN.GHOSTTY],
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
            bundle_identifiers: [IDEN.WEZTERM],
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
            bundle_identifiers: [IDEN.NEOVIDE],
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
        //  alt tab
        type: 'basic',
        from: { key_code: 'quote', modifiers },
        to: [{ key_code: 'tab', modifiers: ['right_command'] }],
      },

      {
        type: 'basic',
        from: { key_code: 'f1', modifiers },
        to: [{ set_variable: { name: V.name, value: V.wezterm } }],
      },
      {
        type: 'basic',
        from: { key_code: 'f2', modifiers },
        to: [{ set_variable: { name: V.name, value: V.neovide } }],
      },
      {
        type: 'basic',
        from: { key_code: 'f3', modifiers },
        to: [{ set_variable: { name: V.name, value: V.aerospace } }],
      },
      // terminal
      //
      {
        type: 'basic',
        from: { key_code: 'semicolon', modifiers },
        to: [
          {
            shell_command:
              `[ "$(${AERO} list-workspaces --focused)" -eq 1 ] && ${AERO} workspace 2 || ${AERO} workspace 1`,
          },
        ],
        conditions: [{ type: 'variable_if', name: V.name, value: V.aerospace }],
      },
      {
        type: 'basic',
        from: { key_code: 'semicolon', modifiers },
        to: [{ shell_command: 'open -a wezterm' }],
        conditions: [
          { type: 'variable_if', name: V.name, value: V.wezterm },
          {
            type: 'frontmost_application_unless',
            bundle_identifiers: [IDEN.WEZTERM],
          },
        ],
      },
      {
        type: 'basic',
        from: { key_code: 'semicolon', modifiers },
        to: [{ shell_command: 'open -a Neovide' }],
        conditions: [
          { type: 'variable_if', name: V.name, value: V.neovide },
          {
            type: 'frontmost_application_unless',
            bundle_identifiers: [IDEN.NEOVIDE],
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
