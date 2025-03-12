import fs from "fs";
import { DOUBLE_TAP_SHIFTS } from "./rules/double-tap-shifts";
import { mainWorkflow } from "./rules/main-workflow";
import { WINDOW_MANAGEMENT } from "./rules/z-layer-window-management";
import { KarabinerRules } from "./types";
import { L, app, createHyperSubLayers, open, openInNotion } from "./utils";
import { MOUSE_LAYER } from "./rules/mouse-layer";
import { AERO } from "./const";

const rules: KarabinerRules[] = [
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
          key_code: "semicolon",
          modifiers: { mandatory: ["command"] },
        },
        to: [{ key_code: "delete_or_backspace", modifiers: ["option"] }],
      },
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
      ...DOUBLE_TAP_SHIFTS,
    ],
  },
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        type: "basic",
        from: { key_code: "caps_lock" },
        to: [
          {
            key_code: "right_shift",
            modifiers: ["right_command", "right_control", "left_option"],
          },
        ],
        to_if_alone: [{ key_code: "escape" }],
      },
      {
        type: "basic",
        description: "Slash -> Hyper Key",
        from: { key_code: "slash" },
        to: [{ key_code: "right_shift", modifiers: ["right_command", "right_control", "left_option"] }],
        to_if_alone: [{ key_code: "slash" }],
      },
    ],
  },

  ...createHyperSubLayers({
    q: {
      to_if_alone: [{ shell_command: `${AERO} focus-monitor --wrap-around left` }],
    },
    o: {
      w: app("WezTerm"),
      a: app("Siri"),
      n: app("Notion"),
      c: app("Notion Calendar"),
      j: app("Day One"),
      b: app("Obsidian"),
      f: app("Finder"),
      d: app("Discord"),
      v: app("Visual Studio Code"),
      u: app("QuickTime Player"),
      r: app("Postman"),
      s: { to: [{ shell_command: `${AERO} workspace 5` }] },
      p: {
        to: [
          {
            shell_command: "shortcuts run 'Raycast Pomodoro' & open raycast://extensions/raycast/raycast-focus/toggle-focus-session &",
          },
        ],
      },
      x: { to: [{ shell_command: "open -a Arc 'https://x.com'" }] },
      g: { to: [{ shell_command: "open -a Arc 'https://chat.openai.com/'" }] },
      e: app("Endel"),
    },
    c: {
      p: { to: [{ key_code: "play_or_pause" }] },
      n: { to: [{ key_code: "fastforward" }] },
      b: { to: [{ key_code: "rewind" }] },
      // select word by word
      h: { to: [{ key_code: "left_arrow", modifiers: ["shift", "option"] }] },
      j: { to: [{ key_code: "down_arrow", modifiers: ["shift", "option"] }] },
      k: { to: [{ key_code: "up_arrow", modifiers: ["shift", "option"] }] },
      l: { to: [{ key_code: "right_arrow", modifiers: ["shift", "option"] }] },

      u: { to: [{ key_code: "a", modifiers: ["control", "shift"] }] },
      i: { to: [{ key_code: "e", modifiers: ["control", "shift"] }] },
    },
    p: {
      to_if_alone: [
        {
          shell_command: "open raycast://extensions/the-browser-company/arc/search",
        },
      ],

      r: openInNotion("https://www.notion.so/dhruvindev/Roast-13b3a1d6aae480c293dae84885a6be00?pvs=4"),

      n: openInNotion("https://www.notion.so/dhruvindev/Nexa-Event-644cb03b9e7046cd956c8896002285b2?pvs=4"),
      g: openInNotion("https://www.notion.so/14d5c3f91a9b4a6f99960055072124d8?v=925c20de3f1147c5a2bcea5642d67e08&pvs=4"),
      a: openInNotion("https://www.notion.so/dhruvindev/Andreas-49b9109d7d5e477a87037a3855c8072b?pvs=4"),
      s: openInNotion("https://www.notion.so/dhruvindev/salonflow-co-570f22e87e2c46d099e737d698b95fc5?pvs=4"),
      t: openInNotion("https://www.notion.so/dhruvindev/Tark-Ai-Saransh-f327b620200c42419c27666d88aea430?pvs=4"),
    },
    n: {
      to_if_alone: [{ key_code: "tab", modifiers: ["left_control"] }],
      c: openInNotion("https://www.notion.so/dhruvindev/Content-688a6a3e54dd4ac39c9960f648d721cb?pvs=4"),
      a: openInNotion("https://www.notion.so/dhruvindev/Cinematic-Stuff-7c19ddb7b10e497682387dd7053a38f2?pvs=4"),
      d: openInNotion("https://www.notion.so/dhruvindev/Daddy-design-Roadmap-1963a1d6aae480bb91d1ff688808805f?pvs=4"),
      t: {
        to: [
          {
            shell_command: "open -a Notion https://www.notion.so/dhruvindev/Dump-6cc9422876f54fea8423a68a19c44fcd?pvs=4",
          },
        ],
        to_if_held_down: [
          {
            shell_command: "open -a Notion  https://www.notion.so/dhruvindev/be409ff4cec8447582b44e60474ae9fa?v=2bced93677654555b8ac61732c476bde&pvs=4",
          },
        ],
      },
      i: openInNotion("https://www.notion.so/dhruvindev/bb12562214824880af81834942493a8b?v=32e5fa0051c5459caaf77067ca03a527&pvs=4"),
      e: openInNotion("https://www.notion.so/dhruvindev/Experiments-1053a1d6aae480e28d68f82f1fc5302f?pvs=4"),
      m: openInNotion("https://www.notion.so/dhruvindev/Marketing-125de4aa31ec45e3adf8c4e3089c5c39?pvs=4"),
      l: openInNotion("https://www.notion.so/dhruvindev/Lefoz-9633b03b99fd45b9a2496a98d84bb66c?pvs=4"),
      s: openInNotion("https://www.notion.so/dhruvindev/Jan-12c3a1d6aae4809e94c7c3b5910c1ba8?pvs=4"),

      r: openInNotion("https://www.notion.so/dhruvindev/Inspirations-13c3a1d6aae4803ca058e5e802d36df9?pvs=4"),
      o: openInNotion("https://www.notion.so/dhruvindev/Outreach-f24e60ed74e849eca509ffcda03f3fb7?pvs=4"),
      p: openInNotion("https://www.notion.so/dhruvindev/Punee-shit-to-do-s-31f2a4481d9f4cf5b6c67f289776ec63?pvs=4"),
    },
  }),
  ...WINDOW_MANAGEMENT,
  ...createHyperSubLayers({
    b: {
      to_if_alone: [{ key_code: "tab", modifiers: ["left_control", "shift"] }],
    }, // arc nav

    s: {
      u: { to: [{ key_code: "volume_increment" }] },
      j: { to: [{ key_code: "volume_decrement" }] },
      i: { to: [{ key_code: "display_brightness_increment" }] },
      k: { to: [{ key_code: "display_brightness_decrement" }] },
      n: { to: [{ key_code: "fastforward" }] },
      b: { to: [{ key_code: "rewind" }] },
      l: {
        to: [{ key_code: "q", modifiers: ["right_control", "right_command"] }],
      },
      p: { to: [{ key_code: "play_or_pause" }] },
    },
    v: {
      j: { to: [{ key_code: "down_arrow" }] },
      k: { to: [{ key_code: "up_arrow" }] },
      h: { to: [{ key_code: "left_arrow" }] },
      l: {
        to_if_alone: [{ key_code: "right_arrow" }],
        to_if_held_down: [{ key_code: "q", modifiers: ["right_control", "right_command"] }],
      },
    },

    // single keys
    h: L("left_arrow", ["option"]),
    l: L("right_arrow", ["option"]),
    j: L("down_arrow", []),
    k: L("up_arrow", []),
    u: L("a", ["control"]),
    i: L("e", ["control"]),
    w: {
      to_if_alone: [
        {
          shell_command: `${AERO} move-node-to-monitor next --wrap-around --focus-follows-window`,
        },
      ],
      to_if_held_down: [
        {
          shell_command: `${AERO} move-workspace-to-monitor next --wrap-around`,
        },
      ],
    },

    r: { to: [{ key_code: "spacebar", modifiers: ["right_command"] }] },
    g: app("Arc"),
    f: app("Figma"),
    t: open("raycast://extensions/reboot/hypersonic/index"),
    e: {
      to_if_held_down: [{ key_code: "f", modifiers: ["right_command", "right_shift"] }],
      to_if_alone: [{ key_code: "4", modifiers: ["right_command", "right_shift"] }],
    },
    close_bracket: { to_if_alone: [{ shell_command: `${AERO} workspace next` }] },
    open_bracket: { to_if_alone: [{ shell_command: `${AERO} workspace prev` }] },
  }),
  ...mainWorkflow,
  ...MOUSE_LAYER,
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: { show_in_menu_bar: false },
      machine_specific: {
        "krbn-47298e64-b2ea-4c11-9a49-4c06d5dcd712": {
          enable_multitouch_extension: true,
        },
      },
      profiles: [
        {
          name: "Default",
          simple_modifications: [
            {
              from: { apple_vendor_top_case_key_code: "keyboard_fn" },
              to: [{ key_code: "left_control" }],
            },
          ],
          complex_modifications: {
            rules,
          },
          virtual_hid_keyboard: { keyboard_type_v2: "ansi" },
        },
      ],
    },
    null,
    2
  )
);
