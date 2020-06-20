import React from 'react'
import styles from './Header.css'

function Header({ title, buttons = [] }) {
  const headerButtons = buttons && (
    <div className={styles.headerButtons}>
      {buttons}
    </div>
  )

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      {headerButtons}
    </div>
  )
}

export default Header
