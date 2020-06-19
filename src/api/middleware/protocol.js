const protobuf = require('protobufjs');

class Protocol {
  static fromJSON(jsonDescriptor, defaultNamespace) {
    const root = protobuf.Root.fromJSON(jsonDescriptor)
    return new Protocol(root, defaultNamespace);
  }

  constructor(root, defaultNamespace = '') {
    this._root = root;
    this._defaultNamespace = defaultNamespace.split('.').filter(Boolean);
  }

  encode(id, type, data = {}) {
    const payload = this._encodeMessage(type, data);

    return this._encodeEnvelope(id, type, payload);
  }

  decode(buffer) {
    const Envelope = this._lookupType('Envelope');
    const envelope = Envelope.decode(buffer);

    const Type = this._root.lookupType(envelope.type);

    return {
      id: envelope.id,
      type: envelope.type,
      message: Type.decode(envelope.payload)
    };
  }

  _encodeEnvelope(id, type, payload) {
    const Message = this._lookupType('Envelope');
    const message = Message.create({
      id, type, payload
    });
    return Message.encode(message).finish();
  }

  _encodeMessage(type, data) {
    const Type = this._lookupType(type);
    const error = Type.verify(data);
    if (error) { throw error; }
    const message = Type.create(data);
    return Type.encode(message).finish();
  }

  _lookupType(name) {
    return this._root.lookupType(this._defaultNamespace.concat(name).join('.'));
  }
}

export default Protocol;
