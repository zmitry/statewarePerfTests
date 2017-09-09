var suite = new require("benchmark").Suite();
const lodash = require("lodash");
const stateware = require("stateware");
const dp = require("dot-prop-immutable");

const makeState = (n = 100) => ({
  user: {
    name: "John",
    a: 1,
    b: 2,
    d: 2,
    v: 5,
    array2: lodash.times(n).map((e, i) => i)
  },
  array2: lodash.times(n).map((e, i) => i),
  array: lodash.times(n).map((e, i) => i)
});
const store = stateware.createState(makeState());
const store2 = stateware.createState(makeState());
const initialState = makeState();
const initialState2 = makeState();
const r = dp.set(initialState, ["array", initialState2.array.length], 666);
console.log(r.array[100], initialState.array[100], initialState === r);
// add tests
suite
  .add("plain", function() {
    Object.assign({}, initialState, { array: [...initialState.array, 1] });
  })
  .add("stateware", function() {
    store.copy({
      array: [...store.array, 1]
    });
  })
  .add("dot prop", () => {
    dp.set(initialState2, ["array", initialState2.array.length], 1);
  })
  .add("stateware and dot prop", () => {
    store2.copy({
      array: dp.set(store2.array, [store2.array.length], 1)
    });
  })
  .add("slice", () => {
    const newArray = initialState.array.slice();
    newArray[initialState.array.length] = 1;
    Object.assign({}, initialState, { array: newArray });
  })
  .add("plain obj", function() {
    Object.assign(
      {},
      initialState,
      Object.assign({}, initialState.user, { name: "Erick" })
    );
  })
  .add("stateware obj", function() {
    store.copy({
      user: Object.assign({}, store.user, { name: "Erick" })
    });
  })
  .add("dot prop obj", () => {
    dp.set(initialState2, ["user", "name"], "Erick");
  })
  .add("stateware and dot prop obj", () => {
    store2.copy({
      user: dp.set(store2.user, ["user", "name"], "Erick")
    });
  })
  // add listeners
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
  })
  // run async
  .run({ async: true });
