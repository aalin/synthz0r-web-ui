import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../Header'
import styles from './styles.css'

const appRoot = document.getElementById('app-root')
const modalRoot = document.getElementById('modal-root')

class ModalPortal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
    appRoot.setAttribute('class', styles.appDisabled)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)

    if (modalRoot.children.length === 0) {
      const classNames = appRoot.getAttribute('class').split(' ').filter((c) => c !== styles.appDisabled).join(' ')

      if (classNames) {
        appRoot.setAttribute('class', classNames)
      } else {
        appRoot.removeAttribute('class')
      }
    }
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    )
  }
}

function Modal({ title, titleButtons, children }) {
  return (
    <ModalPortal>
      <div className={styles.modal}>
        <Header title={title} />
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}

export default Modal
