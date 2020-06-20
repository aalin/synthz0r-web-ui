import { valueToName } from '../api/deviceTypeEnum'

const INITIAL_STATE = {
  channels: [],
}

function addDevice(channels, channelId, device) {
  return channels.map((channel) => {
    console.log(channel.id, channelId)
    if (channel.id === channelId) {
      console.log(device)
      switch (valueToName(device.type)) {
        case 'NOTE_DEVICE':
          return { ...channel, noteDevices: [...channel.noteDevices, device] }
        case 'EFFECT_DEVICE':
          return {
            ...channel,
            effectDevices: [...channel.effectDevices, device],
          }
        case 'INSTRUMENT_DEVICE':
          return { ...channel, instrumentDevice: device }
        default:
          console.error('Dont know what to do with this device type')
          return channel
      }
    }

    return channel
  })
}

export default function channels(state = INITIAL_STATE, action) {
  const { type, payload } = action

  switch (type) {
    case 'synthz0r.messages.ListChannelsResponse':
      return { ...state, channels: payload.channels }
    case 'synthz0r.messages.CreateChannelResponse':
      return { ...state, channels: [...state.channels, payload.channel] }
    case 'synthz0r.messages.CreateDeviceResponse':
      console.log(payload)
      return {
        ...state,
        channels: addDevice(state.channels, payload.channelId, payload.device),
      }
    case 'synthz0r.messages.ErrorResponse':
      console.error(payload.message)
      alert(`Error: ${payload.message}`)
      return state
  }

  return state
}
