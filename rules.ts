import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open, openInNotion } from "./utils";

const rules: KarabinerRules[] = [
  // {
  //   description: "additional keybinding",
  //   manipulators: [
  //     {
  //       type: "basic",
  //       from: { key_code: "l", modifiers: { mandatory: ["option"] } },
  //       to: [{ key_code: "k", modifiers: ["option"] }],
  //     },

  //     {
  //       type: "basic",
  //       from: { key_code: "h", modifiers: { mandatory: ["option"] } },
  //       to: [{ key_code: "j", modifiers: ["option"] }],
  //     },
  //   ],
  // },
  {
    description: "option + tab to command + tab",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
          modifiers: { mandatory: ["option"] },
        },
        to: [{ key_code: "delete_or_backspace", modifiers: ["command"] }],
      },
    ],
  },
  {
    description: "delete word",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
          modifiers: { mandatory: ["command"] },
        },
        to: [{ key_code: "delete_or_backspace", modifiers: ["option"] }],
      },
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
          modifiers: { mandatory: ["option"] },
        },
        to: [{ key_code: "delete_or_backspace", modifiers: ["command"] }],
      },
    ],
  },
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: { key_code: "caps_lock" },
        to: [
          {
            key_code: "right_shift",
            modifiers: ["right_command", "right_control", "left_option"],
          },
        ],
        to_if_alone: [{ key_code: "escape" }],
        type: "basic",
      },
      {
        type: "basic",
        description: "Slash -> Hyper Key",
        from: { key_code: "slash" },
        to: [
          {
            key_code: "right_shift",
            modifiers: ["right_command", "right_control", "left_option"],
          },
        ],
        to_if_alone: [{ key_code: "slash" }],
      },
    ],
  },
  ...createHyperSubLayers({
    p: {
      // projects management
      f: openInNotion(
        "https://www.notion.so/dhruvindev/Figbox-Development-f43bcfc3122147f4be53ac523c4939ec?pvs=4"
      ),
      a: openInNotion(
        "https://www.notion.so/dhruvindev/Andreas-49b9109d7d5e477a87037a3855c8072b?pvs=4"
      ),
      s: openInNotion(
        "https://www.notion.so/dhruvindev/salonflow-co-570f22e87e2c46d099e737d698b95fc5?pvs=4"
      ),
      t: openInNotion(
        "https://www.notion.so/dhruvindev/Tark-Ai-Saransh-f327b620200c42419c27666d88aea430?pvs=4"
      ),
    },
    n: {
      // d: dashboard
      // t : thoughts (dump \ trash)

      // q = Calendar
      // w = weekly content
      // e = clicks
      d: open(
        "-a Notion https://www.notion.so/dhruvindev/Dashboard-2e6c31ce421a4bf89b4277b3c2c0d51a?pvs=4"
      ),
      t: open(
        "-a Notion https://www.notion.so/dhruvindev/Dump-6cc9422876f54fea8423a68a19c44fcd?pvs=4"
      ),
      q: open(
        "-a Notion https://www.notion.so/dhruvindev/3a639f64ba23470eb474469f43a9fece?v=b588f4ae923044cbb1c4f0f863537df4"
      ),
      w: open(
        "-a Notion https://www.notion.so/dhruvindev/3a639f64ba23470eb474469f43a9fece?v=c0ecbf788d7e4810a023d356ffe5d8d8"
      ),
      e: open(
        "-a Notion https://www.notion.so/dhruvindev/2a7a6c679ea8495696fb9850b5c6cced?v=499a0e4afb064d3abaa1ee3fef278b00&pvs=4"
      ),
      i: open(
        "-a Notion https://www.notion.so/dhruvindev/Instagram-Linkedin-a475a799f03c485287d3fcf722bd0555?pvs=4"
      ),

      s: openInNotion(
        "https://www.notion.so/dhruvindev/Strategic-Moves-ee72b6a83fa5417190b2abc0aeb0636d?pvs=4"
      ),
      m: openInNotion(
        "https://www.notion.so/dhruvindev/Marketing-125de4aa31ec45e3adf8c4e3089c5c39?pvs=4"
      ),

      l: openInNotion(
        "https://www.notion.so/dhruvindev/Lefoz-9633b03b99fd45b9a2496a98d84bb66c?pvs=4"
      ),
    },
    // o = "Open" applications
    o: {
      v: app("Visual Studio Code"),
      g: app("Arc"),
      a: app("Siri"),
      d: app("Discord"),
      t: app("iTerm"),
      s: app("Spotify"),
      p: app("Clock"),
      n: app("Notion"),
      f: app("Figma"),
      c: app("Google Chrome"),
      j: app("Day One"),
      k: open("https://tasksboard.com/app"),
      b: open("-a Obsidian"),
    },

    w: {
      e: {
        description: "Reevaluate layout",
        to: [{ key_code: "z", modifiers: ["option", "shift"] }],
      },
      j: {
        description: "Swap window in clockwise direction",
        to: [{ key_code: "j", modifiers: ["option", "shift", "control"] }],
      },
      k: {
        description: "Swap window in anti-clockwise direction",
        to: [{ key_code: "k", modifiers: ["option", "shift", "control"] }],
      },
      m: {
        description: "Swap focus window with main window",
        to: [
          {
            key_code: "return_or_enter",
            modifiers: ["option", "shift", "control"],
          },
        ],
      },
      r: {
        description: "restart amethyst",
        to: [
          {
            key_code: "a",
            modifiers: ["left_control", "right_command"],
          },
        ],
      },
    },
    // l = layo*u*t
    q: {
      n: {
        description: "Cycle layouts",
        to: [{ key_code: "spacebar", modifiers: ["option", "shift"] }],
      },
      f: {
        description: "Full screen layout",
        to: [{ key_code: "f", modifiers: ["option", "shift"] }],
      },
      t: {
        description: "Tall layout",
        to: [{ key_code: "t", modifiers: ["option", "shift"] }],
      },
      c: {
        description: "Two columns",
        to: [{ key_code: "c", modifiers: ["option", "shift"] }],
      },
      l: {
        description: "Expand main pane",
        to: [
          {
            key_code: "k",
            modifiers: ["option", "right_control", "right_command"],
          },
        ],
      },
      h: {
        description: "Expand main pane",
        to: [
          {
            key_code: "j",
            modifiers: ["option", "right_control", "right_command"],
          },
        ],
      },
    },
    // Desktop
    d: {
      h: {
        description: "Move to 1 screen",
        to: [
          {
            key_code: "1",
            modifiers: ["left_option", "right_command", "right_shift"],
          },
        ],
      },
      j: {
        description: "Move to ultrawide ",
        to: [
          {
            key_code: "2",
            modifiers: ["left_option", "right_command", "right_shift"],
          },
        ],
      },
      l: {
        description: "Move to ultrawide",
        to: [
          {
            key_code: "3",
            modifiers: ["left_option", "right_command", "right_shift"],
          },
        ],
      },
      b: {
        description: "Move to left desktop",
        to: [{ key_code: "h", modifiers: ["left_control", "left_option"] }],
      },
      n: {
        description: "Move to right desktop",
        to: [{ key_code: "l", modifiers: ["left_control", "left_option"] }],
      },
      c: open("raycast://extensions/raycast/raycast/confetti"),
    },
    // Focus
    f: {
      h: {
        description: "Screen 1",
        to: [
          {
            key_code: "1",
            modifiers: ["right_control", "right_command", "right_shift"],
          },
        ],
      },
      j: {
        description: "Focus Screen 2",
        to: [
          {
            key_code: "2",
            modifiers: ["right_control", "right_command", "right_shift"],
          },
        ],
      },
      l: {
        description: "3",
        to: [
          {
            key_code: "3",
            modifiers: ["right_control", "right_command", "right_shift"],
          },
        ],
      },
      m: {
        description: "Focus main window",
        to: [{ key_code: "m", modifiers: ["option", "shift"] }],
      },
    },
    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      i: {
        to: [{ key_code: "a", modifiers: ["control"] }],
      },
      o: {
        to: [{ key_code: "e", modifiers: ["control"] }],
      },
    },
    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },

      // move by word
      h: {
        to: [{ key_code: "left_arrow", modifiers: ["option"] }],
      },
      j: {
        to: [{ key_code: "down_arrow", modifiers: ["option"] }],
      },
      k: {
        to: [{ key_code: "up_arrow", modifiers: ["option"] }],
      },
      l: {
        to: [{ key_code: "right_arrow", modifiers: ["option"] }],
      },
    },
    x: {
      // move by word
      h: {
        to: [{ key_code: "left_arrow", modifiers: ["shift", "option"] }],
      },
      j: {
        to: [{ key_code: "down_arrow", modifiers: ["shift", "option"] }],
      },
      k: {
        to: [{ key_code: "up_arrow", modifiers: ["shift", "option"] }],
      },
      l: {
        to: [{ key_code: "right_arrow", modifiers: ["shift", "option"] }],
      },
    },

    // single keys
    semicolon: {
      description: "Full screen layout",
      to: [{ key_code: "f", modifiers: ["option", "shift"] }],
    },
    j: {
      to: [
        {
          key_code: "j",
          modifiers: ["command", "shift"],
        },
      ],
    },
    k: {
      to: [{ key_code: "f", modifiers: ["option", "command"] }],
    },
    m: {
      to: [{ key_code: "up_arrow", modifiers: ["left_control"] }],
    },
    e: {
      to: [{ key_code: "h", modifiers: ["right_command", "option"] }],
    },
    h: {
      to: [{ key_code: "h", modifiers: ["right_command", "shift"] }],
    },
    l: {
      to: [{ key_code: "l", modifiers: ["right_command", "shift"] }],
    },
    r: {
      to: [{ key_code: "r", modifiers: ["left_option"] }],
    },
    a: { to: [{ key_code: "tab", modifiers: ["right_command"] }] },
    g: { to: [{ key_code: "g", modifiers: ["command", "option"] }] },
    1: { to: [{ key_code: "1", modifiers: ["left_option"] }] },
    2: { to: [{ key_code: "2", modifiers: ["left_option"] }] },
    3: { to: [{ key_code: "3", modifiers: ["left_option"] }] },
    t: app("Stickies"),
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          simple_modifications: [
            {
              from: {
                apple_vendor_top_case_key_code: "keyboard_fn",
              },
              to: [
                {
                  key_code: "left_control",
                },
              ],
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
);
