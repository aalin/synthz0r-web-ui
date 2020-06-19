const INITIAL_STATE = {
  channels: []
}

export default function channels(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case 'synthz0r.messages.ListChannelsResponse':
      return { ...state, channels: payload.channels };
    case 'synthz0r.messages.CreateChannelResponse':
      return { ...state, channels: [...state.channels, payload.channel] };
  }

  return state
}
