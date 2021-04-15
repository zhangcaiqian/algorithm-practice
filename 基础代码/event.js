class Event {
    constructor() {
        this.callbacks = {};
    }

    on(type, handler) {
        if (!this.callbacks[type]) {
            this.callbacks[type] = [handler];
        } else {
            this.callbacks[type].push(handler);
        }
    }

    off(type, handler) {
        if (!handler) {
            delete this.callbacks[type];
        }
        const list = this.callbacks[type];
        if (list) {
            for (const i = 0; i < list.length; i++) {
                if (list[i].toString() === handler.toString()) {
                    list.splice(i, 1);
                }
            }
        }
    }

    trigger(type, data) {
        const list = this.callbacks[type];

        if (list) {
            for (const i = 0; i < list.length; i++) {
                list[i].call(this, data);
            }
        }
    }

    once(type, handler) {
        this.on(type, function() {
            handler.apply(this, arguments);
            this.off(type);
        }.bind(this));
    }
}