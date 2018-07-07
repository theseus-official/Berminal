const postData = require('./algorithms/postData.json');
const {Post, Snode, bestComb} = require('./algorithms/greedy');

let Posts = postData.Posts.map(i => {return new Post(i)});
let SNodes = postData.Snodes.map(i => {return new Snode(i)});

console.log('All Super Nodes:');
for (const snode of SNodes) {
    console.log('Snode', snode.name, 'bandwidth', snode.bandw, snode.rateData);
}

bestComb(Posts.slice(0, 1), SNodes);
// bestComb(Posts.slice(0, 2), SNodes);
// bestComb(Posts.slice(0, 3), SNodes);
// bestComb(Posts.slice(0, 4), SNodes);