import NodeModel from '../models/node'
import { observable, action } from 'mobx'

let nextId = 0

export default class TreeStore {
  @observable.shallow tree = []

  @action.bound
  addChild(nodeId) {
    const id = `new_${nextId++}`
    this.tree[id] = NodeModel.fromJS({ id, childIds: [] })
    this.tree[nodeId].addChild(id)
  }

  getAllDescendantIds(nodeId) {
    return this.tree[nodeId].childIds.reduce((acc, childId) => (
      [ ...acc, childId, ...this.getAllDescendantIds(childId) ]
    ), [])
  }

  @action.bound
  removeChild(nodeId, parentId) {
    const ids = [ nodeId, ...this.getAllDescendantIds(nodeId) ]
    this.tree[parentId].removeChild(nodeId)
    ids.forEach(id => delete this.tree[id])
  }

  static fromJS(tree) {
    const treeStore = new TreeStore()
    treeStore.tree = Object.keys(tree).reduce((res, nodeId) => {
      return Object.assign(res, { [nodeId]: NodeModel.fromJS(tree[nodeId]) })
    }, {})
    return treeStore
  }
}
