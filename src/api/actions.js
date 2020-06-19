const ACTION_TYPE = 'API'

function action(type, payload = {}) {
  return { type: ACTION_TYPE, payload: { type, payload } }
}

export function request(type, data = {}) {
  return (dispatch) => {
    dispatch(action('request', { type, data }))
  }
}
