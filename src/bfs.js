function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.visited = false;
}

const rootNode = new Node(1);
const node1 = new Node(2);
const node2 = new Node(3);
const node3 = new Node(4);
const node4 = new Node(5);
const node5 = new Node(6);
const node6 = new Node(7);

rootNode.left = node1;
rootNode.right = node2;

node1.left = node3;
node1.right = node4;

node2.left = node5;
node2.right = node6;

function visit(node) {
    console.log(node.value);
}

function bfsSearch(rootNode) {
    const queue = [];
    rootNode.visited = true;
    visit(rootNode);
    queue.push(rootNode);

    while(queue.length > 0) {
        node = queue.shift();
        if (node.left) {
            if(node.left.visited === false) {
                visit(node.left);
                node.left.visited = true;
                queue.push(node.left);
            }
        }
        if (node.right) {
            if (node.right.visited === false) {
                visit(node.right);
                node.right.visited = true;
                queue.push(node.right);
            }
        }
    }
}

bfsSearch(rootNode);
