import { KarabinerRules, KeyCode, Manipulator, To } from './types'

/**
 * Custom way to describe a command in a layer
 */
export interface LayerCommand {
  to?: To[]
  to_if_alone?: To[]
  to_if_held_down?: To[]
  description?: string
}

type HyperKeySublayer = {
  // The ? is necessary, otherwise we'd have to define something for _every_ key code
  [key_code in KeyCode]?: LayerCommand
}

/**
 * Create a Hyper Key sublayer, where every command is prefixed with a key
 * e.g. Hyper + O ("Open") is the "open applications" layer, I can press
 * e.g. Hyper + O + G ("Google Chrome") to open Chrome
 */
export function createHyperSubLayer(
  sublayer_key: KeyCode,
  commands: HyperKeySublayer,
  allSubLayerVariables: string[],
  to_if_alone?: To[],
  to_if_held_down?: To[]
): Manipulator[] {
  const subLayerVariableName = generateSubLayerVariableName(sublayer_key)

  return [
    // When Hyper + sublayer_key is pressed, set the variable to 1; on key_up, set it to 0 again
    {
      description: `Toggle Hyper sublayer ${sublayer_key}`,
      type: 'basic',
      from: {
        key_code: sublayer_key,
        modifiers: {
          mandatory: [
            'right_command',
            'right_control',
            'right_shift',
            'left_option',
          ],
        },
      },
      to_after_key_up: [
        {
          set_variable: {
            name: subLayerVariableName,
            // The default value of a variable is 0: https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/variable/
            // That means by using 0 and 1 we can filter for "0" in the conditions below and it'll work on startup
            value: 0,
          },
        },
      ],
      to: [
        {
          set_variable: {
            name: subLayerVariableName,
            value: 1,
          },
        },
      ],
      to_if_alone,
      to_if_held_down,
      parameters: {
        'basic.to_if_alone_timeout_milliseconds': 100,
        'basic.to_if_held_down_threshold_milliseconds': 100,
      },

      // This enables us to press other sublayer keys in the current sublayer
      // (e.g. Hyper + O > M even though Hyper + M is also a sublayer)
      // basically, only trigger a sublayer if no other sublayer is active
      conditions: allSubLayerVariables
        .filter((subLayerVariable) => subLayerVariable !== subLayerVariableName)
        .map((subLayerVariable) => ({
          type: 'variable_if',
          name: subLayerVariable,
          value: 0,
        })),
    },
    // Define the individual commands that are meant to trigger in the sublayer
    ...(Object.keys(commands) as (keyof typeof commands)[]).map(
      (command_key): Manipulator => ({
        ...commands[command_key],
        type: 'basic' as const,
        from: {
          key_code: command_key,
          modifiers: {
            // Mandatory modifiers are *not* added to the "to" event
            mandatory: ['any'],
          },
        },
        // Only trigger this command if the variable is 1 (i.e., if Hyper + sublayer is held)
        conditions: [
          {
            type: 'variable_if',
            name: subLayerVariableName,
            value: 1,
          },
        ],
      })
    ),
  ]
}

/**
 * Create all hyper sublayers. This needs to be a single function, as well need to
 * have all the hyper variable names in order to filter them and make sure only one
 * activates at a time
 */
export type subLayersType = {
  [key_code in KeyCode]?: HyperKeySublayer | LayerCommand
}
export function createHyperSubLayers(
  subLayers: subLayersType
): KarabinerRules[] {
  const allSubLayerVariables = (
    Object.keys(subLayers) as (keyof typeof subLayers)[]
  ).map((sublayer_key) => generateSubLayerVariableName(sublayer_key))

  return Object.entries(subLayers).map(([key, value]) => {
    if ('to' in value)
      return {
        description: `Hyper Key + ${key}`,
        manipulators: [
          {
            ...value,
            type: 'basic' as const,
            from: {
              key_code: key as KeyCode,
              modifiers: {
                // Mandatory modifiers are *not* added to the "to" event
                mandatory: [
                  'right_command',
                  'right_control',
                  'right_shift',
                  'left_option',
                ],
              },
            },
          },
        ],
      }
    else {
      const to_if_alone = value['to_if_alone']
      const to_if_held_down = value['to_if_held_down']

      delete value['to_if_alone']
      delete value['to_if_held_down']
      return {
        description: `Hyper Key sublayer "${key}"`,
        manipulators: createHyperSubLayer(
          key as KeyCode,
          value as HyperKeySublayer,
          allSubLayerVariables,
          to_if_alone,
          to_if_held_down
        ),
      }
    }
  })
}

function generateSubLayerVariableName(key: KeyCode) {
  return `hyper_sublayer_${key}`
}

/**
 * Shortcut for "open" shell command
 */
export function open(what: string): LayerCommand {
  return {
    to: [
      {
        shell_command: `open ${what}`,
      },
    ],
    description: `Open ${what}`,
  }
}

/**
 * Shortcut for "open" shell command for to_if_alone
 */
export function openKeyAlone(what: string): To[] {
  return [
    {
      shell_command: `open ${what}`,
    },
  ]
}

export function openInNotion(link: string): LayerCommand {
  return open(`${link.replace('https', 'notion')}`)
}
/**
 * Shortcut for "Open an app" command (of which there are a bunch)
 */
export function app(name: string): LayerCommand {
  return open(`-a '${name}.app'`)
}

export function L(
  key_code: KeyCode,
  modifiers: To['modifiers'],
  description?: string
): LayerCommand {
  return { description, to: [{ key_code, modifiers }] }
}
