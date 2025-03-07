import { Conditions, KarabinerRules, KeyCode, Manipulator, To } from "../types";

const L_NAME = "tab-motions";

const conditions: Conditions[] = [
  { type: "variable_if", name: L_NAME, value: 1 },
  //{
  //  type: "variable_if",
  //  name: "multitouch_extension_finger_count_upper_half_area",
  //  value: 1,
  //},
];

const bind = (key_code: KeyCode, to: To[]): Manipulator => ({
  type: "basic",
  from: { key_code },
  to,
  conditions,
});

export const MOUSE_LAYER: KarabinerRules[] = [
  {
    description: "Mouse 3 layer",
    manipulators: [
      {
        conditions: [{ type: "device_if", identifiers: [{ product_id: 50495 }] }],
        type: "basic",
        from: { key_code: "grave_accent_and_tilde", modifiers: { optional: ["left_shift"] } },
        to: [{ set_variable: { value: 1, name: L_NAME } }],
        to_after_key_up: [{ set_variable: { value: 0, name: L_NAME } }],
        to_if_alone: [{ key_code: "keypad_enter" }],
        parameters: { "basic.to_if_alone_timeout_milliseconds": 200, "basic.to_if_held_down_threshold_milliseconds": 70 },
      },

      bind("q", [{ key_code: "up_arrow", modifiers: ["left_shift"] }]),
      bind("a", [{ key_code: "down_arrow", modifiers: ["left_shift"] }]),
      bind("w", [{ key_code: "up_arrow" }]),
      bind("s", [{ key_code: "down_arrow" }]),

      bind("r", [{ key_code: "o", modifiers: ["left_command", "left_shift"] }]), // outline mode
      bind("t", [{ key_code: "l", modifiers: ["left_command", "left_shift"] }]), // lock
      bind("d", [{ key_code: "k" }]), // scale
      bind("c", [{ key_code: "c", modifiers: ["left_command", "left_option"] }]),
      bind("v", [{ key_code: "v", modifiers: ["left_command", "left_option"] }]),
      bind("1", [{ key_code: "open_bracket" }]),
      bind("2", [{ key_code: "close_bracket" }]),
      bind("3", [{ key_code: "comma", modifiers: ["left_command", "left_option"] }]),
      bind("4", [{ key_code: "period", modifiers: ["left_command", "left_option"] }]),
      bind("f", [{ key_code: "f", modifiers: ["left_control", "shift"] }]),
      bind("m", [{ key_code: "m", modifiers: ["left_control", "left_command"] }]),
      bind("tab", [{ shell_command: "aerospace focus --boundaries-action wrap-around-the-workspace up" }]),

      {
        conditions: [{ type: "device_if", identifiers: [{ product_id: 50495 }] }],
        type: "basic",
        from: { key_code: "0" },
        to_if_alone: [{ key_code: "open_bracket", modifiers: ["right_command"] }],
        to_if_held_down: [{ key_code: "close_bracket", modifiers: ["right_command"] }],
        parameters: { "basic.to_if_alone_timeout_milliseconds": 200, "basic.to_if_held_down_threshold_milliseconds": 70 },
      },

      // raycast floating notes
      //bind('n', [
      //  {
      //    shell_command:
      //      'open raycast://extensions/raycast/floating-notes/toggle-floating-notes-focus',
      //  },
      //]),
    ],
  },
];
