import fs from 'fs'
import { AMETHYST } from './rules/amethyst'
import { mainWorkflow } from './rules/main-workflow'
import { superLayer } from './rules/super-layer'
import { KarabinerRules } from './types'
import {
    app,
    createHyperSubLayers,
    open,
    openInNotion,
    openKeyAlone,
} from './utils'

const rules: KarabinerRules[] = [
  {
    description: 'option + tab to command + tab',
    manipulators: [
      {
        type: 'basic',
        from: {
          key_code: 'delete_or_backspace',
          modifiers: { mandatory: ['option'] },
        },
        to: [{ key_code: 'delete_or_backspace', modifiers: ['command'] }],
      },
    ],
  },
  {
    description: 'delete word',
    manipulators: [
      {
        type: 'basic',
        from: {
          key_code: 'semicolon',
          modifiers: { mandatory: ['command'] },
        },
        to: [{ key_code: 'delete_or_backspace', modifiers: ['option'] }],
      },
      {
        type: 'basic',
        from: {
          key_code: 'delete_or_backspace',
          modifiers: { mandatory: ['command'] },
        },
        to: [{ key_code: 'delete_or_backspace', modifiers: ['option'] }],
      },
      {
        type: 'basic',
        from: {
          key_code: 'delete_or_backspace',
          modifiers: { mandatory: ['option'] },
        },
        to: [{ key_code: 'delete_or_backspace', modifiers: ['command'] }],
      },
    ],
  },
  {
    description: 'Hyper Key (⌃⌥⇧⌘)',
    manipulators: [
      {
        description: 'Caps Lock -> Hyper Key',
        type: 'basic',
        from: { key_code: 'caps_lock' },
        to: [
          {
            key_code: 'right_shift',
            modifiers: ['right_command', 'right_control', 'left_option'],
          },
        ],
        to_if_alone: [{ key_code: 'escape' }],
      },
      {
        type: 'basic',
        description: 'Slash -> Hyper Key',
        from: { key_code: 'slash' },
        to: [
          {
            key_code: 'right_shift',
            modifiers: ['right_command', 'right_control', 'left_option'],
          },
        ],
        to_if_alone: [{ key_code: 'slash' }],
      },
    ],
  },
  ...createHyperSubLayers({
    ...AMETHYST,
    //  Notion Projects
    p: {
      to_if_alone: [
        {
          shell_command:
            'open raycast://extensions/the-browser-company/arc/search',
        },
      ],
      n: openInNotion(
        'https://www.notion.so/dhruvindev/Nexa-Event-644cb03b9e7046cd956c8896002285b2?pvs=4'
      ),
      f: openInNotion(
        'https://www.notion.so/14d5c3f91a9b4a6f99960055072124d8?v=925c20de3f1147c5a2bcea5642d67e08&pvs=4'
      ),
      a: openInNotion(
        'https://www.notion.so/dhruvindev/Andreas-49b9109d7d5e477a87037a3855c8072b?pvs=4'
      ),
      s: openInNotion(
        'https://www.notion.so/dhruvindev/salonflow-co-570f22e87e2c46d099e737d698b95fc5?pvs=4'
      ),
      t: openInNotion(
        'https://www.notion.so/dhruvindev/Tark-Ai-Saransh-f327b620200c42419c27666d88aea430?pvs=4'
      ),
    },
    b: { to_if_alone: [{ key_code: 'h', modifiers: ['command', 'shift'] }] }, // arc nav
    n: {
      to_if_alone: [{ key_code: 'l', modifiers: ['command', 'shift'] }],

      c: openInNotion(
        'https://www.notion.so/dhruvindev/Content-688a6a3e54dd4ac39c9960f648d721cb?pvs=4'
      ),
      a: openInNotion(
        'https://www.notion.so/dhruvindev/Cinematic-Stuff-7c19ddb7b10e497682387dd7053a38f2?pvs=4'
      ),
      d: open(
        '-a Notion https://www.notion.so/dhruvindev/Dashboard-2e6c31ce421a4bf89b4277b3c2c0d51a?pvs=4'
      ),
      t: {
        to: [
          {
            shell_command:
              'open -a Notion https://www.notion.so/dhruvindev/Dump-6cc9422876f54fea8423a68a19c44fcd?pvs=4',
          },
        ],
        to_if_held_down: [
          {
            shell_command:
              'open -a Notion  https://www.notion.so/dhruvindev/be409ff4cec8447582b44e60474ae9fa?v=2bced93677654555b8ac61732c476bde&pvs=4',
          },
        ],
      },
      i: openInNotion(
        'https://www.notion.so/dhruvindev/bb12562214824880af81834942493a8b?v=32e5fa0051c5459caaf77067ca03a527&pvs=4'
      ),
      s: openInNotion(
        'https://www.notion.so/dhruvindev/Strategic-Moves-May-8f67a1acf7af40aeb172d338bf1c3711?pvs=4'
      ),
      m: openInNotion(
        'https://www.notion.so/dhruvindev/Marketing-125de4aa31ec45e3adf8c4e3089c5c39?pvs=4'
      ),
      l: openInNotion(
        'https://www.notion.so/dhruvindev/Lefoz-9633b03b99fd45b9a2496a98d84bb66c?pvs=4'
      ),
      w: openInNotion(
        'https://www.notion.so/dhruvindev/Week-2-9f6c88812c704995b1b070d4e761b334?pvs=4'
      ),
      r: openInNotion(
        'https://www.notion.so/dhruvindev/a3fca344012a48cea2fe1dc051d79a4c?v=57065292798c492aa95c5095d472b707&pvs=4'
      ),
      o: openInNotion(
        'https://www.notion.so/dhruvindev/Lead-magnets-and-Outreach-c2dbfdceaa3b4cf495578009371845d1?pvs=4'
      ),
      p: openInNotion(
        'https://www.notion.so/dhruvindev/Punee-shit-to-do-s-31f2a4481d9f4cf5b6c67f289776ec63?pvs=4'
      ),
    },
    o: {
      w: app('Whatsapp'),
      a: app('Siri'),
      s: app('Spotify'),
      n: app('Notion'),
      c: app('Google Chrome'),
      j: app('Day One'),
      b: app('Obsidian'),
      f: app('Finder'),
      d: app('Discord'),
      v: app('Visual Studio Code'),
      u: app('QuickTime Player'),
      r: app('Postman'),
      p: { to: [{ shell_command: "shortcuts run 'Raycast pomodoro' &" }] },
      //p: open('raycast://extensions/asubbotin/pomodoro/pomodoro-control-timer'),
      x: { to: [{ shell_command: "open -a Arc 'https://x.com'" }] },
      g: { to: [{ shell_command: "open -a Arc 'https://chat.openai.com/'" }] },
      e: app('Endel'),
      i: app('Messages'),
    },
    s: {
      to_if_alone: openKeyAlone('-a Screenshot'),
      u: {
        to: [
          {
            key_code: 'volume_increment',
          },
        ],
      },
      j: {
        to: [
          {
            key_code: 'volume_decrement',
          },
        ],
      },
      i: {
        to: [
          {
            key_code: 'display_brightness_increment',
          },
        ],
      },
      k: {
        to: [
          {
            key_code: 'display_brightness_decrement',
          },
        ],
      },
      l: {
        to: [
          {
            key_code: 'q',
            modifiers: ['right_control', 'right_command'],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: 'play_or_pause',
          },
        ],
      },
    },
    v: {
      j: {
        to: [{ key_code: 'down_arrow' }],
      },
      k: {
        to: [{ key_code: 'up_arrow' }],
      },
      h: {
        to: [{ key_code: 'left_arrow' }],
      },
      l: {
        to_if_alone: [{ key_code: 'right_arrow' }],
        to_if_held_down: [
          {
            key_code: 'q',
            modifiers: ['right_control', 'right_command'],
          },
        ],
      },
    },
    c: {
      to_if_alone: openKeyAlone("-a 'Notion Calendar'"),
      p: { to: [{ key_code: 'play_or_pause' }] },
      n: { to: [{ key_code: 'fastforward' }] },
      b: { to: [{ key_code: 'rewind' }] },
      // select word by word
      h: { to: [{ key_code: 'left_arrow', modifiers: ['shift', 'option'] }] },
      j: { to: [{ key_code: 'down_arrow', modifiers: ['shift', 'option'] }] },
      k: { to: [{ key_code: 'up_arrow', modifiers: ['shift', 'option'] }] },
      l: { to: [{ key_code: 'right_arrow', modifiers: ['shift', 'option'] }] },
      u: { to: [{ key_code: 'a', modifiers: ['left_control', 'shift'] }] },
      i: { to: [{ key_code: 'e', modifiers: ['left_control', 'shift'] }] },
    },

    // single keys
    l: { to_if_alone: [{ key_code: 'right_arrow', modifiers: ['option'] }] },
    h: { to_if_alone: [{ key_code: 'left_arrow', modifiers: ['option'] }] },
    j: { to_if_alone: [{ key_code: 'down_arrow' }] },
    k: { to_if_alone: [{ key_code: 'up_arrow' }] },
    u: { to_if_alone: [{ key_code: 'a', modifiers: ['control'] }] },
    i: { to_if_alone: [{ key_code: 'e', modifiers: ['control'] }] },

    1: { to: [{ key_code: '1', modifiers: ['left_option'] }] },
    2: { to: [{ key_code: '2', modifiers: ['left_option'] }] },
    3: { to: [{ key_code: '3', modifiers: ['left_option'] }] },

    r: app('Raycast'),
    g: app('Arc'),
    t: open('raycast://extensions/reboot/hypersonic/index'),
  }),
  ...superLayer,
  ...mainWorkflow,
]

fs.writeFileSync(
  'karabiner.json',
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: 'Default',
          simple_modifications: [
            {
              from: { apple_vendor_top_case_key_code: 'keyboard_fn' },
              to: [{ key_code: 'left_control' }],
            },
          ],
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
)
