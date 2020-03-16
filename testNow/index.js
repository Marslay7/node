const path = require("path");
const fs = require("fs");
module.exports = class TestNow {
  getJestSource(sourcePath = path.solve("./")) {
    const testPath = `${sourcePath}/__test__`;
    // 如果不存在，就新建一个
    if (!fs.existsSync(testPath)) {
      fs.mkdirSync(testPath);
    }

    // 遍历代码文件
    let list = fs.readdirSync(sourcePath);
    list
      // 添加完整路径
      .map(v => `${sourcePath}/${v}`)
      // 过滤文件 fs.statSync().isFile()判断是文件还是文件名
      .filter(v => fs.statSync(v).isFile())
      // 排除测试代码
      .filter(v => v.indexOf(".spec") === -1)
      .map(v => this.getTestFile(v));
  }
  getTestFile(filename) {
    console.log("filename:" + filename);
    const testFileName = this.getTestFileName(filename);

    // 判断此文件是否存在
    if (fs.existsSync(testFileName)) {
      console.log("该测试代码已存在", testFileName);
      return;
    }

    const mod = require(filename);
    let source;
    if (typeof mod === "object") {
      source = Object.keys(mod)
        .map(v => this.getTestSource(v, path.basename(filename), true))
        .join("\n");
    } else if (typeof mod === "function") {
      const basename = path.basename(filename);
      source = this.getTestSource(basename.replace(".js", ""), basename);
    }
    fs.writeFileSync(testFileName, source);
  }
  getTestSource(methodName, classFile, isClass = false) {
    console.log("getTestSource:", methodName);
    // 如果是class,要对methodName进行解构
    return `
test('${"TEST " + methodName}',()=>{
  const ${isClass ? "{" + methodName + "}" : methodName} = require('${"../" +
      classFile}')
  const ret = ${methodName}()
  // expect(ret)
  // .toBe('test return')
})
  `;
  }
  /**
   * 生成测试文件名
   * @param {*} filename 代码文件名
   * dirName 目录名
   * baseName 文件名
   * extName 后缀名
   */
  getTestFileName(filename) {
    const dirName = path.dirname(filename);
    const baseName = path.basename(filename);
    const extName = path.extname(filename);
    // stringObject.replace(regexp/substr,replacement) 这里把.js替换成.spec.js
    const testName = baseName.replace(extName, `.spec${extName}`);
    return path.format({
      root: dirName + "/__test__/",
      base: testName
    });
  }
};
