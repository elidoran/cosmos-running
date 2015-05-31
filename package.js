Package.describe({
  name: 'cosmos:running',
  version: '0.1.0',
  summary: 'Ordered startup functions ',
  git: 'http://github.com/elidoran/cosmos-running',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');

  api.use([
    'tracker',       // onChange uses Tracker
    'reactive-var',  // _value is a ReactiveVar
    'coffeescript@1.0.6',
    'cosmos:chain@0.1.0'
  ], ['client', 'server']);

  api.addFiles([
    'export.js',
    'running.coffee'
  ], ['client', 'server']);

  api.export('Running', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use(['tinytest', 'coffeescript@1.0.6']);

  api.use('cosmos:running');

  api.addFiles([
    'test/running-tests.coffee'
  ],
  ['client', 'server']);
});
