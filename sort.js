class CatClassify {

    constructor() {
        this.classify = new Map();
    }

    addCat(pGender, pPetName) {
        var interArr = this.classify.get(pGender);
        if (interArr === undefined) {
            interArr = new Array()
            this.classify.set(pGender, interArr);
        }
        interArr.push(pPetName);
    }

    sort() {
        this.classify.forEach((v, k) => {
            StringSort.sortMSDInner(v, 0, v.length - 1, 256);
        })
        return this.classify;
    }

    tostr() {
		var result = '';
        this.classify.forEach((v, k) => {
			result += k + '\r\n';
            v.forEach(item => {
				result += '\t' + item + '\r\n';
            })
        })
		return result;
    }
}

const parse = function(obj) {
    const catClassify = new CatClassify();
    for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        //element {k: v}
        // console.log(element)
        // console.log("\n")
        
        if (element['pets']) {
            element['pets'].forEach(item => {
                if (item['type'] === 'Cat') {
                    catClassify.addCat(element['gender'], item['name']);
                }
            })
        }
    }
    catClassify.sort()
    return catClassify.tostr();
}


const StringSort = (function() {
    const ALGORITHM_SWITCH_THRESHOLD = 15
    const sortMSD = function(pTar, pCSet) {
        let len = pTar.length;
        let assist = new Array();
        sortMSDInner(pTar, 0, len - 1, 0, assist, pCSet);
    }
    const sortMSDInner = function(pTar, pStart, pEnd, pCset) {
        let len = pEnd - pStart + 1;
        let assist = new Array();
        sortMSDIInner(pTar, pStart, pEnd, pStart, assist, pCset);
    }

    const sortMSDIInner = function(pTar, pLow, pHigh, pPos, pAssist, pCset) {
        if (pHigh <= pLow + ALGORITHM_SWITCH_THRESHOLD) {
            insertionSort(pTar, pLow, pHigh, pPos);
			return;
        }
        const counter = new Array();
        for(let i = pLow; i <= pHigh; i++)
			counter[charAt(pTar[i], pPos) + 2]++;
		for(let i = 0; i < pCset + 1; i ++)
			counter[i + 1]+=counter[i];
		for(let i = pLow; i <= pHigh; i++)
			pAssist[counter[charAt(pTar[i], pPos) + 1]++] = pTar[i];
		for(let i = pLow; i <= pHigh; i++)
			pTar[i] = pAssist[i - pLow];
		for(let i = 0; i < pCset; i++) 
			sortMSD(pTar, pLow + counter[i], pLow + counter[i + 1] - 1, pPos + 1, pAssist, pCset);
    }

    const insertionSort = function(pTar, pLow, pHigh, pPos) {
        for(let i = pLow; i<=pHigh; i++) {
			for(let j = i; j > pLow && less(pTar[j], pTar[j - 1], pPos); j--) 
				exch(pTar, j, j - 1);
		}
    }

    const exch = function(pTar, p1, p2) {
        let tmp = pTar[p1];
        pTar[p1] = pTar[p2];
		pTar[p2] = tmp;
    }

    const less = function(p1, p2, pPos) {
        return p1.substr(pPos).localeCompare(p2.substr(pPos)) < 0;
    }

    const charAt = function(pStr, pPos) {
        return pStr === null ? -1 : (pPos < pStr.length ? pStr.charAt(pPos) : -1);
    }
    

    return {
        ALGORITHM_SWITCH_THRESHOLD,
        sortMSD,
        sortMSDInner,
    }
}())