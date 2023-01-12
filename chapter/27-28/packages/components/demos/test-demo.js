const myMath = {
  add(num1, num2) {
    return num1 + num2;
  },

  subtract(num1, num2) {
    return num1 - num2;
  },

  multiply(num1, num2) {
    return num1 * num2;
  },

  divide(num1, num2) {
    return num1 / num2;
  }
};

// const result = myMath.add(1, 2);
// const expect = 3;
// if (result === expect) {
//   console.log('myMath.add 加法测试成功！');
// } else {
//   throw Error(
//     `myMath.add 加法测试失败，期待结果应该是：${expect}，但实际结果为：${result}`
//   );
// }

const allUnitTestResults = [];
function unitTest(name, callback) {
  let success = false;
  let error = null;
  try {
    callback();
    success = true;
  } catch (err) {
    error = err;
  }
  allUnitTestResults.push({
    name,
    success,
    error
  });
}

unitTest('加法函数 add', () => {
  const result = myMath.add(1, 2);
  const expect = 3;
  if (result === expect) {
    console.log('myMath.add 加法测试成功！');
  } else {
    throw Error(
      `myMath.add 加法测试失败，期待结果应该是：${expect}，但实际结果为：${result}`
    );
  }
});

unitTest('减法函数 subtract', () => {
  const result = myMath.subtract(3, 2);
  const expect = 1;
  if (result === expect) {
    console.log('myMath.add 减法测试成功！');
  } else {
    throw Error(
      `myMath.add 减法测试失败，期待结果应该是：${expect}，但实际结果为：${result}`
    );
  }
});

let successCount = 0;
let failCount = 0;
allUnitTestResults.forEach((item) => {
  if (item.success === true) {
    successCount++;
  } else {
    failCount++;
    console.log(item.error);
  }
});

console.log(`总共 ${allUnitTestResults.length}个测试用例`);
console.log(`测试成功个数： ${successCount}`);
console.log(`测试失败个数： ${failCount}`);
