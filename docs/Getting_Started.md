## Memorandum of Understanding
This project has specific intentions and guidelines that are provided in the [MOU](https://github.com/openblockchain/obc-getting-started/blob/master/MOU.md). If you do not agree with the provisions in the MOU, contact the Openchain project manager and do not proceed with accessing, reading or contributing to this project.

## Getting Started
Welcome to Openchain development!

You are strongly recommended to read the [technical specifications](Technical_Specification.md) to
get an overview of what we are developing. We use agile methodology with a weekly
sprint, organized by [issues](https://github.com/openblockchain/obc-peer/issues) and [milestones](https://github.com/openblockchain/obc-peer/milestones), so take a look to familiarize yourself with the current work.

## License
This software is under [Apache License Version 2.0](LICENSE)

## Setting up the development environment
We create a development environment for this project such that every developer
would have the same set up and can be productive within a few minutes. Follow
the [instructions](Setup_Developer_Environment.md) to download and start.

## Contribution
We are using [Github Flow](https://guides.github.com/introduction/flow/) process
to contribute code.
####Here is the basic Github Flow:
- Anything in the master branch is deployable
- To work on something new, create a descriptively named branch off of your fork. [More detail on fork](https://help.github.com/articles/syncing-a-fork/)
- Commit to that branch locally and regularly push your work to the same named
branch on the server
- When you need feedback or help, or you think the branch is ready for merging,
open a pull request (make sure successfully built and tested with the testsuite)
- After your pull request has reviewed and signed off, a committer
can merge it into master branch

We use the same approach - the [Developer's Certificate of Origin](DCO1.1.txt) - as the Linux Kernel [community](http://elinux.org/Developer_Certificate_Of_Origin) does to manage contributions.
We simply ask that when submitting a pull request, that the developer include a sign-off statement in the pull request's description.

Here is an example Signed-off-by line, that indicates that the submitter accepts the DCO:

```
Signed-off-by: John Doe <john.doe@hisdomain.com>
```

## Communication
We will use mainly our [Slack for communication](https://openchain.slack.com) and
Screenhero or Google Hangouts for screen sharing between developers. Register and get connected.

## Coding Golang
- We require a file [header](headers.txt) on all source code files. Just copy and
paste.
- We code in Go and strictly follow the [best practices](http://golang.org/doc/effective_go.html)
and will not accept any deviation. You must run the following tools against your code and fix all errors and warnings.
	- [golint](https://github.com/golang/lint)
	- [go vet](https://golang.org/cmd/vet/)
