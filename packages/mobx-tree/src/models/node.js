import { observable, action } from 'mobx'

let nextNodeId = 0

export default class NodeModel {
  @observable id
  @observable counter = 0
  @observable.shallow children = []

  constructor(id) {
    this.id = id
  }

  @action.bound
  addChild() {
    const id = `new_${nextNodeId++}`
    this.children.push(new NodeModel(id))
  }

  @action.bound
  removeChild(childId) {
    this.children = this.children.filter(child => childId !== child.id)
  }

  @action.bound
  increment() {
    this.counter++
  }

  static fromJS({ id, children }) {
    const node = new NodeModel(id)
    Object.keys(children).forEach(id => node.children.push(NodeModel.fromJS(children[id])))
    return node
  }
}
