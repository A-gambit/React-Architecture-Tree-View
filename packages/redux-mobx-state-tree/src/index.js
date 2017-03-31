import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {
  asReduxStore,
  connectReduxDevtools
} from 'mobx-state-tree'
import treeFactory from './models/tree'
import generateTree from './generateTree'
import Node from './containers/Node'

const initialState = generateTree()
const tree = window.tree = treeFactory({ tree: initialState })
const store = asReduxStore(tree)
connectReduxDevtools(tree)

render(
  <Provider store={store}>
    <Node id={0} />
  </Provider>,
  document.getElementById('root')
)
