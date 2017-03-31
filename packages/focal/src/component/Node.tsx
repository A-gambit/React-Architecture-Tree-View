import * as React from 'react';
import { Atom, F, Lens, reactiveList } from '@grammarly-npm/focal';
import { createNode, NodeState, defaultNodeState } from '../model';

const Node = (props: { node: Atom<NodeState>, removeChild?: Function }): JSX.Element => {
  const counter = props.node.lens(x => x.counter);
  const children = props.node.lens(x => x.children);
  return (
    <div>
      <F.span>Counter: {counter}</F.span>
      {' '}
      <F.button onClick={() => counter.modify(x => x + 1)}>+</F.button>
      {' '}
      {
        props.removeChild &&
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (props.removeChild) {
              props.removeChild();
            }
          }}
          style={{ color: 'lightgray', textDecoration: 'none' }}
        >
          ×
        </a>
      }
      <F.ul>
        {
          reactiveList(
            children.view(x => x ? Object.keys(x) : []),
            id => (
              <li key={id}>
                <Node 
                  node={children.lens(Lens.key<NodeState>(id)).lens(Lens.withDefault(defaultNodeState))} 
                  removeChild={() => children.modify(x => {
                    const y = {...x};
                    delete y[id];
                    return y;
                  })}
                />
              </li>
            )
          )
        }
        <li key="add">
          <a 
            href="#" 
            onClick={e => {
              e.preventDefault();
              const node = createNode();
              children.modify(x => ({...x, [node.id]: node}));
            }}
          >
          Add child
          </a>
        </li>
      </F.ul>
    </div>
  );
};

export default Node;