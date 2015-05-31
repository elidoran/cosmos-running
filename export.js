Running = {};

Meteor.startup(function () {
  // try to cause this to run last
  Meteor.startup(function() {
    // only run if `start()` hasn't been called yet
    // (the app may pass options to `start()`)
    if (Running.running !== true)
      Running.start();
  });
});
