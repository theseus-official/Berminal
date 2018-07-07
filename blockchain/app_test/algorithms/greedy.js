/*
    三个超级节点, 每个节点带宽分别为: n1-10, n2-15, n3-20
    五篇文章: p1, p2, p3, p4, p5
*/ 
const _ = require('lodash');

// post class
function Post(title) {
    this.title = title;
    return this;
}

function Snode(info) {
    this.name = info.name;
    this.bandw = info.bandw;
    this.rateData = info.rateData;
}

Snode.prototype.rate = function (p) {
    return this.rateData[p.title];
}

/**
 * @desc 生成组合
 * @param {*} posts 需要组合的文章数组
 * @param {*} snodes  超级节点
 * @return 文章所有组合的数组, 每一个组合用文章摆放节点索引数组表示
 * @example [
 *      [1, 3, 2, 1, 3]     每个数字代表该文章分发到超级节点的索引(从 1 开始): p1分到超级节点1, p2分到超级节点3, p3分到超级节点2
 *  ]
 */ 
function _allCombinations (posts, snodes) {
    // 第一个元素的放置的 num 种情况
    let num = snodes.length;
    let result = [];
    for(let i = 1; i <= num; i++) {
        result.push([i]);
    }
    // 从第二个元素开始, 每个元素与之前所有摆放组合会产生三种新的组合
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
 * @desc 计算一种文章组合的总值, 如果该组合超出某个超级节点带宽上限即无效, 返回0
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
    console.log('Post candidates:', str);

    let num = _allCombinations(posts, snodes);
    let res = _findMax(num, posts, snodes);
    return res;
}

module.exports = {
    Post: Post,
    Snode: Snode,
    bestComb: bestComb
};


// const initData = require('./postData.json');
// let Posts = initData.Posts.map(i => {return new Post(i)});
// let SNodes = initData.Snodes.map(i => {return new Snode(i)});
// console.log('hihi', bestComb(Posts, SNodes));
