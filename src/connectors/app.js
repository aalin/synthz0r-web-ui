import { connect } from 'react-redux'
import * as apiActions from '../api/actions'
import { nameToValue } from '../api/deviceTypeEnum'

function mapStateToProps(state) {
  return {
    deviceNames: state.app.deviceNames,
    newDeviceForm: state.app.newDeviceForm,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createDevice(channelId, typeName, deviceName) {
      const type = nameToValue(typeName)

      dispatch(
        apiActions.request(`CreateDeviceRequest`, {
          channelId,
          name: deviceName,
          type,
        })
      )
    },
    closeNewDeviceForm() {
      dispatch({ type: 'CLOSE_NEW_DEVICE_FORM' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
