watch(
  [x, () => y.value],
  ([newX, newY]) => {
    console.log(newX, newY)
  }
)
