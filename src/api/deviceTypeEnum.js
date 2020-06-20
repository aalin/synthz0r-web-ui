import messages from './middleware/messages.json'

const VALUES = messages.nested.synthz0r.nested.messages.nested.DeviceType.values

const NAMES_TO_VALUES = new Map(Object.entries(VALUES))
const VALUES_TO_NAMES = new Map(
  Object.entries(VALUES).map(([key, value]) => [value, key])
)

export function nameToValue(name) {
  if (NAMES_TO_VALUES.has(name)) {
    return NAMES_TO_VALUES.get(name)
  }

  throw new Error(`Could not find enum value for ${name}`)
}

export function valueToName(value) {
  if (VALUES_TO_NAMES.has(value)) {
    return VALUES_TO_NAMES.get(value)
  }

  throw new Error(`Could not find enum name for ${value}`)
}
