import { observable, action } from 'mobx'


window.observable = observable

export default class NodeModel {
  @observable id
  @observable counter = 0
  @observable childIds

  constructor(id, childIds) {
    this.id = id
    this.childIds = childIds
  }

  @action.bound
  addChild(id) {
    this.childIds.push(id)
  }

  @action.bound
  removeChild(childId) {
    this.childIds = this.childIds.filter(id => childId !== id)
  }

  @action.bound
  increment() {
    this.counter++
  }

  static fromJS(node) {
    return new NodeModel(node.id, node.childIds)
  }
}
