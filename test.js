//
// This file starts up a test replset with auth enabled, then
// drops you into the shell. The ReplSetTest can be accessed
// through the `t` object.
//
// execute this file with `sudo mongo test.js --shell`
//
// The admin database has an "admin" user with "admin" password.
// The test database has an "admin" user with "admin" password.
// The test database has a readonly "tester" user with "tester" password.
//
// See mongo/src/mongo/shell/replsettest.js for more details about the
// ReplSetTest (`t`) object.
//

;(function () {

  function log (msg) {
    print("=======================================================");
    msg = '\n' + msg + '\n';
    print(msg.split('\n').join('\n   '));
    print("=======================================================");
  }

  // expose
  t = new ReplSetTest({ nodes: 3, keyFile: pwd() + '/keyfile' });

  t.begin = function () {
    t.startSet();
    t.initiate();

    log('waiting secondary node availability ...');
    t.awaitSecondaryNodes();


    var master = t.getMaster();
    var admin = master.getDB('admin');

    // set up auth administrator
    // set up user who only has access to test db
    admin.addUser('admin', 'admin');
    admin.auth('admin','admin');
    var te = master.getDB('test');
    te.addUser('admin', 'admin');
    te.auth('admin','admin');
    te.addUser('tester', 'tester', true);

    log('added authentication.\nready to go.\n\n'
      + t.nodeList() + '\n\n'
      + 'To stop and start a node use:  t.stop(index, true) + t.start(index)\n\n'
      + 'execute t.stopSet() to shutdown the replica set.'
    );
  }

  log('t is your ReplSetTest\nexecute t.begin() to start up a ReplSet test with auth enabled.');
})();
