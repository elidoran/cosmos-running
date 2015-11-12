ran = {}
stop = {}
fn1 = (_, context) ->
  if context?.running is true
    ran.fn1 = true
    stop.fn1 = false
  else if context?.running is false
    ran.fn1 = false
    stop.fn1 = true
fn1.options = id:'fn1'
Running.onChange fn1

Tinytest.add 'test initial value', (test) ->
  test.equal Running.value, true, 'Running.value is true after startup()'
  test.equal Running.getValue(), true, 'Running.getValue() is true after startup()'

Tinytest.add 'test fn1 runs', (test) ->
  test.equal ran?.fn1, true
  # trigger a stop() before next test
  Running.stop()

Tinytest.add 'test fn1 stops', (test) ->
  test.equal stop?.fn1, true
  # trigger a start() before next test
  Running.start()

Tinytest.add 'test fn1 runs again', (test) ->
  test.equal ran?.fn1, true
