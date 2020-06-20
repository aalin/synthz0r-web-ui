import React from 'react'
import Header from '../Header'
import styles from './styles.css'

function Modal({ title, titleButtons, children }) {
  return (
    <div className={styles.modal}>
      <Header title={title} />
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
}

export default Modal
