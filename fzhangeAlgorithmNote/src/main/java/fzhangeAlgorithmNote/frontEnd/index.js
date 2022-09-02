/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let leftIdx = 0;
    let rightIdx = 0;
    let needMap = {};
    let windowMap = {};
    let valid = 0;
    let len = Number.MAX_VALUE;
    let start = 0;
    for (let i=0;i<t.length;i++){
        needMap[t[i]] = 1;
    }

    while (rightIdx < s.length){
        let nowChar = s[rightIdx];
        if(!!needMap[nowChar]){
            if(!!windowMap[nowChar]) windowMap[nowChar]++;
            else {
                valid++;
                windowMap[nowChar] = 1;
            }
        }
        rightIdx++;

        while (valid == Object.keys(needMap).length){
            let leftChar = s[leftIdx];
            if(rightIdx - leftIdx < len){
                len = rightIdx - leftIdx;
                start = leftIdx;
            }
            leftIdx++;
            if(!!needMap[leftChar]){
                if(needMap[leftChar] == windowMap[leftChar]){
                    valid--;
                }
                windowMap[leftChar]--;
            }
        }
        return len == Number.MAX_VALUE ? "" : s.slice(start,start+len);
    }
};
