mongo replset test
==================

Quickly set up a mongodb replica set test with authentication enabled.

## Use

    $ sudo mongo test.js --shell

Once ready, the following is printed to the shell.

    added authentication.
    ready to go.

    localhost:31000,localhost:31001,localhost:31002

    To stop and start a node use:  t.stop(index, true) + t.start(index)

    execute t.stopSet() to shutdown the replica set.

`localhost` will be the name of the host you are running on.

- The admin database has an "admin" user with "admin" password.
- The test database has an "admin" user with "admin" password.
- The test database has a readonly "tester" user with "tester" password.

## License

[MIT](https://github.com/aheckmann/mongo-replset-test/blob/master/LICENSE)
