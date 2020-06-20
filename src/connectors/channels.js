import { connect } from 'react-redux'
import * as apiActions from '../api/actions'

function mapStateToProps(state) {
  return {
    channels: state.channels.channels,
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
    openNewDeviceForm(channelId, typeName) {
      dispatch({
        type: 'OPEN_NEW_DEVICE_FORM',
        payload: { typeName, channelId },
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
