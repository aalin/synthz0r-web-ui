import { EventEmitter } from 'events'

class Client extends EventEmitter {
  constructor(protocol, host) {
    super()

    this._protocol = protocol

    this._idCounter = 0

    this._ws = new WebSocket(host)

    this._ws.binaryType = 'arraybuffer'

    this._ws.onopen = () => this.emit('open')
    this._ws.onclose = () => this.emit('close')
    this._ws.onmessage = (message) => this._handleMessage(message)

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
}

export default Client
