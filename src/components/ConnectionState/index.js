import React from 'react'
import classnames from 'classnames'
import connectAPI from '../../connectors/api'

import styles from './styles.css'

function DisconnectedFlash({}) {
  return (
    <div className={styles.disconnectedFlash}>
      Connecting...
    </div>
  )
}

function ConnectionState({ api, children }) {
  const disconnected = !api.connected

  const wrapperClass = classnames(styles.wrapper, {
    [styles.disconnected]: disconnected
  })

  return (
    <React.Fragment>
      {disconnected && <DisconnectedFlash />}
      <div className={wrapperClass}>
        {children}
      </div>
    </React.Fragment>
  )
}

export default connectAPI(ConnectionState)
