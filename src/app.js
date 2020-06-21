import React from 'react'
import ConnectionState from './components/ConnectionState'
import ChannelList from './components/ChannelList'

import connectChannels from './connectors/channels'

import './reset.css'
import styles from './app.css'

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <ChannelList />
        <ConnectionState />
      </div>
    )
  }
}

export default App
