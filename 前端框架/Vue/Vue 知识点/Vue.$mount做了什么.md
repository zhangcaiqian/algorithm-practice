+ 独立构建：包含模板编译器
    + 渲染过程: html字符串 → render函数 → vnode → 真实dom节点

+ 运行时构建： 不包含模板编译器
    + 渲染过程: render函数 → vnode → 真实dom节点

1. 缓存控制是通过watcher.dirty控制的，watcher.evaluate用来重新计算，更新缓存值，并重置dirty为false,表示缓存已更新
2. P 引用了 C，C 引用了 D;
理论上 D 改变时， C 就会改变，C 则通知 P 更新;
实际上 C 让 D 和 P 建立联系，让 D 改变时直接通知 P;

### 参考文章
[链接](https://juejin.cn/post/6877451301618352141)