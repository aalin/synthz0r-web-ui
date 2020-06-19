import { connect } from 'react-redux'
import * as apiActions from '../api/actions'

function mapStateToProps(state) {
  return {
    api: state.api
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)
