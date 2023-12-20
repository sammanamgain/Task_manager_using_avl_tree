class AVLNode {
    constructor(name, priority, order) {
        this.name = name;
        this.priority = priority;
        this.order = order;
        this.completed = false;
        this.leftChild = null;
        this.rightChild = null;
        this.height = 0; // Updated height initialization to 0
    }
}

class AVLTree {
    constructor() {
        this.root = null;
        this.orderCounter = 0;
    }

    height(node) {
        return node ? node.height : -1;
    }

    updateHeight(node) {
        node.height = 1 + Math.max(this.height(node.leftChild), this.height(node.rightChild));
    }

    balanceFactor(node) {
        return this.height(node.leftChild) - this.height(node.rightChild);
    }

    rotateRight(y) {
        const x = y.leftChild;
        const T2 = x.rightChild;

        // Perform rotation
        x.rightChild = y;
        y.leftChild = T2;

        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    rotateLeft(x) {
        const y = x.rightChild;
        const T2 = y.leftChild;

        // Perform rotation
        y.leftChild = x;
        x.rightChild = T2;

        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    insertNode(node, newTask) {
       // console.log("did Insertion triggered")
        if (node === null) {
            return new AVLNode(newTask.name, newTask.priority, this.orderCounter++);
        }
    
        if (newTask.priority < node.priority || (newTask.priority === node.priority && newTask.order < node.order)) {
            node.leftChild = this.insertNode(node.leftChild, newTask);
        } else {
            node.rightChild = this.insertNode(node.rightChild, newTask);
        }
    
        // Update height of the current node
        this.updateHeight(node);
    
        // Get the balance factor to check if balancing is required
        const balance = this.balanceFactor(node);
    
        // Left-Left Case
        if (balance > 1 && newTask.priority < node.leftChild.priority) {
            return this.rotateRight(node);
        }
        // Right-Right Case
        if (balance < -1 && newTask.priority > node.rightChild.priority) {
            return this.rotateLeft(node);
        }
        // Left-Right Case
        if (balance > 1 && newTask.priority > node.leftChild.priority) {
            node.leftChild = this.rotateLeft(node.leftChild);
            return this.rotateRight(node);
        }
        // Right-Left Case
        if (balance < -1 && newTask.priority < node.rightChild.priority) {
            node.rightChild = this.rotateRight(node.rightChild);
            return this.rotateLeft(node);
        }
    
        return node;
    }
    

    insert(newTask) {
        this.root = this.insertNode(this.root, newTask);
    }

    // Traversal: In-order
    inOrderTraversal(callback) {
        this.inOrderTraversalNode(this.root, callback);
    }

    inOrderTraversalNode(node, callback) {
        if (node !== null) {
            this.inOrderTraversalNode(node.leftChild, callback);
            callback(node);
            this.inOrderTraversalNode(node.rightChild, callback);
        }
    }

    // Searching
    findNodeByName(name) {
        return this.findNodeByNameNode(this.root, name);
    }
    findNodeByNameNode(node, name) {
        if (node === null || node.name.trim().toLowerCase() === name.trim().toLowerCase()) {
            return node;
        }
    
        if (name.trim().toLowerCase() < node.name.trim().toLowerCase()) {
            return this.findNodeByNameNode(node.leftChild, name);
        } else {
            return this.findNodeByNameNode(node.rightChild, name);
        }
    }
    



    // Deletion
    deleteNodeByName(name) {
        this.root = this.deleteNodeByNameNode(this.root, name);
    }

    deleteNodeByNameNode(node, name) {
        if (node === null) {
            return node;
        }

        if (name < node.name) {
            node.leftChild = this.deleteNodeByNameNode(node.leftChild, name);
        } else if (name > node.name) {
            node.rightChild = this.deleteNodeByNameNode(node.rightChild, name);
        } else {
            // Node with only one child or no child
            if (node.leftChild === null) {
                return node.rightChild;
            } else if (node.rightChild === null) {
                return node.leftChild;
            }

            // Node with two children
            node.name = this.minValueNode(node.rightChild).name;
            node.rightChild = this.deleteNodeByNameNode(node.rightChild, node.name);
        }

        // Update height of the current node
        this.updateHeight(node);

        // Get the balance factor to check if balancing is required
        const balance = this.balanceFactor(node);

        // Left-Left Case
        if (balance > 1 && this.balanceFactor(node.leftChild) >= 0) {
            return this.rotateRight(node);
        }
        // Right-Right Case
        if (balance < -1 && this.balanceFactor(node.rightChild) <= 0) {
            return this.rotateLeft(node);
        }
        // Left-Right Case
        if (balance > 1 && this.balanceFactor(node.leftChild) < 0) {
            node.leftChild = this.rotateLeft(node.leftChild);
            return this.rotateRight(node);
        }
        // Right-Left Case
        if (balance < -1 && this.balanceFactor(node.rightChild) > 0) {
            node.rightChild = this.rotateRight(node.rightChild);
            return this.rotateLeft(node);
        }

        return node;
    }

    minValueNode(node) {
        let current = node;
        while (current.leftChild !== null) {
            current = current.leftChild;
        }
        return current;
    }

    // Display the tree
    display() {
        this.displayNode(this.root, 0);
    }

    displayNode(node, level) {
        if (node !== null) {
            this.displayNode(node.rightChild, level + 1);
            console.log("  ".repeat(level) + `${node.name} (Priority: ${node.priority}, Order: ${node.order}, Height: ${node.height})`);
            this.displayNode(node.leftChild, level + 1);
        }
    }
}


export default AVLTree
// Example usage:

// const avlTree = new AVLTree();

// avlTree.insert({ name: "Complete assignment", priority: 2 });
// avlTree.insert({ name: "Read a book", priority: 1 });
// avlTree.insert({ name: "Go for a run", priority: 3 });
// avlTree.insert({ name: "Go for a walk", priority: 3 });

// // Display the tree
// console.log("AVL Tree:");
// avlTree.display();

// // In-order traversal
// console.log("\nIn-order Traversal:");
// avlTree.inOrderTraversal((node) => {
//     console.log(`${node.name} (Priority: ${node.priority}, Order: ${node.order}, Height: ${node.height})`);
// });


// Delete a node by name
// const nodeNameToDelete = "Go for a run";
// avlTree.deleteNodeByName(nodeNameToDelete);
// console.log(`\nAfter deleting node with name ${nodeNameToDelete}:`);
// avlTree.display();




// let flag=0;
// (
// function(name)
// {
//     name="Go for a walk"

//     avlTree.inOrderTraversal((node) => {

//         if(node.name===name)
//         {
//             flag=1;
//         console.log(`${node.name} (Priority: ${node.priority}, Order: ${node.order}, Height: ${node.height})`);
//         }
//     });
    
// })();

// if(flag)
// {
//     console.log("found")
// }

