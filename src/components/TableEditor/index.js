import React from 'react'
import Modal from '../Modal'
import Table from './Table'
import styles from './styles.css'
import classnames from 'classnames'

function Value({ value, onChange }) {
  return (
    <span className={styles.value}>
      {value}
    </span>
  );
}

function TableEditor({ table, updateTable, onClose }) {
  const min = table.min || 0
  const max = table.max || 0

  const [data, setData] = React.useState(table.data || [])

  function setValue(index, value) {
    const newData = data.slice(0, index).concat(value, data.slice(index + 1))
    setData(newData)
    updateTable && updateTable(newData)
  }

  return (
    <Modal title="Edit table">
      <Table data={data} min={min} max={max} setValue={setValue} />
      <div>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}

export default TableEditor
