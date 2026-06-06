# Prop Naming Conventions

Reuse these props before inventing new ones.

| Prop | Type | Use for |
|---|---|---|
| `variant` | string union | Visual style variant (`"center" \| "aside"`, `"body" \| "label"`) — never `type` or `mode` |
| `position` | string union | Spatial placement (`"top" \| "bottom" \| "left" \| "right"`) |
| `icon` | `ReactNode` | Icon slot |
| `iconPosition` | `"left" \| "right"` | Icon placement relative to label |
| `label` | `string` | Accessible text label on form elements |
| `options` | array | Option arrays (Select, CheckboxGroup, RadioGroup) |
| `children` | `ReactNode` | Primary renderable content |
| `content` | `string` | Secondary text slot where `children` is already the trigger (e.g. Tooltip) |
| `as` | `ElementType` | Polymorphic element override |

Never expose `className` on `@repo/ui` components — callers wrap in a native element for positioning.
