### node

- bash 运行

  ```js
  node helloworld/index.js
  或
  node helloword
  ```

- Nodemon 自动重启：监视代码修改，自动重启

  ```js
  npm i nodemon -g
  nodemon helloworld
  ```

- Vscode 调试 debug

- 单元测试 Jest

  - 安装 Jest 库

    ```js
    npm i jest -g
    ```

    在同级文件下创建\_\_test\_\_文件夹下创建 index.spec.js

    ```js
    test("测试helloworld", () => {
      const helloworld = require("../index");
      console.log("helloworld", helloworld);
    });
    ```

    创建 package.json 文件

    ```js
    {
      "scripts": {
        "test": "jest"
      }
    }
    ```

* 运行

  jest helloworld --watch(监测模式)
