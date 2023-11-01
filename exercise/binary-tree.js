class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  minDepth() {
    function minDepthHelper(node) {
      if (!node) {
        return 0;
      }
      if (!node.left && !node.right) {
        return 1;
      }
      if (!node.left) {
        return 1 + minDepthHelper(node.right);
      }
      if (!node.right) {
        return 1 + minDepthHelper(node.left);
      }
      return 1 + Math.min(minDepthHelper(node.left), minDepthHelper(node.right));
    }
    return minDepthHelper(this.root);
  }

  maxDepth() {
    function maxDepthHelper(node) {
      if (!node) {
        return 0;
      }
      const leftDepth = maxDepthHelper(node.left);
      const rightDepth = maxDepthHelper(node.right);
      return 1 + Math.max(leftDepth, rightDepth);
    }
    return maxDepthHelper(this.root);
  }

  maxSum() {
    function maxSumHelper(node) {
      if (!node) {
        return { singlePath: 0, maxPath: 0 };
      }
      const left = maxSumHelper(node.left);
      const right = maxSumHelper(node.right);
      const singlePath = Math.max(left.singlePath, right.singlePath, 0) + node.val;
      const maxPath = Math.max(
        left.maxPath,
        right.maxPath,
        left.singlePath + right.singlePath + node.val
      );
      return { singlePath, maxPath };
    }
    return maxSumHelper(this.root).maxPath;
  }

  nextLarger(lowerBound) {
    function findNextLarger(node, lowerBound, closestLarger = null) {
      if (!node) {
        return closestLarger;
      }
      if (node.val > lowerBound) {
        if (!closestLarger || node.val < closestLarger) {
          closestLarger = node.val;
        }
      }
      if (node.val <= lowerBound || node.val === closestLarger) {
        closestLarger = findNextLarger(node.right, lowerBound, closestLarger);
      }
      return findNextLarger(node.left, lowerBound, closestLarger);
    }
    return findNextLarger(this.root, lowerBound);
  }
}

  areCousins(node1, node2) {
    if (!this.root) {
      return false;
    }

    const queue = [];
    queue.push({ node: this.root, parent: null, level: 1 });

    let level1Parent = null; 
    let level2Parent = null; 

    while (queue.length > 0) {
      const { node, parent, level } = queue.shift();

      if (node === node1) {
        level1Parent = parent;
      } else if (node === node2) {
        level2Parent = parent;
      }

      if (level1Parent && level2Parent) {
        return level1Parent !== level2Parent && level1Parent === parent && level2Parent === parent;
      }

      if (node.left) {
        queue.push({ node: node.left, parent: node, level: level + 1 });
      }
      if (node.right) {
        queue.push({ node: node.right, parent: node, level: level + 1 });
      }
    }
    return false;
  }


  lowestCommonAncestor(node1, node2) {
    if (!this.root || !node1 || !node2) {
      return null;
    }

    function findLCA(node, p, q) {
      if (!node) {
        return null;
      }

      if (node === p || node === q) {
        return node;
      }

      const leftLCA = findLCA(node.left, p, q);
      const rightLCA = findLCA(node.right, p, q);

      if (leftLCA && rightLCA) {
        return node;
      }

      return leftLCA || rightLCA;
    }

    return findLCA(this.root, node1, node2);
  }

  getElementById(id) {
    function getElementByIdHelper(node, targetId) {
      if (!node) {
        return null;
      }

      if (node.val === targetId) {
        return node;
      }
      const leftResult = getElementByIdHelper(node.left, targetId);
      const rightResult = getElementByIdHelper(node.right, targetId);

      return leftResult || rightResult;
    }

    return getElementByIdHelper(this.root, id);
  }

  getElementsByTagName(tagName) {
    const results = [];

    function getElementsByTagNameHelper(node, targetTagName) {
      if (!node) {
        return;
      }

      if (node.val === targetTagName) {
        results.push(node);
      }

      getElementsByTagNameHelper(node.left, targetTagName);
      getElementsByTagNameHelper(node.right, targetTagName);
    }

    getElementsByTagNameHelper(this.root, tagName);
    return results;
  }

  getElementsByClassName(className) {
    const results = [];

    function getElementsByClassNameHelper(node, targetClassName) {
      if (!node) {
        return;
      }

      if (node.val === targetClassName) {
        results.push(node);
      }

      getElementsByClassNameHelper(node.left, targetClassName);
      getElementsByClassNameHelper(node.right, targetClassName);
    }

    getElementsByClassNameHelper(this.root, className);
    return results;
  }



module.exports = { BinaryTree, BinaryTreeNode };
