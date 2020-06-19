const INITIAL_STATE = {
  connected: false
}

export default function api(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'api_connected':
      return { ...state, connected: true }
    case 'api_disconnected':
      return { ...state, connected: false }
  }

  return state
}
