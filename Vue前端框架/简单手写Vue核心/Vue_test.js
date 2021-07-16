class Vue {
    constructor (options)
    {
        // 1.通过属性保存各种数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el == "string" ? document.querySelector(options.el) : options.el
        Object.keys(options.methods || {}).forEach(methondName => {this[methondName] = options.methods[methondName]})
        // 2.将data中的成员变量转成getter和setter，注入到vue中
        this._proxyData(this.$data);
        // 3. 调用observer对象，监听数据的变化
        new Observer(this.$data)
        // 4. 调用compiler对象，解析指令和差值表达式
        new Compiler(this);
    }

    _proxyData (data)
    {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get ()
                {
                    return data[key]
                },
                set (newValue)
                {
                    if (newValue === data[key])
                        return
                    data[key] = newValue
                }
            })
        });
    }
}
// 编译模版，初始化视图，创建watcher
class Compiler {
    constructor (vm)
    {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    compile (el)
    {
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            // 处理文本节点
            if (this.isTextNode(node))
            {
                this.compileText(node)
            }
            else if (this.isElementNode(node))
            {
                // 处理元素节点
                this.compileElement(node)
            }
            if (node.childNodes && node.childNodes.length)
                this.compile(node);
        })
    }
    // 编译文本节点，处理差值表达式
    compileText (node)
    {
        // {{ message }}
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value))
        {
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue;
            });
        }
    }
    // 编译元素节点，处理指令
    compileElement (node)
    {
        // 遍历所有属性节点
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name
            // 判断是否是指令
            if (this.isDirective(attrName))
            {
                // v-text -> text
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node, key, attrName)
            }
        })
    }
    // 处理指令
    update (node, key, attrName)
    {
        let updateFn = this[attrName + "Updater"]
        updateFn && updateFn.call(this, node, this.vm[key], key)
    }
    // 处理 v-text 指令
    textUpdater (node, value, key)
    {
        node.textContent = value
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    // 处理 v-model 指令
    modelUpdater (node, value, key)
    {
        node.value = value
        new Watcher(this.vm, key, newValue => {
            node.value = newValue
        })
        node.addEventListener("input", () => {
            this.vm[key] = node.value
        })

    }
    // 处理 v-html 指令
    htmlUpdater (node, value, key) {
        node.innerHTML = value
        new Watcher(this.vm, key, newValue => {
            node.innerHTML = newValue
        })
    }
    // 判断是否是指令
    isDirective (attrName)
    {
        return attrName.startsWith("v-")
    }
    // 判断是否是文本节点
    isTextNode (node)
    {
        return node.nodeType === 3
    }
    // 判断是否是元素节点
    isElementNode (node)
    {
        return node.nodeType == 1
    }
}

// 数据劫持，实现响应式，通过Object.defineProperty 劫持data数据，在get中判断是否注入到dep,dep.notify
class Observer
{
    constructor (data)
    {
        this.walk(data)
    }
    walk (data)
    {
        // 1.判断data是否是对象
        if (!data || typeof data != "object")
            return
        // 2.遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineProperty(data, key, data[key])
        })    
    }

    defineProperty (obj, key, val)
    {
        let that = this
        // 负责收集依赖，并发送通知
        let dep = new Dep()
        // 如果val是对象，将val的内部属性转换成响应式数据
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get ()
            {
                // 收集依赖，注意此处
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set (newVal)
            {
                console.log("set:", val, newVal)
                if (newVal === val)
                    return
                val = newVal
                that.walk(newVal)
                // 发送通知
                dep.notify()

            }
        })
    }
}

// 收集watcher，数据变化时通知watcher执行update()，每一个属性都有自己的dep
class Dep 
{
    constructor ()
    {
        // 存储所有观察者
        this.subs = []
    }
    // 添加观察者
    addSub (sub)
    {
        if (sub && sub.update)
            this.subs.push(sub)
    }
    notify ()
    {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

// 更新视图 - 观察者
class Watcher {
    constructor (vm, key, cb)
    {
        this.vm = vm
        // data中的属性名称
        this.key = key
        // 回调函数
        this.cb = cb

        // 将watcher的对象记录到class的类中
        Dep.target = this
        // 触发get方法，在get中调用addSub
        this.oldValue = vm[key]
        vm.target = null
    }
    // 当数据发生变化时，更新视图
    update ()
    {
        let newValue = this.vm[this.key]
        if (this.oldValue === newValue)
            return
        this.cb(newValue)
    }
}