function bench(action, name) {
  const startTime = performance.now()
  action()
  const endTime = performance.now()
  const syncTime = endTime - startTime
  setTimeout(() => {
    setTimeout(() => {
      const endTime = performance.now()
      console.log(`Benchmark time, '${name}': ${syncTime}, ${endTime - startTime}`)
    }, 0)
  }, 0)
}

window.runBenchMark = function() {
  function benchmark1() {
    document
      .querySelector('li > a')
      .click()
  }

  function benchmark2() {
    document
      .querySelector('li > a')
      .parentElement.parentElement.parentElement.children[0]
      .click()
  }

  function benchmark3() {
    document
      .querySelector('li > a')
      .parentElement.parentElement.parentElement.children[1]
      .click()
  }

  function benchmark4() {
    document
      .querySelector('a')
      .click()
  }


  setTimeout(() => {
    bench(benchmark1, 'add item')
    setTimeout(() => {
      bench(benchmark2, 'toggle item')
      setTimeout(() => {
        bench(benchmark3, 'remove item')
        setTimeout(() => {
          bench(benchmark4, 'remove deep items')
        }, 1000)
      }, 1000)
    }, 1000)
  }, 0)
}
