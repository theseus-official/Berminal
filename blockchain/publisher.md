* [PostPublisher](#postpublisher)
  * [setSuperNodePostRating](#function-setsupernodepostrating)
  * [getSuperNodeName](#function-getsupernodename)
  * [getSuperNodePostRating](#function-getsupernodepostrating)
  * [allSuperNodes](#function-allsupernodes)
  * [publishPosts](#function-publishposts)
  * [removeActiveSuperNode](#function-removeactivesupernode)
  * [setSuperNodeName](#function-setsupernodename)
  * [setSuperNodeBandwidth](#function-setsupernodebandwidth)
  * [getSuperNodeBandwidth](#function-getsupernodebandwidth)
  * [addActiveSuperNode](#function-addactivesupernode)
* [IdArray](#idarray)

# PostPublisher

Dong

## *function* setSuperNodePostRating

PostPublisher.setSuperNodePostRating(_snid, _postKey, _rating) `nonpayable` `03f781f8`

**set the rating of the post on super node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _snid | The ID of super node |
| *bytes32* | _postKey | The post key |
| *uint256* | _rating | The rating of the post on super node |


## *function* getSuperNodeName

PostPublisher.getSuperNodeName(_snid) `view` `1d855898`

**get the name of super node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _snid | The ID of super node |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *string* |  | undefined |

## *function* getSuperNodePostRating

PostPublisher.getSuperNodePostRating(_snid, _postKey) `view` `297a642b`

**get the rating of the post on super node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _snid | The ID of super node |
| *bytes32* | _postKey | The post key |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* allSuperNodes

PostPublisher.allSuperNodes() `view` `a4fad7d1`


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |


## *function* publishPosts

PostPublisher.publishPosts(_postKeys) `nonpayable` `bdf1087f`

**publish the candidate posts**

> according the ratings of posts, assign posts to super node in order to make the sum of ratings max

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256[]* | _postKeys | The post keys |


## *function* removeActiveSuperNode

PostPublisher.removeActiveSuperNode(_snid) `nonpayable` `be8c3f7a`

**remove the super node from publishers**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _snid | The ID of super node |


## *function* setSuperNodeName

PostPublisher.setSuperNodeName(_snid, _name) `nonpayable` `d2e3c019`

**set the name of super node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _snid | The ID of super node |
| *string* | _name | The new name of super node |


## *function* setSuperNodeBandwidth

PostPublisher.setSuperNodeBandwidth(_snid, _bandwidth) `nonpayable` `d36be775`

**set the bandwidth of super node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _snid | The ID of super node |
| *uint256* | _bandwidth | The new bandwidth of super node |


## *function* getSuperNodeBandwidth

PostPublisher.getSuperNodeBandwidth(_snid) `view` `e2950a81`

**get the bandwidth of super node**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _snid | The ID of super node |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* |  | undefined |

## *function* addActiveSuperNode

PostPublisher.addActiveSuperNode(_snid) `nonpayable` `f8887c71`

**add the super node as publisher**


Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _snid | The ID of super node |


---
# IdArray


---