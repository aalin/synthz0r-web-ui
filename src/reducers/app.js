import { valueToName } from '../api/deviceTypeEnum'

const INITIAL_STATE = {
  deviceNames: {},
  newDeviceForm: null,
}

export default function appReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action

  switch (type) {
    case 'OPEN_NEW_DEVICE_FORM':
      return {
        ...state,
        newDeviceForm: {
          typeName: payload.typeName,
          channelId: payload.channelId,
        },
      }
    case 'CLOSE_NEW_DEVICE_FORM':
      return {
        ...state,
        newDeviceForm: null,
      }
    case 'synthz0r.messages.ListDeviceNamesResponse':
      return { ...state, deviceNames: action.payload }
  }

  return state
}
