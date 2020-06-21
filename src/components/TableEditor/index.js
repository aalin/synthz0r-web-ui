import React from 'react'
import Modal from '../Modal'
import styles from './styles.css'
import classnames from 'classnames'

function Value({ value, onChange }) {
  return (
    <span className={styles.value}>
      {value}
    </span>
  );
}

function TableEditor({ table }) {
  const min = table.min || 0
  const max = table.max || 0

  const [data, setData] = React.useState(table.data || [])

  function setValue(index, value) {
    setData(data.slice(0, index).concat(value, data.slice(index + 1)))
  }

  const rows = []

  for (let y = max - 1; y >= min; y--) {
    const cols = data.map((value, x) => {
      const classNames = classnames(styles.col, {
        [styles.active]: data[x] === y
      });

      return (
        <td
          key={x}
          onClick={() => setValue(x, y)}
          className={classNames}
        />
      )
    })

    rows.push(<tr key={y}>{cols}</tr>)
  }

  return (
    <Modal title="Edit table">
      <table>
        <tbody className={styles.tbody}>
          {rows}
        </tbody>
      </table>
    </Modal>
  );
}

export default TableEditor
