import React from 'karet'
import U, { seq, mapCached, fromIds } from 'karet.util'

let nextId = 0

const createNode = () => ({
  id: `new_${nextId++}`,
  counter: 0,
  children: {}
})


const Node = ({ node, root }) => {
  const counter = node.view('counter')
  const children = node.view('children')
  return (
    <div>
      Counter: {counter}
      {' '}
      <button onClick={() => counter.modify(x => x + 1)}>+</button>
      {' '}
      {
        !root &&
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            node.remove()
          }}
          style={{ color: 'lightgray', textDecoration: 'none' }}>
          ×
        </a>
      }
      <ul>
        {
          seq(
            U(children, (c = {}) => Object.keys(c).map(key => c[key].id)),
            mapCached(id => <Node key={ id } node={ children.view(id) } />)
          )
        }
        <li key="add">
          <a href="#" onClick={e => {
            e.preventDefault()
            const node = createNode()
            children.modify(x => ({ ...x, [node.id]: node }))
          }}>
            Add child
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Node

