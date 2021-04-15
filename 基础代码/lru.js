class LRU {
    constructor(quota = 3) {
      this.maxLength = quota;
      this.currrentLength = 0;
      this.catch = new Map();
      this.header = null;
      this.tail = null;
      this.initLinkList();
    }
  
    createNode() {
      return Object.create(null);
    }
  
    setCatch(key, val) {
      return this.catch.set(key, val);
    }
  
    getCatch(key) {
      return this.catch.get(key);
    }
  
    removeCatch(key) {
      this.catch.clear(key);
    }
  
    initLinkList() {
      const headerNode = this.createNode();
      headerNode.next = null;
      headerNode.prev = null;
      this.header = headerNode;
      this.tail = this.header;
    }
  
    set(key, val) {
      const node = this.createNode();
      node.data = {
        [key]: val
      };
      node.next = null;
  
      if(this.maxLength === 1) {
        node.prev = this.header;
        this.header.next = node;
        this.tail = node;
        return;
      }
  
      if(this.currentLength >= this.maxLength) {
        this.removeCatch(this.header.next.data.val);
        let p = this.header.next.next;
        p.prev = node;
        node.next = p;
        node.prev = this.header;
        this.header.next = node;
      } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
        this.currrentLength++;
      }
    }
  
    search(key) {
      let p = this.header.next;
      while(p) {
        if(p.data[key]) {
          return p;
        } else {
          p = p.next;
        }
      }
      return;
    }
  
    get(key) {
      if(this.getCatch(key)) {
        return this.getCatch(key);
      }
  
      const target = this.search(key);
      if(!target) {
        return -1;
      }
  
      const result = target.data[key];
  
      const p1 = this.tail.prev;
      const p2 = target.prev;
      this.tail.prev.next = target;
      this.tail = target;
      p2.next = target.next;
      target.next.prev = p2;
      target.prev = p1;
  
      return result;
    }
  }
  
  const lru = new LRU(2);
  
  lru.set(2,1);
  lru.set(1,1);
  console.log(lru.get(2));
  lru.set(4,1);
  console.log(lru.get(1));
  console.log(lru.get(2));
  