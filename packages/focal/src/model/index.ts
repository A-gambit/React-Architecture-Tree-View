let nextId = 0;

export interface NodeState {
    id: string;
    counter: number;
    children: {
        [k: string]: NodeState
    };
};

export const createNode = () => ({
  id: `new_${nextId++}`,
  counter: 0,
  children: {}
});

export const defaultNodeState: NodeState = {
    id: '0',
    counter: 0,
    children: {}
};
