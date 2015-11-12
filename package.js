Package.describe({
  name: 'cosmos:running',
  version: '0.2.0',
  summary: 'Ordered startup functions ',
  git: 'http://github.com/elidoran/cosmos-running',
  documentation: 'README.md'
});

var cs = [ 'client', 'server' ]

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use([
    'tracker',       // onChange uses Tracker
    'reactive-var',  // _value is a ReactiveVar
    'coffeescript@1.0.11',
    'cosmos:chain@0.4.1'
  ], cs);

  api.addFiles([
    'export.js',
    'running.coffee'
  ], cs);

  api.export('Running', cs);
});

Package.onTest(function(api) {
  api.use(['tinytest', 'coffeescript@1.0.11']);

  api.use('cosmos:running');

  api.addFiles([
    'test/running-tests.coffee'
  ], cs);
});
