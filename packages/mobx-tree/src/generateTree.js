export default function generateTree() {
  let tree = {
    id: '0',
    counter: 0,
    children: []
  }

  let current = tree

  for (let k = 0; k < 10; k++) {
    for (let l = 0; l < 10; l++) {
      for (let j = 0; j < 10; j++) {
        for (let i = 1; i < 10; i++) {
          current.children.push({
            id: `${k}${j}${i}${Math.random()}`,
            counter: 0,
            children: []
          })
          current = current.children[current.children.length - 1]
        }
        current = tree
      }
      current = tree
    }
    current = tree
  }

  return tree
}
