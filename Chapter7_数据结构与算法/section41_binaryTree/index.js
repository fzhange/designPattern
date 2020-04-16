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

/**
 * 后序 左右根
 * descendant D 根
 * left L 左
 * right R 右
 */
function getListWithLRD(tree){
    let arr = [];
    if(tree.left) arr = [...arr,...getListWithLDR(tree.left)];
    if(tree.right) arr = [...arr,...getListWithLDR(tree.right)];
    arr.push(tree.name);
    return arr;
}
console.log('后序 getListWithLRD(tree): ', getListWithLRD(tree)); //34251


/**
 * 层次遍历
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
        if(ele.left)    arr.push(ele.left)
        if(ele.right)   arr.push(ele.right);
    }
    return myArr;
}

console.log('层次遍历 getListWithLRD(tree): ', getListWithRank(tree)); //12534






