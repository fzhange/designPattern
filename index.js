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
function fun(root){
    let count = 0;
    if(!root) return count;
    if(root.left) {
        count +=  fun(root.left) + 1;
    }
    if(root.right){
        count +=  fun(root.right) + 1;
    }
    return count;
}

console.log('fun(tree): ', fun(tree));