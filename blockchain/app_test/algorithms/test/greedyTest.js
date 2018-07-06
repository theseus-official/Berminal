const assert = require('assert');
const postData = require('../postData.json');
const {Post, Snode, bestComb} = require('../greedy');

let Posts = postData.Posts.map(i => {return new Post(i)});
let SNodes = postData.Snodes.map(i => {return new Snode(i)});

describe("Greedy test", function () {
    it('Max value should be 10', function() {
        assert.equal(bestComb(Posts.slice(0, 1), SNodes), 10);
    });

    it('Max value should be 14', function() {
        assert.equal(bestComb(Posts.slice(0, 2), SNodes), 14);
    });

    it('Max value should be 21', function() {
        assert.equal(bestComb(Posts.slice(0, 3), SNodes), 21);
    });

    it('Max value should be 26', function() {
        assert.equal(bestComb(Posts.slice(0, 4), SNodes), 26);
    });

    it('Max value should be 31', function() {
        assert.equal(bestComb(Posts, SNodes), 31);
    });
});