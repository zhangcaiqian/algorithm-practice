class Promise {
    constructor(fn) {
      if(typeof fn == "function") {
        throw new TypeError('params should be a function');
      }
      this.status = 'pending';
      this.data = null;
      this.rejectedMsg = null;
      this.onFulfilledCallback = [];
      this.onRejectedCallback = [];
  
      try{
        fn(this.resolve, this.reject);
      } catch(err) {
        this.reject(err);
      }
    }
  
    resolve(value) {
      if(this.status === 'pending') {
        this.status = 'resolved';
        this.data = value;
  
        setTimeout(() => {
          this.onFulfilledCallback.forEach((fn) => {
            fn(value);
          });
        });
      }
    }
  
    reject(reason) {
      if(this.status === 'pending') {
        this.status = 'rejected';
        this.rejectedMsg = reason;
  
        setTimeout(() => {
          this.onRejectedCallback.forEach((fn) => {
            fn(reason);
          });
        })
      }
    }
  
    then(onFulfilled, onRejected) {
      if(typeof onFulfilled !== 'function') {
        onFulfilled = v => v;
      }
  
      if(typeof onRejected !== 'function') {
        onRejected = v => v;
      }
  
      if(this.status === 'pending') {
        return new Promise((resolve, reject) => {
  
          this.onFulfilledCallback.push((value) => {
            setTimeout(() => {
              try {
                const result = onFulfilled(value);
                if(result instanceof Promise) {
                  result.then(resolve, reject);
                } else {
                  resolve(result);
                }
              } catch (err) {
                reject(err);
              }
            });
          });
  
          this.onRejectedCallback.push((reason) => {
            setTimeout(() => {
              try {
                const result = onRejected(reason);
                if (result instanceof Promise) {
                  result.then(resolve, reject);
                } else {
                  resolve(result);
                }
              } catch (err) {
                reject(err);
              }
            });
          });
        });
      }
  
      if(this.status === 'resolved') {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              const result = onFulfilled(this.data);
              if(result instanceof Promise) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } catch(err) {
              reject(err);
            }
          });
  
        });
      }
  
      if(this.status === 'rejected') {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              const result = onRejected(this.data);
              if (result instanceof Promise) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    }
  
    catch(onRejected) {
      return this.then(null, onRejected);
    }
  }