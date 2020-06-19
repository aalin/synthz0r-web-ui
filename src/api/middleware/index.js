import Client from './client'
import Protocol from './protocol'
import * as actions from '../actions'
import messages from './messages.json'

export default (uri) => {
  const protocol = Protocol.fromJSON(messages, 'synthz0r.messages')

  return store => {
    const client = new Client(protocol, uri)

    client.on('open', () => {
      store.dispatch({ type: 'api_connected' })
      store.dispatch(actions.request('ListChannelsRequest'))
    })

    client.on('close', () => {
      store.dispatch({ type: 'api_disconnected' })
    })

    return next => action => {
      if (action.type !== 'API') {
        return next(action)
      }

      const { type, payload } = action.payload;

      switch (type) {
        case "request":
          client
            .request(payload.type, payload.data)
            .then(({ type, message }) => {
              store.dispatch({ type, payload: message });
            })
          break
        default:
          console.error('Unhandled action:', type);
          break
      }
    }
  }
}
