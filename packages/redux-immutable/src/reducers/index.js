import { Map, List } from 'immutable'
import { INCREMENT, ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE } from '../actions'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return state.push(action.childId)
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return Map({
        id: action.nodeId,
        counter: 0,
        childIds: List()
      })
    case INCREMENT:
      return state.set('counter', state.get('counter') + 1)
    case ADD_CHILD:
    case REMOVE_CHILD:
      return state.set('childIds', childIds(state.get('childIds'), action))
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => (
  state.get(nodeId).get('childIds').reduce((acc, childId) => (
    acc.push(childId, ...getAllDescendantIds(state, childId))
  ), List())
)

const deleteMany = (state, ids) => {
  ids.forEach(id => state = state.delete(id))
  return state
}

export default (state = {}, action) => {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return state.set(nodeId, node(state.get(nodeId), action))
}
