* [Ballot](#ballot)
  * [getSuperNodeByAddress](#function-getsupernodebyaddress)
  * [getVoteInfoByAddress](#function-getvoteinfobyaddress)
  * [getSuperNodeCount](#function-getsupernodecount)
  * [getVoteInfoById](#function-getvoteinfobyid)
  * [addSuperNodes](#function-addsupernodes)
  * [voting](#function-voting)
  * [addSuperNode](#function-addsupernode)
  * [getSuperNodeById](#function-getsupernodebyid)
  * [getVoteCount](#function-getvotecount)
  * [AddSuperNode](#event-addsupernode)
  * [Voting](#event-voting)

# Ballot

Ke

## *function* getSuperNodeByAddress

Ballot.getSuperNodeByAddress(_address) `view` `463699c9`

**Get super node desc by address**

> Show super node desc

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _address | Super node address |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | id | super node id |
| *uint256* | bandwidth | bandwidth of this super node |
| *address* | identify | address of this super node |

## *function* getVoteInfoByAddress

Ballot.getVoteInfoByAddress(_address) `view` `48ca6af8`

**Get vote information by address**

> Statistic after voting

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _address | Voter eth address |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256[]* | voteInfo | super node id of this vote |

## *function* getSuperNodeCount

Ballot.getSuperNodeCount() `view` `56071cf0`

**Get total campaigner of super node count**

> Statistic after voting



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | superNodeCount | total campaigner count |

## *function* getVoteInfoById

Ballot.getVoteInfoById(_id) `view` `6c456e7a`

**Get vote information by id**

> Statistic after voting

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _id | Vote id |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256[]* | voteInfo | super node id of this vote |

## *function* addSuperNodes

Ballot.addSuperNodes(_identifies, _bandwidth) `nonpayable` `73e2083e`

**Add super node campaigners**

> Only contract owner could call this function, each super node only add once

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address[]* | _identifies | The address of super nodes |
| *uint256[]* | _bandwidth | The bandwidth of super node |


## *function* voting

Ballot.voting(_superNodeIds) `nonpayable` `7cb63889`

**Voting campaigners**

> Each address could only vote once

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256[]* | _superNodeIds | The super nodes to vote |


## *function* addSuperNode

Ballot.addSuperNode(_identify, _bandwidth) `nonpayable` `9b1509a7`

**Add a super node campaigner**

> Only contract owner could call this function, each super node only add once

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *address* | _identify | The address of super node |
| *uint256* | _bandwidth | Bandwidth of super node |


## *function* getSuperNodeById

Ballot.getSuperNodeById(_id) `view` `c9d98d18`

**Get super node desc by id**

> Show super node desc

Inputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | _id | Super node id |

Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | id | super node id |
| *uint256* | bandwidth | bandwidth of this super node |
| *address* | identify | address of this super node |

## *function* getVoteCount

Ballot.getVoteCount() `view` `e7b3387c`

**Get total vote count**

> Statistic after voting



Outputs

| **type** | **name** | **description** |
|-|-|-|
| *uint256* | voteCount | total vote count |

## *event* AddSuperNode

Ballot.AddSuperNode(idenfity, superNodeId, bandwidth) `80ff4115`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | idenfity | not indexed |
| *uint256* | superNodeId | indexed |
| *uint256* | bandwidth | not indexed |

## *event* Voting

Ballot.Voting(voter, voteId, votedSuperNodeId) `47ac7e5d`

Arguments

| **type** | **name** | **description** |
|-|-|-|
| *address* | voter | not indexed |
| *uint256* | voteId | indexed |
| *uint256[]* | votedSuperNodeId | not indexed |


---