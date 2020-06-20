import { connect } from 'react-redux'
import * as apiActions from '../api/actions'
import { nameToValue } from '../api/deviceTypeEnum'

function mapStateToProps(state) {
  return {
    channels: state.channels,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listChannels() {
      dispatch(apiActions.request('ListChannelsRequest'))
    },
    createChannel() {
      dispatch(apiActions.request('CreateChannelRequest'))
    },
    addNoteDevice(channelId, name) {
      dispatch(
        apiActions.request('CreateNoteDeviceRequest', { channelId, name })
      )
    },
    addInstrumentDevice(channelId, name) {
      dispatch(
        apiActions.request('CreateInstrumentDeviceRequest', { channelId, name })
      )
    },
    addDevice(channelId, typeName) {
      const type = nameToValue(typeName)

      return (name) => {
        dispatch(
          apiActions.request(`CreateDeviceRequest`, { channelId, name, type })
        )
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
