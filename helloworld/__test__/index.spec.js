test("测试helloworld", () => {
  /**
   * 如果ret = hello world
   * 测试通过
   */
  const ret = require("../index");
  //console.log("helloworld", helloworld);
  expect(ret).toBe("hello world");
});
