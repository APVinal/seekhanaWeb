class LinkedList{
    constructor(){
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    insert(index, value){
      if(index < 0 || index > this.length){
        throw new Error('Incorrect Index');
      }
      const newNode = {value};
      if(index === 0){
        newNode.next = this.head;
        this.head = newNode;
        this.tail = newNode;
        this.head.prev = null;
      }
      else{
        if(index === this.length){
          this.tail = newNode; 
        }      
        let node = this._find(index-1);
        newNode.next = node.next;
        node.next = newNode;
        newNode.prev = node;  
      }
      this.length++;
    }
  
    delete(index){
      if(index < 0 || index >= this.length){
        throw new Error('Incorrect Index');
      }
      if(index === 0){
        this.head = this.head.next;
        this.head.prev = null;
      }
      else{
        let node = this._find(index-1);
        node.next.next.prev = node; 
        node.next = node.next.next;
      }
      this.length--;
    }
  
    _find(index){
      let node = this.head;
      for(let i=0; i < index;i++){
        node = node.next;
      }
      return node;
    }
  
    _getValue(index){
      return this._find(index).value;
    }
  }
  
  module.exports = LinkedList;