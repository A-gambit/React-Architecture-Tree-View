import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Atom } from '@grammarly-npm/focal';
import Node from './component/Node';
import generateTree from './generateTree';

const tree = Atom.create(generateTree());

// tree.subscribe(console.log);
ReactDOM.render(
  <Node node={tree} />,
  document.getElementById('root') as HTMLElement
);
