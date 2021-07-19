class Vue {
    constructor (options) {
        // 1. 通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        Object.keys(options.methods || {}).forEach(methodName => this[methodName] = options.methods[methodName])
        // 2. 把data中的成员转换成getter和setter，注入到vue实例中
        this._proxyData(this.$data)
        // 3. 调用observer对象，监听数据的变化
        new Observer(this.$data)
        // 4. 调用compiler对象，解析指令和差值表达式
        new Compiler(this)
    }
    _proxyData (data) {
        // 遍历data中的所有属性
        Object.keys(data).forEach(key => {
            // 把data的属性注入到vue实例中
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get () {
                    return data[key]
                },
                set (newValue) {
                    if (newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
      })
    }
}

/*Observer: 数据劫持，实现响应式，通过Object.defineProperty劫持Vue中data的数据，
在get中通过判断是不是模版里的数据决定要不要注入到dep中，在set中触发dep.notify，
构造函数只需要接受一个data就可以了
*/
class Observer {
    constructor (data) {
        this.walk(data)
    }
    walk (data) {
        console.log("after data:", data);
        // 1. 判断data是否是对象
        if (!data || typeof data !== 'object') {
            return
        }
        // 2. 遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
        console.log("after data:", data);
    }
    defineReactive (obj, key, val) {
        let that = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        // 如果val是对象，把val内部的属性转换成响应式数据
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
                if (newValue === val) {
                    return
                }
                val = newValue
                console.log("newValue:", newValue);
                that.walk(newValue)
                // 发送通知
                dep.notify()
            }
        })
    }
}

/* Compiler: 编译模版，初始化视图，创建Watcher。
通过el属性获取根节点，根据childNodes获取下面的子节点，遍历判断子节点类型，做相应的处理，
因为Compiler要初始化试图，所以它的构造函数需要接受vue实例、el属性获取根节点，
根据childNodes获取下面的子节点，遍历判断子节点类型，做相应的处理
*/
class Compiler {
    constructor (vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模板，处理文本节点和元素节点
    compile (el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 处理文本节点
            if (this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                // 处理元素节点
                this.compileElement(node)
            }
    
            // 判断node节点，是否有子节点，如果有子节点，要递归调用compile
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }
    // 编译元素节点，处理指令
    compileElement (node) {
        // console.log(node.attributes)
        // 遍历所有的属性节点
        Array.from(node.attributes).forEach(attr => {
            // 判断是否是指令
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                // v-text --> text
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node, key, attrName)
            }
        })
    }
    // 处理指令
    update (node, key, attrName) {
        if (attrName.startsWith('on')) {
            const eventName = attrName.substr(3)
            this.onUpdater.call(this.vm, node, eventName, key)
            return
        }
        let updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key)
    }
  
    // 处理 v-text 指令
    textUpdater (node, value, key) {
        node.textContent = value
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    // v-model
    modelUpdater (node, value, key) {
        node.value = value
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        // 双向绑定
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }
    // 处理 v-html 指令
    htmlUpdater (node, value, key) {
        node.innerHTML = value
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
    }
    // 处理 v-on 指令
    onUpdater (node, eventName, key) {
        node.addEventListener(eventName, this[key])
    }
    // 编译文本节点，处理差值表达式
    compileText (node) {
        // console.dir(node)
        // {{  msg }}
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
    
            // 创建watcher对象，当数据改变更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    // 判断元素属性是否是指令
    isDirective (attrName) {
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode (node) {
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode (node) {
        return node.nodeType === 1
    }
}

//Dep->目标: 收集Watcher，数据变化的时通知Watcher执行update()，每一个属性都有自己的dep对象

class Dep {
    constructor () {
        // 存储所有的观察者
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

// Watcher: 更新视图->观察者，构造函数接收3个参数vue实例、key、以及回调函数
class Watcher {
    constructor (vm, key, cb) {
        this.vm = vm
        // data中的属性名称
        this.key = key
        // 回调函数负责更新视图
        this.cb = cb
  
        // 把watcher对象记录到Dep类的静态属性target
        Dep.target = this
        // 触发get方法，在get方法中会调用addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    // 当数据发生变化的时候更新视图
    update () {
        let newValue = this.vm[this.key]
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }
}