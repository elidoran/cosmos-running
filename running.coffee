Running =
  # non-reactive value
  value: false
  # reactive value
  _value : new ReactiveVar()
  # getter for reactive value
  getValue: -> @_value.get()

  # create the chain
  _chain: new Chain

  # TODO: validate it's a function
  onChange: (action) -> @_chain.add action

  start: (options) ->

    # return if we're already running
    if @value then return

    # configure with options
    @_setup options

    # set non-reactive and reactive value
    @value = true
    @_value.set true

    # create computation if it doesn't exist
    unless @_computation?
      # this will run immediately with `true` we set above
      @_computation = Tracker.autorun () ->
        # the context given to execute is an object containing the running value
        Running._chain.execute running:Running.getValue()
    return true

  stop: () ->
    # set running values to false
    @value = false
    @_value.set false # triggers autorun to execute chain

  _setup: (options) ->

    # get previous options if none specified for this call
    options ?= Running._options

    # store options to be used in the above statement in a later call
    Running._options = options

    # currently there are no supported options

    return
