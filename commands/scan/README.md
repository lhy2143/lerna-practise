# `scan`

> TODO: description

## Usage

```
const scan = require('scan');

// TODO: DEMONSTRATE API
```

## data.js

其中的内容即遍历 `ucf3`项目中`jsbridge`中的`ucf`字段得到的。

```
function getApiPath(obj, apiValue, result = []) {
  Object.keys(obj).forEach((item) => {
    if (Object.prototype.toString.call(obj[item]) !== '[object Object]') {
      result.push(`${apiValue}.${item}`);
    } else {
      return getApiPathTwo(obj[item], `${apiValue}.${item}`, result);
    }
  });
  return result;
}

getApiPathTwo(ucf, 'ucf');
```
