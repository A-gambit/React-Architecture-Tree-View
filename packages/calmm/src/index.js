import React from 'react'
import { render } from 'react-dom'
import Atom from 'kefir.atom'
import generateTree from './generateTree'
import Node from './containers/Node'

window.Atom = Atom

const initialState = generateTree()
const node = Atom(initialState)

render(
  <Node node={node} root />,
  document.getElementById('root')
)
