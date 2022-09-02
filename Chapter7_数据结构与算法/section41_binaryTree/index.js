/**
 * n层满二叉树的节点数 2^n - 1
 */
/**
 * 层次遍历 利用了堆栈的特性 一般使用while  BFS 
 * 迭代的话就是递归  注意边界条件  DFS depth first search 
 */
let tree = {
    name: "1",
    left: {
        name: "2",
        left: {
            name: "3"
        },
        right: {
            name: "4"
        }
    },
    right: {
        name: "5"
    }
}

/**
 * 先序 根左右
 * descendant D 根
 * left L 左
 * right R 右
 */
function getListWithDLR(tree) {
    let arr = [];
    arr = arr.push(tree.name);
    if (tree.left) arr = [...arr, ...getListWithDLR(tree.left)];
    if (tree.right) arr = [...arr, ...getListWithDLR(tree.right)];
    return arr;
}
// console.log('先序 getListWithDLR(tree): ', getListWithDLR(tree)); //12345

/**
 *  @param {*} tree 
 *  首先根入栈
 *  根出栈，将根节点的值放到结果数组中
 *  遍历左子树，右子树，因为栈是先入后出，所以先右子树入栈，然后左子树入栈。
 */
function iterationDLR(tree) {
    let nodeArr = [tree];
    let arr = [];
    while (nodeArr.length) {
        let node = nodeArr.pop();
        arr.push(node.name);
        if (node.right) nodeArr.push(node.right);
        if (node.left) nodeArr.push(node.left);
    }
    return arr;
}
console.log('层次先序 iterationDLR(tree): ', iterationDLR(tree)); //12345

/**
 * 中序 左根右
 * descendant D 根
 * left L 左
 * right R 右
 */
function getListWithLDR(tree) {
    let arr = [];
    if (tree.left) arr = [...arr, ...getListWithLDR(tree.left)];
    arr.push(tree.name);
    if (tree.right) arr = [...arr, ...getListWithLDR(tree.right)];
    return arr;
}
console.log('中序 getListWithLDR(tree): ', getListWithLDR(tree)); //32415


function iterationLDR(tree) {
    let nodeArr = [tree];
    let arr = [];
    while (nodeArr.length) {
        let node = nodeArr.pop();
        if (!node.left && !node.right) {
            nodeArr.push(node);
            break;
        } else {
            if (node.right) nodeArr.push(node.right);
            nodeArr.push(node);
            if (node.left) nodeArr.push(node.left);
        }
    }

    nodeArr.reverse().forEach((item) => {
        arr.push(item.name)
    })
    return arr;
}
console.log('层次中序 iterationLDR(tree): ', iterationLDR(tree)); //32415

/**
 * 后序 左右根
 * descendant D 根
 * left L 左
 * right R 右
 */
function getListWithLRD(tree) {
    let arr = [];
    if (tree.left) arr = [...arr, ...getListWithLRD(tree.left)];
    if (tree.right) arr = [...arr, ...getListWithLRD(tree.right)];
    arr.push(tree.name);
    return arr;
}
console.log('后序 getListWithLRD(tree): ', getListWithLRD(tree)); //34251

function iterationLRD(tree) {
    let arr = [];
    let nodeArr = [tree];
    while (nodeArr.length) {
        let node = nodeArr.pop();
        if (!node.left && !node.right) {
            nodeArr.push(node);
            break;
        } else {
            nodeArr.push(node)
            if (node.right) nodeArr.push(node.right)
            if (node.left) nodeArr.push(node.left)
        }
    }
    nodeArr.reverse().forEach((item) => {
        arr.push(item.name)
    })
    return arr;
}
console.log('层次后序 interationLRD(tree): ', iterationLRD(tree)); //34251

/**
 * 层次遍历 
 * **层次遍历一般用while 深度遍历一般用递归**
 * Breadth First Search  BFS 广度优先
 */
// 首先申请一个新的队列，记为queue；
// 将头结点head压入queue中；
// 每次从queue中出队，记为node，然后打印node值，如果node左孩子不为空，则将左孩子入队；如果node的右孩子不为空，则将右孩子入队；
// 重复步骤3，直到queue为空。
function getListWithRank(tree) {
    let myArr = [];
    let arr = [];
    arr.push(tree);
    while (arr.length) {
        let length = arr.length;
        let tmp = [];
        while (length--) {
            let ele = arr.shift();
            tmp.push(ele.name);

            if (ele.left) arr.push(ele.left);
            if (ele.right) arr.push(ele.right);
        }
        myArr.push(tmp);
    }
    return myArr;
}

console.log('层次遍历 getListWithLRD(tree): ', getListWithRank(tree)); //12534


/**
 * 二叉树的最大深度问题
 */
function maxDepth(tree) {
    if (!tree) return 0;
    return 1 + Math.max(maxDepth(tree.left), maxDepth(tree.right));
}
console.log('maxDepth: ', maxDepth(tree));


// 节点属于哪一层级
function whichLayer(tree, level = 0) {
    if (!tree) return;
    console.log(`tree.name: ${tree.name}  on ${level} level`);
    whichLayer(tree.left, level + 1);
    whichLayer(tree.right, level + 1);
}
console.log('whichLayer(tree): ', whichLayer(tree));

// 如何打印出每个节点的左右子树各有多少节点？
function countOfNode(tree) {
    if (!tree) return 0;
    const leftNodeCount = countOfNode(tree.left);
    const rightNodeCount = countOfNode(tree.right);

    console.log(`当前节点名：${tree.name}; 左节点数量 ${leftNodeCount}; 右节点数量 ${rightNodeCount}`);

    return leftNodeCount + rightNodeCount + 1;
}
console.log('countOfNode(tree): ', countOfNode(tree));


// 543. 二叉树的直径
var diameterOfBinaryTree = function (root) {
    let maxDiameter = Number.MIN_SAFE_INTEGER;
    const maxDepth = function (root) {
        if (!root) return 0;
        const maxLeftDepth = maxDepth(root.left);
        const maxRightDepth = maxDepth(root.right);
        return 1 + Math.max(maxLeftDepth, maxRightDepth);
    }

    function fun(root) {
        if (!root) return 0;
        const leftDepth = maxDepth(root.left);
        const rightDepth = maxDepth(root.right);
        maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
        fun(root.left);
        fun(root.right);
    }
    fun(root);
    return maxDiameter;
};

console.log('diameterOfBinaryTree(root): ', diameterOfBinaryTree(tree));


/**
 * @param {TreeNode} root
 * @return {number}
 * 111. 二叉树的最小深度  https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
 */
var minDepth = function (root) {
    let depthList = [];
    function backTrack(depth, node) {
        if (node.left) {
            backTrack(depth + 1, node.left);
        }
        if (node.right) {
            backTrack(depth + 1, node.right);
        }
        if (!node.left && !node.right) {
            depthList.push(depth);
        }
    }

    if (!root) return 0;
    else {
        backTrack(1, root);
        return Math.min(...depthList);
    }
};

/**
 * 树的serialize&deSerialize
 */
class Tree {
    constructor(tree) {
        this.tree = tree;
    }
    serialize() {
        function auxFun(tree) {
            let innerArr = [];
            if (!tree) return [null];
            innerArr.push(tree.name);
            innerArr = innerArr.concat(auxFun(tree.left));
            innerArr = innerArr.concat(auxFun(tree.right));
        }
        return auxFun(this.tree);
    }
    getSerializeData() {
        return this.serialize();
    }
    deSerialize() {
        const serializeData = getSerializeData();
        function auxFun(serializeData) {
            let nodeValue = serializeData.shift();
            if (nodeValue == null) return null;
            let node = {
                name: nodeValue
            };
            node.left = auxFun(serializeData);
            node.right = auxFun(serializeData);
            return node;
        }
        return auxFun(serializeData);
    }
}