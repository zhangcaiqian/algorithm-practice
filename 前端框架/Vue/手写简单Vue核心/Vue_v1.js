function Vue(op) {
    const el = document.querySelector(op.el)

    this.data = op.data;
    // 数据监听
    observe(op.data, el);
    // 初始化
    el.innerHTML = op.data.message;
    // 监听message的变化，只有message变化才触发
    new Watcher(this, 'message', (newValue, oldValue) => {
        el.innerHTML = newValue;
    });
}

// 拦截器
function observe (obj, el) {
    if (typeof obj != "object") return;
    for (let key in obj)
    {
        observe(obj[key]);
        let temp = obj[key];
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            get () {
                // 将watcher添加到订阅器中
                dep.depend();
                return temp;
            },
            set (newValue) {
                if (newValue != temp) {
                    console.log('data changed', newValue);
                    temp = newValue;
                    dep.notify();
                }
            }
        })
    }
}

// 订阅器
class Dep {
    constructor() {
        this.subs = [];
    }
    // 添加订阅者
    depend() {
        if (Dep.target)
        {
            this.addSubs(Dep.target);
        }
    }
    addSubs(sub)
    {
        this.subs.push(sub);
    }
    notify()
    {
        this.subs.forEach(i => {
            i.update();
        });
    }
}

// 订阅者
class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        this.value = this.get();
    }
    // 订阅者更新视图
    update() {
        const newValue = this.vm.data[this.key];
        const oldValue = this.value;
        if (newValue != oldValue) {
            this.cb.call(this.vm, newValue, oldValue);
        }
    }
    // 初始化value，并利用闭包的形式将watcher绑定到订阅器中
    get() {
        Dep.target = this;
        const value = this.vm.data[this.key];
        Dep.target = null;
        return value;
    }
}

Dep.target = null;
// https://juejin.cn/post/6959939047061979143