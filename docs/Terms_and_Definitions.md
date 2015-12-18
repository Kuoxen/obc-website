#**Terms and Definitions**

###**Users and Roles**


Users and Roles    | &nbsp; 
-- | --
Chain Validator | Entities that own a stake of a chain network. Each chain validator has a voice in deciding whether a transaction is valid, therefore chain validators can interrogate all transaction sent to their chain.
Chain Auditor | Entities with the permission to interrogate transactions
Chain Auditor |	Entities with the permission to interrogate transactions

Types of Network Participants | &nbsp; 
-- | --
Solution User | End users usually don’t care about the details of obc networks, they typically use applications provided by application owners to initiate transactions on a chain network. **Roles**: *None* 
Solution Provider	|  Organizations that develop mobile and/or browser based application for end users to use services offered on business chains. Some application owners may also be network owners. **Roles**: *Chain Transactor* 
Network Proprietor	|  Proprietor(s) setup and define the purpose of a business network. They are the stakeholders of a network. **Roles**: *Chain Transactor, Chain Validator*
Network Auditors	| Individuals or organizations with the permission to interrogate transactions **Roles**: *Chain Auditor*

 
###**Chain Network** 

Types of Networks (Business View) |&nbsp; 
-- | --
Industry Specific Network	| Chain network that services applications built for a particular industry
Industry Specific Regional Network	C |hain network that services applications built for a particular region and industry
Application Specific Network	|Chain network only built for one application or solution


Types of Chains (Conceptual View) |&nbsp; 
-- | --
Main Chain	| Usually represents one business network, Main chain operates one or multiple applications/solutions validated by the same group of organizations.
Confidential Chain	|A special purpose chain made to run confidential business logics that only contract stakeholders are allowed to access


###**Transactions**

Types of Transactions |&nbsp; 
-- | --
Deployment Transaction	| Transactions that deploy a new chaincode to a chain
Invocation Transaction	| Transactions that invoke a function on a chaincode


Confidentiality of Transactions |&nbsp; 
-- | --
Public transaction	| Transactions with its payload in the open. Anyone with access to a chain network can interrogate the details of public transaction.
Confidential transaction	| Transaction with its payload encrypted. If the transaction is a deployment transaction, then all subsequent invocation transactions calling the chaincode deployed by the first transaction must also be confidential.


Inter-chain Transactions |&nbsp; 
-- | --
Inter-Network Transaction	|Transactions between two business networks (or main chains).
Inter-Chain Transaction	|Transactions between confidential chains and main chains. Chaincodes in a confidential chain can trigger transactions on one or multiple main chain(s)


###**Network Entities** 

System Entities |&nbsp; 
-- | --
Application Backend	|<p><u>Purpose:</u> Backend application service that supports associated mobile and/or browser based applications. </p><p><u>Key Roles:</u></p><ol><li> Manages end users and register them with membership service</li><li>Initiates transactions requests, and sends the request to either a peer node or a validating node&nbsp;</li></ol><u>Owned by:</u> Solution Provider, Network Proprietor&nbsp;<br><ul></ul>
Peer Node | <p></p><p><u>Purpose:</u> Constructs transactions and forwards them to validating nodes. Peer nodes keep a copy of all transactions records so that solution providers can query them locally. (Dev Team name: NPV - Non Validating Peer)</p><p><u>Key Roles: </u></p><ol><li>Manages and maintains user certificates issued by membership service</li><li>Constructs transactions and forwards them to validating nodes</li><li>Maintains a local copy of the ledger, and allows application owners to query information locally.</li></ol><p><u>Owned by:</u> Solution Provider, Network Auditor</p>
Validating Node | <p><u>Purpose:</u> Creates and validates transactions, and maintains the state</p><p><u>Key Roles: </u></p><ol><li>Manages and maintains user certificates issued by membership service</li><li>Creates transactions</li><li> Executes and validates transactions with other validating nodes on the network</li><li>Maintains a local copy of all transaction data &amp; chaincode states.</li><li> Participates in consensus and update ledger</li></ol><p><u>Owned by:</u> Network Proprietor, Solution Provider (if they belong to the same entity)&nbsp; &nbsp;&nbsp;<br></p>
Membership Service | <p><u>Purpose:</u> Issues and manage the identity of end users and organizations </p><p><u>Key Roles: </u></p><ol><li>Issues enrollment certificate to each end user and organization</li><li>Issues transaction certificates associated to each end user and organization</li><li>Issues TLS certificates for secured communication between OBC entities&nbsp;</li><li>Issues chain specific keys</li></ol><p><u>Owned by:</u> Third party service provider **<br></p>

Membership Service Components |&nbsp; 
-- | --
Registration Authority	| Assigns username password pairs to network participants. This username/password pair will be need when acquiring enrollment certificate from ECA.
Enrollment Certificate Authority (ECA)|	Issues enrollment certificates (ECert) to network participants that have already registered with a membership service.  ECerts are long term certificates used to identify individual entities participating in one or more networks.
Transaction Certificate Authority (TCA)|	Issues transactions certificates (TCerts) to ECert owners.  An infinite number of TCerts can be derived from each ECert. TCerts are used by network participants to transact transactions. Depending on the level of security requirement, network participants may choose to use a new TCert for every transaction.
TLS-Certificate Authority (TLS-CA)	|Issues TLS certificates to systems that transmit messages in a chain network. TLS certificates are used to secure the communication between system interactions.

###**OBC Entities** 

Chaincode |&nbsp; 
-- | --
Public Chaincode	|Chaincodes deployed by public transactions, these chaincodes can be invoked by any member of a network.
Confidential Chaincode |	Chaincodes deployed by confidential transactions, these chaincodes can only be invoked by validating members (Chain validators) of a network.
Access Controlled Chaincode	|Chaincodes deployed by confidential transactions that also embed the tokens of allowable invokers. These invokers are also allowed to invoke confidential chaincodes even though they are not validators.

Ledger |&nbsp; 
-- | --
Chaincode-State	|OBC provides state support; Chaincodes access internal state storage through state APIs. States are created and updated by transactions calling chaincode functions with state accessing logic.
Transaction List	|All processed transasctions are kept in the ledger in their original form (with payload encrypted for confidential transactions), so that network participants can interrogate past transactions that they have the access permission.
Ledger Hash	|A hash that captures the present snapshot of the ledger. It is a product of all validated transactions processed by the network since the genesis transaction.

Node |&nbsp; 
-- | --
DevOps Service	|The frontal module on a node that provides APIs for clients to interact with their node and chain network. This module is also responsible to construct transactions, and work with membership service component to receive and store all types of certificates and encryption keys in its storage.
Node Service	|The main module on a node that is responsible to process transactions, deploy and execute chaincodes, maintain ledger data, and trigger consensus process.
Consensus	|The default consensus algorithm of OBC is called ND-PBFT (ND stands for non-deterministic, Note this name is temporary). ND-PBFT is a new algorithm is enhanced from the “classic” PBFT consensus algorithm. The major value of ND-PBFT is that it allows validating nodes to do a best effort in identifying ND transactions.
