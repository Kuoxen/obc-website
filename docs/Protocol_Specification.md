Open Blockchain Specification, version 0.01 (draft)  01/10/2016

Authors:
Reviewers:

Table of Contents
1. Introduction
	What is blockchain, motivations, brief description of existing work
	Goals of this specification:
	-- Understanding the protocol
	-- Enabling anyone to build compatible blockchain
	-- Interops between different implementations

2. Terminology
	Peer, validator, chain, multichain, privacy, confidentiality, etc

3. Fabric Overview
	Introduction
	Architecture
	Topology (client, validating peer, non-validating peer)
	Components
		Membership
		Blockchain
		Chaincode
		Event Stream
	Multichain (motivations, operations, inter-chain communication)

4. Protocol
	Messages: Handshake, Transact, Sync
	Transaction Types and Structures
		Life-cycle: Publish, Create, Invoke
	Block structure
	World State
	Chaincode (communication, api, execution, limit, determinism)
	Consensus Framework and Pluggability

6. Execution Model
	Transaction flow
	Execution and state modification
	Error codes

7. Security
	Introduction to security model
	Scenarios and goals
	Network security (TLS)
	Registration ECA and TCA
	Transaction security (privacy, confidentiality, signature, multisig)
	Business security (audit, linkability, reputation)
	Chaincode Access Control
	Application Access Control (applications may implement own acl)

8. API
	HTTP Service (security, topology)
	REST APIs (description, usage, sample, swagger)
	CLIs (motivations, usage, security)

9. Application Model
	Composition of an application
	Samples to illustrate

10. Future Directions

11. References
	bitcoin
	pbft
	ethereum
