import { Map, List } from 'immutable'

window.List = List

const createNode = id => Map({
  id,
  counter: 0,
  childIds: List()
})

export default function generateTree() {
  let tree = Map().set(0, createNode(0))

  for (let i = 1; i < 10000; i++) {
    let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
    tree = tree.set(i, createNode(i))
    tree = tree.set(parentId, tree.get(parentId).set('childIds', tree.get(parentId).get('childIds').push(i)))
  }

  return tree
}
