const name = "victor jiang";
const age = 17;

function foo() {
  return "foo";
  var bar = "bar"; // 函数已经返回了，这里的赋值语句永远不会执行
}

export { name, age, foo };
