# wait-for-it [![Build Status](https://travis-ci.org/zacharyrankin/wait-for-it.svg?branch=master)](https://travis-ci.org/zacharyrankin/wait-for-it)

Utility for creating efficient auto-save features.

# Usage

```
waitForIt.setup(function(data) {
  // Save data to server
}, 5000);

// Push some data
waitForIt.push({some: 'data'});

// ... and again
waitForIt.push({more: 'new data'});

```

# Testing
