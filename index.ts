function strToInt(str: string): number {
    let num:number = parseInt(str);
    console.log('num: ', num);
    const MAX_NUM:number = Math.pow(2,31) - 1;
    const MIN_NUM:number = Math.pow(-2,31); 
    if(isNaN(num)) {
        return 0;
    }else{
        if(num > MAX_NUM) return MAX_NUM;
        if(num < MIN_NUM) return MIN_NUM;
    }
    return num;
};

console.log('strToInt("-91283472332"): ', strToInt("-91283472332"));
