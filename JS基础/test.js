const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"
class myPromise {
    constructor (fn)
    {
        let resolve = res => {
            if (this.status == PENDING) {
                this.status = RESOLVED
                this.value = res
                this.resolvedCallbacks.map(cb => cb())
            }
        }

        let reject = err => {
            if (this.status == REJECTED) {
                this.status = REJECTED
                this.value = err
                this.rejectedCallbacks.map(cb =< cb())
            }
        }
        this.status = PENDING;
        this.value = undefined
        this.resolvedCallbacks = []
        this.rejectedCallbacks = []

        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
}