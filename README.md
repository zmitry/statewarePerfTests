stateware perf tests 

plain - simple spread update
stateware - copy with simple update
dot prop update using dot prop lib
stateware and dotprop
```
plain x 138,092 ops/sec ±1.96% (87 runs sampled)
stateware x 118,557 ops/sec ±1.77% (86 runs sampled)
dot prop x 485,792 ops/sec ±3.79% (83 runs sampled)
stateware and dot prop x 311,072 ops/sec ±2.49% (85 runs sampled)
slice x 690,995 ops/sec ±1.32% (90 runs sampled)
plain obj x 319,242 ops/sec ±0.73% (89 runs sampled)
stateware obj x 303,015 ops/sec ±2.43% (84 runs sampled)
dot prop obj x 431,336 ops/sec ±1.49% (88 runs sampled)
stateware and dot prop obj x 265,042 ops/sec ±1.27% (87 runs sampled)
```