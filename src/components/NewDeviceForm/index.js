import React from 'react'
import Modal from '../Modal'
import connectApp from '../../connectors/app'

const DEVICE_TYPE_TO_KEYS = {
  INSTRUMENT_DEVICE: "instrumentDevices",
  NOTE_DEVICE: "noteDevices",
  EFFECT_DEVICE: "effectDevices",
}

function deviceTypeToDeviceKey(type) {
  switch (type) {
    case "":
  }
}

function DeviceNameOptions({ names, onChange }) {
  const items = names.map((name) => (
    <option key={name} value={name}>{name}</option>
  ))

  return (
    <select onChange={onChange}>
      <option>Select device</option>
      {items}
    </select>
  )
}

function NewDeviceForm({ newDeviceForm, deviceNames, createDevice, closeNewDeviceForm }) {
  const [selectedName, setSelectedName] = React.useState(null);

  if (!newDeviceForm) {
    return null;
  }

  function onClick() {
    createDevice(
      newDeviceForm.channelId,
      newDeviceForm.typeName,
      selectedName
    )
  }

  const names = deviceNames[DEVICE_TYPE_TO_KEYS[newDeviceForm.typeName]];

  return (
    <Modal title="New device">
      <div>
        <DeviceNameOptions
          names={deviceNames[DEVICE_TYPE_TO_KEYS[newDeviceForm.typeName]]}
          onChange={(e) => setSelectedName(e.target.value)}
        />
      </div>

      <button
        onClick={onClick}
        disabled={!selectedName}
      >
        New device
      </button>
      <button onClick={closeNewDeviceForm}>
        Cancel
      </button>
    </Modal>
  )
}

export default connectApp(NewDeviceForm)
