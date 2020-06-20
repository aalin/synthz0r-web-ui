import { EventEmitter } from 'events'

class Client extends EventEmitter {
  constructor(protocol, uri) {
    super()

    this._protocol = protocol

    this._idCounter = 0

    this._connect(uri)

    this._callbacks = new Map()
  }

  request(type, data = {}) {
    const id = this._idCounter++

    const encoded = this._protocol.encode(id, type, data)

    return new Promise((resolve) => {
      console.log('Requesting', id, type, data)
      this._ws.send(encoded)
      this._callbacks.set(id, resolve)
    })
  }

  _handleMessage(incomingMessage) {
    const {id, type, message} = this._protocol.decode(new Uint8Array(incomingMessage.data))

    const callback = this._callbacks.get(id)

    if (!callback) {
      console.error(`Could not match ${id} to a promise`)
      return
    }

    console.log(`Got ${type} for message`, id)

    this._callbacks.delete(id)

    callback({ type, message })
  }

  _connect(uri) {
    console.log("connecting to", uri);
    const ws = new WebSocket(uri)

    ws.binaryType = 'arraybuffer'

    ws.onopen = () => this.emit('open')

    ws.onerror = (err) => console.log("error", err)

    ws.onclose = () => {
      this.emit('close');

      setTimeout(() => {
        console.log('Reconnecting');
        this._connect(uri);
      }, 1000);
    };

    ws.onmessage = (message) => this._handleMessage(message)

    this._ws = ws;
  }
}

export default Client
