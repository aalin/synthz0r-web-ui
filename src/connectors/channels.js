import { connect } from 'react-redux'
import * as apiActions from '../api/actions'

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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
