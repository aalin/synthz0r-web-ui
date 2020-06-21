import React from 'react'

const CELL_WIDTH = 20;
const CELL_HEIGHT = 10;

function isBlackKey(i) {
  const index = i % 12;

  return index === 1 || index === 3 || index === 6 || index === 8 || index === 10;
}

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.svgRef = React.createRef()
  }

  handleClick(e) {
    const rect = this.svgRef.current.getBoundingClientRect()

    const x = Math.floor((e.pageX - rect.x) / CELL_WIDTH)
    const y = Math.floor((e.pageY - rect.y) / CELL_HEIGHT) + this.props.min

    console.log(e.pageX - rect.x, e.pageY - rect.y)

    this.props.setValue(x, y)
  }

  render() {
    const height = (this.props.max - this.props.min) * CELL_HEIGHT;
    const width = (this.props.data.length) * CELL_WIDTH;

    return (
      <div style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
        <svg
          ref={this.svgRef}
          width={width}
          height={height}
          onClick={this.handleClick.bind(this)}
        >
          <rect x="0" y="0" width="100%" height="100%" style={{ fill: '#333#' }} />
          {this.renderKeys()}
          {this.renderCells()}
          {this.renderGrid()}
        </svg>
      </div>
    )
  }

  renderKeys() {
    const lines = []

    for (let i = 0; i <= (this.props.max - this.props.min); i++) {
      if (!isBlackKey(i)) {
        continue;
      }

      lines.push(
        <rect
          key={`key${i}`}
          x={0}
          y={(i - this.props.min) * CELL_HEIGHT}
          width="100%"
          height={CELL_HEIGHT}
          style={{ fill: '#777' }}
        />
      )
    }

    return <g>{lines}</g>
  }

  renderGrid() {
    const lines = []

    for (let i = 0; i <= this.props.data.length; i++) {
      const x = i * CELL_WIDTH

      lines.push(
        <line
          key={`x${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2="100%"
          style={{ stroke: '#ccc', strokeWidth: 1 }}
        />
      )
    }

    for (let i = 0; i <= (this.props.max - this.props.min); i++) {
      const y = i * CELL_HEIGHT

      lines.push(
        <line
          key={`y${y}`}
          x1={0}
          y1={y}
          x2="100%"
          y2={y}
          style={{ stroke: '#ccc', strokeWidth: 1 }}
        />
      )
    }

    return <g>{lines}</g>
  }

  renderCells() {
    const rects = this.props.data.map((value, i) => {
      return (
        <rect
          key={i}
          x={i * CELL_WIDTH}
          y={(value - this.props.min) * CELL_HEIGHT}
          width={CELL_WIDTH}
          height={CELL_HEIGHT}
          style={{ fill: '#fc0' }}
        />
      )
    })

    return <g>{rects}</g>
  }
}

export default Table
