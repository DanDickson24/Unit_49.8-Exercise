class Tree {
  constructor(root = null) {
    this.root = root;
  }

  sumValues() {
    if (!this.root) {
      return 0;
    }

    function sum(node) {
      let total = node.val;

      for (const child of node.children) {
        total += sum(child);
      }

      return total;
    }

    return sum(this.root);
  }


  countEvens() {
    if (!this.root) {
      return 0;
    }

    function countEvenNodes(node) {
      let count = node.val % 2 === 0 ? 1 : 0;

      for (const child of node.children) {
        count += countEvenNodes(child);
      }

      return count;
    }

    return countEvenNodes(this.root);
  }


  numGreater(lowerBound) {
    if (!this.root) {
      return 0;
    }

    function countNodesGreaterThan(node, lowerBound) {
      let count = node.val > lowerBound ? 1 : 0;

      for (const child of node.children) {
        count += countNodesGreaterThan(child, lowerBound);
      }

      return count;
    }

    return countNodesGreaterThan(this.root, lowerBound);
  }
}

module.exports = { Tree, TreeNode };
