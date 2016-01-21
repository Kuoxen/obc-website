# Openchain - Peer

## Overview

This project contains the core blockchain fabric.  

## Building the project

This document assumes that you have completed the steps in [development environment getting started instructions](Setup_Developer_Environment.md).

To access your VM, run:
```
vagrant ssh
```

From your VM, complete the following steps:

### Go build
```
cd $GOPATH/src/github.com/openblockchain/obc-peer
go build
```

## Run

To view the available commands, run the following command:

    cd $GOPATH/src/github.com/openblockchain/obc-peer
    ./obc-peer

You should see output similar to the example below. <br>
(**NOTE**: rootcommand below is hardcoded in the [main.go](./main.go). Current build will actually create an *obc-peer* executable file).
```
    Usage:
      obc-peer [command]

    Available Commands:
      peer        Run obc peer.
      status      Status of the obc peer.
      stop        Stops the obc peer.
      chaincode   Compiles the specified chaincode.
      help        Help about any command

    Flags:
      -h, --help[=false]: help for openchain

    Use "obc-peer [command] --help" for more information about a command.
```

The **peer** command will run the peer process. You can then use the other commands to interact with this peer process. For example, <b>status</b> will show the peer status.

## Test

To run all tests run `./obc-peer peer`. Then in a second window, run:

    cd $GOPATH/src/github.com/openblockchain/obc-peer
    go test -timeout=20m $(go list github.com/openblockchain/obc-peer/... | grep -v /vendor/)

Note that the first instance of running the tests can require additional time, because a 1GB docker image is downloaded. For this reason, the `timeout` flag is provided with the `go test` command.

To run a specific test, use the `-run RE` flag, where RE is a regular expression that matches the test name. To run tests with verbose output, use the `-v` flag. For example, to run the <b>TestGetFoo</b> function, change to the directory containing the `foo_test.go` and enter:

    go test -test.v -run=TestGetFoo

## Writing Chaincode
Because chaincode is written in the <b>Go</b> language, you can set up the environment to accommodate the rapid edit-compile-run of your chaincode. Follow the instructions on the [Sandbox Setup](Setup_Chaincode.md) page, which allows you to run your chaincode off the blockchain.

## Setting Up a Network

To set up an Openchain network of several validating peers, follow the instructions on the [Devnet Setup](Setup_Developer_Network.md)
page. This network leverages Docker to manage multiple instances of validating peer on the same machine, allowing you to quickly test your chaincode.


## Working with CLI, REST, and Node.js

When you are ready to start interacting with the Openchain peer node through the available APIs and packages, follow the instructions on the [API Documentation](Connect_w_CLI_and_REST.md) page.

## Configuration

Configuration utilizes the [viper](https://github.com/spf13/viper) and [cobra](https://github.com/spf13/cobra) libraries.

There is an **openchain.yaml** file that contains the configuration for the peer process. Many of the configuration settings can be overridden at the command line by setting ENV variables that match the configuration setting, but by prefixing the tree with *'OPENCHAIN_'*. For example, logging level manipulation through the environment is shown below:

    OPENCHAIN_PEER_LOGGING_LEVEL=CRITICAL ./obc-peer

## Logging

Logging utilizes the [go-logging](https://github.com/op/go-logging) library.  

The available log levels in order of increasing verbosity are: *CRITICAL | ERROR | WARNING | NOTICE | INFO | DEBUG*

## Generating grpc code
If you modify ant .proto files, run the following command to generate new .pb.go files.
```
/openchain/obc-dev-env/compile_protos.sh
```

## Adding or updating a Go package
Openchain uses the [Go 1.5 Vendor Experiment](https://docs.google.com/document/d/1Bz5-UB7g2uPBdOx-rw5t9MxJwkfpx90cqG9AFL0JAYo/edit) for package management. This means that all required packages reside in the </b>/vendor</b> folder within the obc-peer project. This is enabled because the GO15VENDOREXPERIMENT environment variable is set to 1 in the Vagrant environment. Go will use packages in this folder instead of the GOPATH when `go install` or `go build` is run. To manage the packages in the <b>/vendor</b> folder, use [Govendor](https://github.com/kardianos/govendor), which is installed in the Vagrant environment. The following commands can be used for package management:
```
# Add external packages.
govendor add +external

# Add a specific package.
govendor add github.com/kardianos/osext

# Update vendor packages.
govendor update +vendor

# Revert back to normal GOPATH packages.
govendor remove +vendor

# List package.
govendor list
```

## Building outside of Vagrant
Though not recommended, some users might choose to build Openchain outside of Vagrant, particularly if they use an editor with built-in Go tooling. The instructions for this method are as follows:

1. Follow all steps required to setup and run a Vagrant image.
2. Ensure that you have [Go 1.5.1](https://golang.org/) (or later) installed.
3. Set the GO15VENDOREXPERIMENT environment variable to 1: `export GO15VENDOREXPERIMENT=1`
4. Install [RocksDB](https://github.com/facebook/rocksdb/blob/master/INSTALL.md) version 4.1.
5. Run the following commands, replacing `/opt/rocksdb` with the path to your installed RocksDB:
```
cd $GOPATH/src/github.com/openblockchain/obc-peer
CGO_CFLAGS="-I/opt/rocksdb/include" CGO_LDFLAGS="-L/opt/rocksdb -lrocksdb -lstdc++ -lm -lz -lbz2 -lsnappy" go install
```
