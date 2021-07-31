function myPromise (executor) {
    var self = this;
    self.status = "pending";
    self.data = undefined;
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];
    function resolve (value) {
        if (self.status == "pending") {
            self.status = "resolved";
            self.data = value;
            console.log("resolved");
            for (var i = 0; i < self.onResolvedCallback.length; i++) {
                console.log("callback: ", i);
                self.onResolvedCallback[i](value);
            }
        }
    }
    
    function reject (reason) {
        if (self.status == "pending") {
            self.status = "rejected";
            console.log("rejected");
            self.reason = reason;
            for (var i = 0; i < self.onResolvedCallback.length; i++) {
                self.onRejectedCallback[i](reason);
            }
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

myPromise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2;
    onResolved = typeof onResolved == "function" ? onResolved : function (v) {};
    onRejected = typeof onRejected == "function" ? onRejected : function (r) {};
    if (self.status == "resolved") {
        return promise2 = new myPromise (function (resolve, reject) {
            try {
                console.log("then resolve: ");
                let x = onResolved(self.data);
                resolve(x);
            } catch (e) {
                reject(e);
            }
        });
    }
    else if (self.status == "rejected") {
        return promise2 = new myPromise (function (resolve, reject) {
            try {
                let x = onRejected(self.data);
                resolve(x);
            } catch (e) {
                let x = onRejected(self.data);
                reject(e);
            }
        });
    }
    else if (self.status == "pending") {
        console.log("then pending" + onResolved);
        return promise2 = new myPromise (function (resolve, reject) {
            self.onResolvedCallback.push(function (value) {
                try {
                    onResolved(self.data);
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallback.push(function (value) {
                try {
                    onRejected(self.data);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }
    
}



