import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import TreeStore from './stores/tree'
import generateTree from './generateTree'
import Node from './containers/Node'

const initialState = generateTree()
const treeStore = TreeStore.fromJS(initialState)

render(
  <Provider treeStore={treeStore}>
    <Node id={0} />
  </Provider>,
  document.getElementById('root')
)
