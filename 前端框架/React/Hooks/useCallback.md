函数组件多次渲染之间无法重用函数，每次组件发生变化时，函数组件都会重新执行一遍，会创建新的事件处理函数。
每次创建新函数的方式会让接收事件处理函数的组件，需要重新渲染。

### API
```

useCallback(fn, deps)
```

```

import React, { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = useCallback(
    () => setCount(count + 1),
    [count], // 只有当 count 发生变化时，才会重新创建回调函数
  );
  // ...
  return <button onClick={handleIncrement}>+</button>
}

```