import React from 'react'
import { render } from 'react-dom'
import NodeModule from './models/node'
import generateTree from './generateTree'
import Node from './containers/Node'

const initialState = generateTree()
const node = NodeModule.fromJS(initialState)

render(
  <Node node={node} root />,
  document.getElementById('root')
)
