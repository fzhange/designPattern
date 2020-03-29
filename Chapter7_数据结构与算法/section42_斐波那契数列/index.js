/**
 * 0 1 1 2 3 5 8 13
 * 0 1 2 3 4 5 6 7
 *  */ 
/**
 * 设idx为每一个元素的下标 则每一个元素的值为f(idx)
 * 
 * 根据题意
 * f(0) = 0;
 * f(1) = 1;
 * f(2) = 1 = f(0)+f(1);
 * f(3) = 2 = f(1)+f(2);
 * f(idx) = f(idx-2) + f(idx-1);
 */

/**
 * 算法一
 * Forward[正向] fibo
 */
 function fibo(idx){
    let arr = [0,1];
    if(idx<2) return arr[idx];
    for(i=2;i<=idx;i++){
        arr[i] = arr[i-2] + arr[i-1];
    }
    return arr[idx];
 }

 console.log(' fibo(6): ',  fibo(6)); //8

 /**
  * 算法二
  * recursion[递归] reverse[反向] fibo 
  * 递归的思想一般是一种反向逻辑;
  */

 function recursionFibo(idx){
    let value = 0;
    if(idx==0) return 0;
    if(idx==1) return 1;
    value = value + recursionFibo(idx-1) + recursionFibo(idx-2);
    return value
 }

 console.log('recursionFibo(6): ', recursionFibo(6));




