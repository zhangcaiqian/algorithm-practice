class Vue {
    constructor (options) {
        // 1. 通过属性保存选项的数据
        this.$options = options || []
        this.$dadat = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        Object.keys(options.methods || {}).forEach(methodName => this[methodName] = options.methods[methodName])
        // 2. 把data中的成员换成getter 和setter，注入到Vue实例
        this._proxyData(this.$data)
        // 3. 调用observer对象监听数据变化
        new Observer(this.$data)
        // 4. 调用compilse对象，解析指令和差值表达式
        new Compiler(this)


    }

    _proxyData (data) {
        // 遍历data中所有的属性
        Object.keys(data).forEach(key => {
            // 将data的属性注入到vue实例中
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get ()
                {
                    return data[key]
                },
                set (newValue) {
                    if (newValue === data[key])
                        return
                    data[key] = newValue
                }
            })
        })
    }
}

// Observer: 数据劫持，实现响应式，通过Object.defineProperty劫持Vue 中 data的数据，在get中判断是否模块中的数据决定要不要注入到dep中，在set中触发dep.notify
class Observer {
    constructor (data) {
        this.walk(data)
    }

    walk (data) {
        // 1. 判断data是不是对象
        if (!dta || typeof data !== 'object') {
            return
        }
        // 2. 遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    
    defineReactive (obj, key, val) {
        let that = this
        // 负责收集依赖，并且发送通知
        let dep = new Dep()
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set (newValue) {
                if (newValue === val)
                    return
                val = newValue
                this.walk(newValue)
                dep.notify()
            }
        })
    }
}
// compile 编译模版，初始化视图，创造watcher，遍历el和它的子节点

class Compiler {
    constructor (vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模版，处理文本节点和元素节点
    compile (el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 处理文本节点
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node))  {
            // 处理元素节点
                this.compileElement(node)
            }

            if (node.childNodes && node.childNodes.length)
                this.compile(node)
        })
    }
    
    compileText (node) {
        // {{ msg }}
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])

            // 创建watcher对象，当数据改变时更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }

    isTextNode (node) {
        return node.nodeType == 3
    }

    isElementNode (node) {
        return node.nodeType == 1
    }
}

// 收集watcher，数据变化时通知watcher执行update，每个属性都有自己的dep对象
class Dep {
    constructor () {
        this.subs = []
    }
    // 添加观察者
    addSub (sub) {
        if (sub && sub.update) {
            this.subs.push(sub)
        }
    }
    // 发送通知
    notify () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm
        // 属性名称
        this.key = key
        // 回调函数
        this.cb = cb
        
        // 把watcher对象记录到Dep的静态属性target
        Dep.target = this
        // 触发target方法，在get中调用addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    // 数据变化时更新视图
    update () {
        let newValue = this.vm[this.key]
        if (this.oldValue ===  newValue)
            return
        this.cb(newValue)
    }
}