// Insertion
// Pretty Print
// Search
// Find Min
// Find Max
// Remove

function BinarySearchTree() {
  this.root = null;
};

// Find Min
BinarySearchTree.prototype.findMin = function(currentPosition) {
  let currentNode = currentPosition || this.root;
  if (!currentNode.left) {
    return currentNode;
  } else {
    return this.findMin(currentNode.left);
  };
};

// Find Max
BinarySearchTree.prototype.findMax = function(currentPosition) {
  let currentNode = currentPosition || this.root;
  if (!currentNode.right) {
    return currentNode;
  } else {
    return this.findMax(currentNode.right);
  };
};

// Find a value
BinarySearchTree.prototype.findValue = function(val, currentPosition = this.root) {
  let currentNode = currentPosition;
  if (!currentNode) {
    return false;
  } else if (currentNode.val === val) {
    return currentNode;
  } else if (currentNode.val > val) {
    return this.findValue(val, currentNode.left);
  } else {
    return this.findValue(val, currentNode.right);
  };
};

// Find parent node
BinarySearchTree.prototype.findParent = function(child, currentPosition) {
  let currentNode = currentPosition || this.root;
  if (currentNode.val > child) {
    if (currentNode.left) {
      if (currentNode.left.val === child) {
        return currentNode;
      } else {
        return this.findParent(child, currentNode.left);
      }
    }
  }
  if (currentNode.val < child) {
    if (currentNode.right) {
      if (currentNode.right.val === child) {
        return currentNode;
      } else {
        return this.findParent(child, currentNode.right);
      };
    };
  };
  return null;
};

// Remove a node
BinarySearchTree.prototype.remove = function(val) {
  let nodeToRemove = this.findValue(val);
  let parentNode = this.findParent(nodeToRemove.val);
  console.log("nodeToRemove:", nodeToRemove);
  console.log("parentNode:", parentNode);
  if (!nodeToRemove) {
    return false;
  } else if (parentNode.left) {
    console.log("parentNode.left!");
    if (parentNode.left === nodeToRemove && nodeToRemove.left && nodeToRemove.right) {
      console.log("In next block");
      let newValue = this.findMin(nodeToRemove.right);
      let parentOfNewValue = this.findParent(newValue.val);
      parentNode.left = newValue;
      parentOfNewValue.left = null;
      parentNode.left.right = parentOfNewValue;
      parentNode.left.left = nodeToRemove.left;
    } else if (parentNode.left === nodeToRemove && !nodeToRemove.left && !nodeToRemove.right) {
      parentNode.left = null;
    } else if (parentNode.left === nodeToRemove && nodeToRemove.left) {
      parentNode.left = nodeToRemove.left;
    } else if (parentNode.left === nodeToRemove && nodeToRemove.right) {
      parentNode.left = nodeToRemove.right;
    }
  } else if (parentNode.right) {
    // console.log("parentNode.right!");
    // if (parentNode.right === nodeToRemove && nodeToRemove.left && nodeToRemove.right) {
    //   let newValue = this.findMin(nodeToRemove.right);
    //   let parentOfNewValue = this.findParent(newValue.val);
    //   console.log("newValue:", newValue);
    //   console.log("parentOfNewValue:", parentOfNewValue);
    //   parentNode.left = newValue;
    //   parentOfNewValue.left = null;
    //   parentNode.left.right = parentOfNewValue;
    //   parentNode.left.left = nodeToRemove.left;
    if (nodeToRemove.left && nodeToRemove.right) {
      parentNode.right = this.findMin(nodeToRemove.right);
    } else if (parentNode.right === nodeToRemove && !nodeToRemove.left && !nodeToRemove.right) {
      parentNode.right = null;
    } else if (parentNode.right === nodeToRemove && nodeToRemove.left) {
      parentNode.right = nodeToRemove.left;
    } else if (parentNode.right === nodeToRemove && nodeToRemove.right) {
      parentNode.right = nodeToRemove.right;
    }
  }
  return this;
};

// Insert
BinarySearchTree.prototype.insert = function(val) {
  if (!this.root) {
    this.root = new Node(val);
  } else {
    let currentNode = this.root;
    let traversing = true;
      while (traversing) {
      if (val < currentNode.val) {
        if (!currentNode.left) {
          currentNode.left = new Node(val);
          traversing = false;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = new Node(val);
          traversing = false;
        } else {
          currentNode = currentNode.right;
        };
      };
    };
  };
  return this;
};

function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}


let newTree = new BinarySearchTree();

newTree.insert(25).insert(100).insert(50).insert(10).insert(7).insert(8).insert(4).insert(75).insert(65).insert(3).insert(5).insert(99);
// console.log(newTree.findMin());
// console.log(newTree.findMax());
// console.log(newTree.findValue(3));
console.log(newTree.remove(75));
// console.log(newTree.findParent(newTree.findValue(10).val));

console.log(JSON.stringify(newTree,null,2));
