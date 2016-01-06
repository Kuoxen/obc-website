#**Glossary**

## Roles & Personas

### Roles
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Chain Transactor</b></td>
<td>
Entities that have permission to create transactions and query network data.
</td>
</tr>
<tr>
<td width="32%"><b>Chain Validator</b></td>
<td>
Entities that own a stake of a chain network. Each chain validator has a voice in deciding whether a transaction is valid, therefore chain validators can interrogate all transaction sent to their chain.
</td>
</tr>
<tr>
<td width="32%"><b>Chain Auditor</b></td>
<td>
Entities with the permission to interrogate transactions.
</td>
</tr>
</table>

### Participants
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Solution User</b></td>
<td>
End users are agnostic about the details of chain networks, they typically initiate transactions on a chain network through applications provided by solutions providers.

<span style="text-decoration:underline">Roles:</span> None
</td>
</tr>
<tr>
<td width="32%"><b>Solution Provider</b></td>
<td>
Organizations that develop mobile and/or browser based applications for end (solution) users to access chain networks. Some application owners may also be network owners.

Roles: Chain Transactor
</td>
</tr>
<tr>
<td width="32%"><b>Network Proprietor</b></td>
<td>
Proprietor(s) setup and define the purpose of a chain network. They are the stakeholders of a network.

Roles: Chain Transactor, Chain Validator
</td>
</tr>
<tr>
<td width="32%"><b>Network Auditors</b></td>
<td>
Individuals or organizations with the permission to interrogate transactions.

Roles: Chain Auditor
</td>
</tr>
</table>



## Chain Network

### Types of Networks (Business View)
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Industry Network</b></td>
<td>
A chain network that services solutions built for a particular industry.
</td>
</tr>
<tr>
<td width="32%"><b>Regional Industry Network</b></td>
<td>
A chain network that services applications built for a particular industry and region.
</td>
</tr>
<tr>
<td width="32%"><b>Application Network</b></td>
<td>
A chain network that only services a single solution.
</td>
</tr>
</table>

### Types of Chains (Conceptual View)
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Main Chain</b></td>
<td>
A business network; each main chain operates one or multiple applications/solutions validated by the same group of organizations.
</td>
</tr>
<tr>
<td width="32%"><b>Confidential Chain</b></td>
<td>
A special purpose chain created to run confidential business logics that are only accessible by contract stakeholders.
</td>
</tr>
</table>



## Transactions

### Types of Transactions
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Deployment Transaction</b></td>
<td>
Transactions that deploy a new chaincode to a chain.
</td>
</tr>
<tr>
<td width="32%"><b>Invocation Transaction</b></td>
<td>
Transactions that invoke a function on a chaincode.
</td>
</tr>
</table>


### Confidentiality of Transactions
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Public transaction</b></td>
<td>
A transaction with its payload in the open. Anyone with access to a chain network can interrogate the details of public transaction.
</td>
</tr>
<tr>
<td width="32%"><b>Confidential transaction</b></td>
<td>
A transaction with encrypted payload. If the transaction is a deployment transaction, then all subsequent invocation transactions calling that chaincode deployed must also be confidential.
</td>
</tr>
</table>


### Inter-chain Transactions
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Inter-Network Transaction</b></td>
<td>
Transactions between two business networks (main chains).
</td>
</tr>
<tr>
<td width="32%"><b>Inter-Chain Transaction</b></td>
<td>
Transactions between confidential chains and main chains. Chaincodes in a confidential chain can trigger transactions on one or multiple main chain(s).
</td>
</tr>
</table>



## Network Entities

### Systems
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Application Backend</b></td>
<td>
  Purpose: Backend application service that supports associated mobile and/or browser based applications.

  Key Roles:<p>
  1)	Manages end users and registers them with membership service
  <p>
  2)	Initiates transactions requests, and sends the request to a node

  Owned by: Solution Provider, Network Proprietor
</td>
</tr>
<tr>
<td width="32%"><b>Non Validating Node (Peer)</b></td>
<td>
Purpose: Constructs transactions and forwards them to validating nodes. Peer nodes keep a copy of all transactions records so that solution providers can query them locally. (Dev Team name: NVP - Non Validating Peer)
  Key Roles:<p>
  1)	Manages and maintains user certificates issued by membership service<p>
  2)	Constructs transactions and forwards them to validating nodes <p>
  3)	Maintains a local copy of the ledger, and allows application owners to query information locally.

	Owned by: Solution Provider, Network Auditor
</td>
</tr>
<tr>
<td width="32%"><b>Validating Node (Peer)</b></td>
<td>
Purpose: Creates and validates transactions, and maintains the states of chaincodes<p><p>
  Key Roles:<p>
  1)	Manages and maintains user certificates issued by membership service<p>
  2)	Creates transactions<p>
  3)	Executes and validates transactions with other validating nodes on the network<p>
  4)	Maintains a local copy of ledger<p>
  5)	Participates in consensus and update ledger

  Owned by: Network Proprietor, Solution Provider (if they belong to the same entity)
</td>
</tr>
<tr>
<td width="32%"><b>Membership Service</b></td>
<td>
  Purpose: Issues and manages the identity of end users and organizations<p><p>
  Key Roles:<p>
  1)	Issues enrollment certificate to each end user and organization<p>
  2)	Issues transaction certificates associated to each end user and organization<p>
  3)	Issues TLS certificates for secured communication between OBC entities<p>
  4)	Issues chain specific keys

  Owned by: Third party service provider
</td>
</tr>
</table>


### Membership Service Components
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Registration Authority</b></td>
<td>
Assigns username & password pairs to network participants. This username/password pair will be used to acquire enrollment certificate from ECA.
</td>
</tr>
<tr>
<td width="32%"><b>Enrollment Certificate Authority (ECA)</b></td>
<td>
Issues enrollment certificates (ECert) to network participants that have already registered with a membership service.  ECerts are long term certificates used to identify individual entities participating in one or more networks.
</td>
</tr>
<tr>
<td width="32%"><b>Transaction Certificate Authority (TCA)</b></td>
<td>
Issues transactions certificates (TCerts) to ECert owners.  An infinite number of TCerts can be derived from each ECert. TCerts are used by network participants to transact transactions. Depending on the level of security requirement, network participants may choose to use a new TCert for every transaction.
</td>
</tr>
<tr>
<td width="32%"><b>TLS-Certificate Authority (TLS-CA)</b></td>
<td>
Issues TLS certificates to systems that transmit messages in a chain network. TLS certificates are used to secure the communication line between systems.
</td>
</tr>
</table>



## OBC Entities

### Chaincode
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Public Chaincode</b></td>
<td>
Chaincodes deployed by public transactions, these chaincodes can be invoked by any member of a network.
</td>
</tr>
<tr>
<td width="32%"><b>Confidential Chaincode</b></td>
<td>
Chaincodes deployed by confidential transactions, these chaincodes can only be invoked by validating members (Chain validators) of a network.
</td>
</tr>
<tr>
<td width="32%"><b>Access Controlled Chaincode</b></td>
<td>
Chaincodes deployed by confidential transactions that also embed the tokens of allowable invokers. These invokers are also allowed to invoke confidential chaincodes even though they are not validators.
</td>
</tr>
</table>


### Ledger
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>Chaincode-State</b></td>
<td>
OBC provides state support; Chaincodes access internal state storage through state APIs. States are created and updated by transactions calling chaincode functions with state accessing logic.
</td>
</tr>
<tr>
<td width="32%"><b>Transaction List</b></td>
<td>
All processed transactions are kept in the ledger in their original form (with payload encrypted for confidential transactions), so that network participants can interrogate past transactions that they have the access permission.
</td>
</tr>
<tr>
<td width="32%"><b>Ledger Hash</b></td>
<td>
A hash that captures the present snapshot of the ledger. It is a product of all validated transactions processed by the network since the genesis transaction.
</td>
</tr>
</table>


### Node
---
<table border="0">
<col>
<col>
<tr>
<td width="32%"><b>DevOps Service</b></td>
<td>
The frontal module on a node that provides APIs for clients to interact with their node and chain network. This module is also responsible to construct transactions, and work with membership service component to receive and store all types of certificates and encryption keys in its storage.
</td>
</tr>
<tr>
<td width="32%"><b>Node Service</b></td>
<td>
The main module on a node that is responsible to process transactions, deploy and execute chaincodes, maintain ledger data, and trigger consensus process.
</td>
</tr>
<tr>
<td width="32%"><b>Consensus</b></td>
<td>
The default consensus algorithm of OBC is called ND-PBFT (ND stands for non-deterministic, Note this name is temporary). ND-PBFT is a new algorithm is enhanced from the “classic” PBFT consensus algorithm. The major value of ND-PBFT is that it allows validating nodes to do a best effort in identifying ND transactions.
</td>
</tr>
</table>
