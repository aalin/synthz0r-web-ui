import React from 'react'
import ConnectionState from './components/ConnectionState'

import connectChannels from './connectors/channels'

import styles from './app.css'

class App extends React.Component {
  render() {
    return (
      <ConnectionState>
        <div className={styles.app}>
          <pre>
            {JSON.stringify(this.props, null, 2)}
          </pre>
          <button onClick={this.props.listChannels}>List channels</button>
          <button onClick={this.props.createChannel}>Create channel</button>
        </div>
      </ConnectionState>
    )
  }
}

export default connectChannels(App)
