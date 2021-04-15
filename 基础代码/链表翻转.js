const obj = {
    val: 1,
    next: {
      val: 2,
      next: {
        val: 3,
        next: null,
      },
    },
  };
  
  const revertLinkList = (headerNode) => {
      if(!headerNode.next) {
          return;
      }
      let p1 = headerNode;
      let p2 = headerNode.next;
      while(p1) {
          const temp = p2.next;
          p2.next = p1;
          p1 = p2;
          p2 = temp;
      }
      return headerNode;
  }
  
  console.log(JSON.stringify(revertLinkList(obj)));