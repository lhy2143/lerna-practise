## 安装
```
npm intall @fip/cli@latest
yarn add @fip/cli@latest
```
## 工具集
1、项目规范

在项目根目录下执行如下：
```
npx fip lint init
```

2、发包版本管理

在package.json的scripts字段中配置如下：(这样在执行`npm publish`命令时，会进行版本管理)
```
"prepublishOnly":"fip version"
```

3、项目扫描
以下命令会扫描执行命令目录下的除了`node_modules`的文件,统计以`.js`,`.ts`,`.jsx`,`.tsx`,和`.vue`结尾的文件中UCF3 API的使用情况。
API的格式：`ucf.api.xxx.xxx`。扫描完成后会在同级目录生成一个名为`count.xlsx`的文件
```
npx fip scan
```