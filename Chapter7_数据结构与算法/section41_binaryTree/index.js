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
    arr = arr.concat([tree.name])
    if (tree.left) arr = arr.concat(getListWithDLR(tree.left))
    if (tree.right) arr = arr.concat(getListWithDLR(tree.right))
    return arr;
}
console.log('先序 getListWithDLR(tree): ', getListWithDLR(tree)); //12345

/**
 *  @param {*} tree 
 *  首先根入栈
 *  根出栈，将根节点的值放到结果数组中
 *  遍历左子树，右子树，因为栈是先入后出，所以先右子树入栈，然后左子树入栈。
 */
function iterationDLR(tree){
    let nodeArr = [tree];
    let arr = [];
    while(nodeArr.length){
        let node = nodeArr.pop();
        arr.push(node.name);
        if(node.right) nodeArr.push(node.right);
        if(node.left) nodeArr.push(node.left);
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
function getListWithLDR(tree){
    let arr = [];
    if(tree.left) arr = [...arr,...getListWithLDR(tree.left)];
    arr.push(tree.name);
    if(tree.right) arr = [...arr,...getListWithLDR(tree.right)];
    return arr;
}
console.log('中序 getListWithLDR(tree): ', getListWithLDR(tree)); //32415


function iterationLDR(tree){
    let nodeArr = [tree];
    let arr = [];
    while(nodeArr.length){
        let node = nodeArr.pop();
        if(!node.left && !node.right){
            nodeArr.push(node);
            break;
        }else{
            if(node.right) nodeArr.push(node.right);
            nodeArr.push(node);
            if(node.left) nodeArr.push(node.left);
        }
    }

    nodeArr.reverse().forEach((item)=>{
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
function getListWithLRD(tree){
    let arr = [];
    if(tree.left) arr = [...arr,...getListWithLRD(tree.left)];
    if(tree.right) arr = [...arr,...getListWithLRD(tree.right)];
    arr.push(tree.name);
    return arr;
}
console.log('后序 getListWithLRD(tree): ', getListWithLRD(tree)); //34251

function iterationLRD(tree){
    let arr = [];
    let nodeArr = [tree];
    while(nodeArr.length){
        let node = nodeArr.pop();
        if(!node.left && !node.right){
            nodeArr.push(node);
            break;
        }else{
            nodeArr.push(node)
            if(node.right) nodeArr.push(node.right)
            if(node.left) nodeArr.push(node.left)
        }
    }
    nodeArr.reverse().forEach((item)=>{
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
function getListWithRank(tree,first=true){
    let myArr = [];
    let arr = [];
    arr.push(tree);
    while(arr.length){
        let ele  =  arr.shift();
        myArr.push(ele.name);
        if(ele.left)    arr.push(ele.left);
        if(ele.right)   arr.push(ele.right);
    }
    return myArr;
}

console.log('层次遍历 getListWithLRD(tree): ', getListWithRank(tree)); //12534







function maxDepth(tree){
    if(!tree) return 0;
    return 1 + Math.max(maxDepth(tree.left),maxDepth(tree.right));
}
console.log('maxDepth: ', maxDepth(tree));