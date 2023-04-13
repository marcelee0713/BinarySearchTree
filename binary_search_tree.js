class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  sortAndRmvDupArray(arr) {
    arr.sort((a, b) => a - b);
    arr = arr.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    return arr;
  }

  prepareTree(arr) {
    const preparedArr = this.sortAndRmvDupArray(arr);
    this.root = this.buildTree(preparedArr, 0, preparedArr.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) return;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  insert(value) {
    if (this.root === null || !value) {
      return null;
    }

    let currNode = this.root;
    while (currNode) {
      if (currNode.value === value) {
        return "This value is already in the tree.";
      }

      if (value > currNode.value) {
        if (!currNode.right) {
          const newNode = new Node(value);
          currNode.right = newNode;
          break;
        }
        const rightNode = currNode.right;
        currNode = rightNode;
      } else if (value < currNode.value) {
        if (!currNode.left) {
          const newNode = new Node(value);
          currNode.left = newNode;
          break;
        }
        const leftNode = currNode.left;
        currNode = leftNode;
      }
    }
  }

  delete(value) {
    let currNode = this.root;
    let prevNode = null;
    let prevNodePosition;
    if (this.root === null || !value) {
      return null;
    }
    while (currNode) {
      if (value === currNode.value) {
        if (value === this.root.value) {
          // delete a node with two children
          if (currNode.left && currNode.right) {
            let farLeftParentNode;
            let farLeftChildrenInRight;
            let farLeftNode = currNode.right;
            // If this doesn't have any value in left
            if (!farLeftNode.left) {
              // If this node has a value on the right.
              if (farLeftNode.right) {
                farLeftNode.left = currNode.left;
                this.root = null;
                this.root = farLeftNode;
                break;
              }
              // If this node does not literally have any children
              farLeftNode.left = currNode.left;
              this.root = null;
              this.root = farLeftNode;
              break;
            }
            while (farLeftNode) {
              if (!farLeftNode.left) {
                farLeftParentNode.left = null;
                if (farLeftNode.right) {
                  farLeftChildrenInRight = farLeftNode.right;
                  farLeftParentNode.left = farLeftChildrenInRight;
                }
                break;
              }
              farLeftParentNode = farLeftNode;
              farLeftNode = farLeftNode.left;
            }
            farLeftNode.left = currNode.left;
            farLeftNode.right = currNode.right;
            this.root = null;
            this.root = farLeftNode;
            break;
          } else {
            this.root = null;
          }
          break;
        }
        if (prevNodePosition === "right") {
          // delete a leaf node
          if (!currNode.left && !currNode.right) {
            prevNode.right = null;
            break;
          }

          // delete a node with one children
          if (!currNode.left && currNode.right) {
            prevNode.right = currNode.right;
            break;
          } else if (currNode.left && !currNode.right) {
            prevNode.right = currNode.left;
            break;
          }

          // delete a node with two children
          if (currNode.left && currNode.right) {
            let farLeftParentNode;
            let farLeftChildrenInRight;
            let farLeftNode = currNode.right;
            // If this doesn't have any value in left
            if (!farLeftNode.left) {
              // If this node has a value on the right.
              if (farLeftNode.right) {
                farLeftNode.left = currNode.left;
                prevNode.right = farLeftNode;
                break;
              }
              // If this node does not literally have children

              farLeftNode.left = currNode.left;
              prevNode.right = farLeftNode;
              break;
            }
            while (farLeftNode) {
              if (!farLeftNode.left) {
                farLeftParentNode.left = null;
                if (farLeftNode.right) {
                  farLeftChildrenInRight = farLeftNode.right;
                  farLeftParentNode.left = farLeftChildrenInRight;
                }
                break;
              }
              farLeftParentNode = farLeftNode;
              farLeftNode = farLeftNode.left;
            }
            prevNode.right = farLeftNode;
            farLeftNode.left = currNode.left;
            farLeftNode.right = currNode.right;
            break;
          }
        } else if (prevNodePosition === "left") {
          // delete a leaf node
          if (!currNode.left && !currNode.right) {
            prevNode.left = null;
            break;
          }

          // delete a node with one children
          if (!currNode.left && currNode.right) {
            prevNode.left = currNode.right;
            break;
          } else if (currNode.left && !currNode.right) {
            prevNode.left = currNode.left;
            break;
          }

          // delete a node with two children
          if (currNode.left && currNode.right) {
            let farLeftParentNode;
            let farLeftChildrenInRight;
            let farLeftNode = currNode.right;
            // If this doesn't have any value in left
            if (!farLeftNode.left) {
              // If this node has a value on the right.
              if (farLeftNode.right) {
                farLeftNode.left = currNode.left;
                prevNode.left = farLeftNode;
                break;
              }
              // If this node does not literally have anyvalue
              farLeftNode.left = currNode.left;
              prevNode.left = farLeftNode;
              break;
            }
            while (farLeftNode) {
              if (!farLeftNode.left) {
                farLeftParentNode.left = null;
                if (farLeftNode.right) {
                  farLeftChildrenInRight = farLeftNode.right;
                  farLeftParentNode.left = farLeftChildrenInRight;
                }
                break;
              }
              farLeftParentNode = farLeftNode;
              farLeftNode = farLeftNode.left;
            }
            prevNode.left = farLeftNode;
            farLeftNode.left = currNode.left;
            farLeftNode.right = currNode.right;
            break;
          }
        }
        break;
      }
      if (value > currNode.value) {
        prevNode = currNode;
        prevNodePosition = "right";
        const rightNode = currNode.right;
        currNode = rightNode;
      } else if (value < currNode.value) {
        prevNode = currNode;
        prevNodePosition = "left";
        const leftNode = currNode.left;
        currNode = leftNode;
      }
    }
  }

  find(value) {
    if (!value) {
      return null;
    }
    if (value === this.root.value) {
      return this.root;
    }

    let currNode = this.root;
    while (currNode) {
      if (value < currNode.value) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
      if (!currNode) {
        return "Doesn't exist";
      }
      if (currNode.value === value) {
        return currNode;
      }
    }
  }

  // BFS
  levelOrderTransversal() {
    if (this.root === null) {
      return null;
    }
    let currNode = this.root;
    let queue = [];
    let queueValues = [];
    queue.push(currNode);
    while (queue !== null || !queue.length) {
      if (!currNode) {
        return queueValues;
      }
      if (currNode.left) {
        queue.push(currNode.left);
      }
      if (currNode.right) {
        queue.push(currNode.right);
      }
      queueValues.push(queue[0].value);
      queue.shift();
      currNode = queue[0];
    }
    return queueValues;
  }

  // DFS
  preOrder(node = this.root, arr = []) {
    if (!node) return;
    arr.push(node.value);
    if (node.left) {
      this.preOrder(node.left, arr);
    }
    if (node.right) {
      this.preOrder(node.right, arr);
    }

    return arr;
  }

  inOrder(node = this.root, arr = []) {
    if (!node) return;
    if (node.left) {
      this.preOrder(node.left, arr);
    }
    arr.push(node.value);
    if (node.right) {
      this.preOrder(node.right, arr);
    }

    return arr;
  }

  postOrder(node = this.root, arr = []) {
    if (!node) return;
    if (node.left) {
      this.preOrder(node.left, arr);
    }
    if (node.right) {
      this.preOrder(node.right, arr);
    }
    arr.push(node.value);

    return arr;
  }

  existThenHeight(value) {
    //Before we proceed let us check if this value exist or not.
    let node = this.find(value);

    if (node !== "Doesn't exist") {
      const height = this.height(node);
      return height;
    } else {
      return "This node doesn't exist in the tree.";
    }
  }

  existThenDepth(value) {
    //Before we proceed let us check if this value exist or not.
    let node = this.find(value);

    if (node !== "Doesn't exist") {
      const depth = this.depth(node);
      return depth;
    } else {
      return "This node doesn't exist in the tree.";
    }
  }

  height(node) {
    if (!node) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node) {
    let currNode = this.root;
    let depthValue = 0;
    if (currNode === node) {
      return 0;
    }

    while (currNode.value !== node.value) {
      if (node.value < currNode.value) {
        currNode = currNode.left;
        depthValue++;
      }
      if (node.value > currNode.value) {
        currNode = currNode.right;
        depthValue++;
      }

      if (currNode === node) {
        return depthValue;
      }
    }
  }

  isBalanced(node = this.root) {
    let sumOfSubTrees;

    const leftHeightSubTree = this.height(node.left);
    const rightHeightSubTree = this.height(node.right);
    if (leftHeightSubTree > rightHeightSubTree) {
      sumOfSubTrees = leftHeightSubTree - rightHeightSubTree;
    } else {
      sumOfSubTrees = rightHeightSubTree - leftHeightSubTree;
    }

    return sumOfSubTrees <= 1;
  }

  rebalance() {
    const arr = this.levelOrderTransversal();
    this.prepareTree(arr);
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 2];

const bst = new Tree();
bst.prepareTree(arr);
console.log(bst.isBalanced());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.inOrder());
console.log(bst.insert(52));
console.log(bst.insert(53));
console.log(bst.insert(65));
console.log(bst.insert(41));
console.log(bst.insert(32));
console.log(bst.insert(25));
console.log(bst.insert(38));
console.log(bst.isBalanced());
bst.prettyPrint();
console.log(bst.rebalance());
console.log(bst.isBalanced());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.inOrder());
bst.prettyPrint();
