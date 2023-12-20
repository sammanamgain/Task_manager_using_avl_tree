class Node{
    constructor(name, priority,priorityqueue) {
        this.name = name;
        this.priority = priority;
        this.priorityqueue=priorityqueue;
        this.completed = false;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class TaskBST {
    constructor() {
        this.root = null;
        this.orderCounter = 0;
    }
    insert(baseNode, newTask) {
        if (baseNode === null) {
            console.log(newTask.priorityqueue)
            return new Node(newTask.name, newTask.priority,newTask.priorityqueue,this.orderCounter++);
        }

        if (newTask.priority < baseNode.priority) {
            baseNode.leftChild = this.insert(baseNode.leftChild, newTask);
        } else if (newTask.priority > baseNode.priority) {
            baseNode.rightChild = this.insert(baseNode.rightChild, newTask);
        }
        else{
            newTask.priorityqueue=newTask.priorityqueue+1
            if(baseNode.priorityqueue<newTask.priorityqueue)
            {
                baseNode.leftChild=this.insert(baseNode.leftChild,newTask)
            }
            else{
                baseNode.rightChild=this.insert(baseNode.rightChild,newTask)
            }
        }


        
        return baseNode;
    }
    display() {
        this.displayNode(this.root, 0);
    }

    displayNode(node, level) {
        if (node !== null) {
            this.displayNode(node.rightChild, level + 1);
            console.log("  ".repeat(level) + `${node.name} (Priority: ${node.priority}, Order: ${node.order})`);
            this.displayNode(node.leftChild, level + 1);
        }
    }


}

// Example usage:

const taskBST = new TaskBST();

taskBST.root = taskBST.insert(taskBST.root, { name: "Complete assignment", priority: 2,priorityqueue:1 });

taskBST.root = taskBST.insert(taskBST.root, { name: "Read a book", priority: 1 ,priorityqueue:1});

taskBST.root = taskBST.insert(taskBST.root, { name: "Go for a run", priority: 3,priorityqueue:1 });
taskBST.root = taskBST.insert(taskBST.root, { name: "Go for a walk", priority: 3,priorityqueue:1 });
taskBST.root = taskBST.insert(taskBST.root, { name: "Go for a walk", priority: 3,priorityqueue:1 });
taskBST.display()


