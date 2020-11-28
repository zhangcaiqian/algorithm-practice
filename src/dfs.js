function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.visited = false;
}

function visit(node) {
    console.log(node.value);
}

function dfsSearch(rootNode) {
    if (!rootNode) {
        return;
    }
    visit(rootNode);
    rootNode.visited = true;
    if (rootNode.left) {
        if (rootNode.left.visited === false) {
            dfsSearch(rootNode.left);
        }
    }
    if(rootNode.right) {
        if(rootNode.right.visited === false) {
            dfsSearch(rootNode.right);
        }
    }
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

dfsSearch(rootNode);

console.log(rootNode);