const _ = require('lodash');

// post class
function Post(title) {
    this.title = title;
    return this;
}

function Snode(info) {
    this.id = info.id;
    this.name = info.name;
    this.bandw = info.bandw;
    this.rateData = info.rateData;
}

Snode.prototype.rate = function (p) {
    return this.rateData[p.title];
}

/**
 * @desc generate combination
 * @param {*} posts posts array
 * @param {*} snodes  super nodes
 * @return 
 * @example [
 *      [1, 3, 2, 1, 3]
 *  ]
 */ 
function _allCombinations (posts, snodes) {
    let num = snodes.length;
    let result = [];
    for(let i = 1; i <= num; i++) {
        result.push([i]);
    }
    let i = 1;
    while(i < posts.length) {
        let tmp = [];
        for(let arra of result) {
            for(let j = 1; j <= num; j++) {
                let t = [].concat(arra);
                t.push(j);
                tmp.push(t);
                if(_calValue(t, posts, snodes) > 0) {
                    tmp.push(t);
                }
            }
        }
        //
        result = tmp;
        i++;
    }
    return result;
}

/**
 * @desc calculate one posts combination value
 * @param {*} indexArray 
 * @param {*} posts 
 */
function _calValue (indexArray, posts, snodes) {
    let info = {};
    let bs = {};
    for(let n of snodes) {
        info[n.name] = [];
        bs[n.name] = n.bandw;
    }
    for(let index in indexArray) {
        let ele = indexArray[index];
        let p = posts[index];
        let n = snodes[ele-1];
        info[n.name].push(n.rate(p));
    }
    let result = 0;
    for(let key in info) {
        let t = info[key];
        let _sum = _.sum(t);
        if(_sum > bs[key]) return 0;
        result += _sum;
    }
    return result;
}

function _findMax(combinations, posts, snodes) {
    let max = 0;
    let t = [];
    for(let com of combinations) {
        let _max = _calValue(com, posts, snodes);
        if(_max > max) {
            // console.log('max: ', _max);
            max = _max;
            t = com;
        }
    }

    for (let i = 0; i < t.length; i++) {
        const post = posts[i];
        const snode = snodes[t[i] - 1];
        console.log('Publish', post.title, 'by super node', snode.name, 'bandwidth', snode.bandw, 'rating', snode.rateData[post.title], );
    }
    console.log('The total rating of posts =', max);
    // console.log("Posts snode index: ", t);
    return max;
}

function bestComb (posts, snodes) {
    console.log('\n');
    // const postNames = posts.map( post => post.title);
    let str = '[ ';
    for (const post of posts) {
        str += post.title;
        str += ', ';
    }
    str = str.slice(0, -2);
    str += ' ]';
    console.log('Posts to assign:', str);

    let num = _allCombinations(posts, snodes);
    let res = _findMax(num, posts, snodes);
    return res;
}

module.exports = {
    Post: Post,
    Snode: Snode,
    bestComb: bestComb
};


/**
 * REFS:
 * 1. http://www.wutianqi.com/?p=539
 * 2. http://www.or.deis.unibo.it/knapsack.html
 * 3. https://www.sciencedirect.com/science/article/pii/S030505480700175X
 * 4. https://link.springer.com/book/10.1007/978-3-540-24777-7
 * 5. https://github.com/thedanschmidt/multiknapsack.js
 */
