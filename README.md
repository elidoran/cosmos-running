# Cosmos Running [![Build Status](https://travis-ci.org/elidoran/cosmos-running.svg?branch=master)](https://travis-ci.org/elidoran/cosmos-running)

Ordered startup functions instead of unordered `Meteor.startup()`.

## Install

    $ meteor add cosmos:running


## Usage: Running.onChange(fn)

Add your function to the chain so it will be executed in order.

It wraps its chain execution in a `Tracker.autorun()` where it reactively gets the value to supply to the chain, and your function.

Your function is called with the current running value as the first parameter.

```coffeescript
fn1 = (running) -> console.log 'running value is: ', running
fn1.options = id:'fn1'
Running.onChange fn1
```

```javascript
function fn1(running) {
  console.log('running value is: ', running);
}
// no need to set options.id for a named function. it will use fn1.name
Running.onChange(fn1);
```

## Usage: Tracker.autorun(fn)

When the order of execution of your function isn't important you can create your own tracker and access the running variable reactively.

```coffeescript
Tracker.autorun (computation) ->
  running = Running.getValue()
  console.log 'running value is: ', running
```

```javascript
Tracker.autorun(function(computation) {
  running = Running.getValue();
  console.log('running value is: ', running);
});
```

## Chain + Ordering

See modules [chain-builder](https://www.npmjs.com/package/chain-builder) and [ordering](https://www.npmjs.com/package/ordering) for more details on chain execution and the ordering options.

### Accessing Running value in function

```coffeescript
fn1 = (context) ->
  # all three ways below achieve the same value

  # access it in the chain context
  running = context.running
  # access it as the `this` context
  running = this.running
  # access it in the Running object
  running = Running.value
```

### Ordering before or after another function

fn1 = (context) -> console.log 'running: ', context.running
fn1.options =
  id: 'Function1' # any ID unique for all functions added to Running
  before: ['any', 'ids'] # specify functions this one should run *before*
  after: ['some', 'others'] # specify functions this one should run *after*

# May specify a '*' in either before or after.
# When more than one uses a '*', they will be ordered based on when they were added.

## API

### Running.value

The *non-reactive* access to the current running value.

Note: It's not a function, which is a *hint* it's non-reactive.

```coffeescript
running = Running.value
```

### Running.getValue()

The *reactive* access to the current running value.

Note: It *is* a function, which is a hint it's *reactive*.

```coffeescript
running = Running.getValue()
```

### Running.start(options)

Automatically called by this package as late as it can allowing an app to call this with options.

1. initializes Running object with provided options
2. sets running value to true
3. executes chain with `running` true


### Running.stop()

Sets running value to false which will trigger chain to execute.


## MIT License
