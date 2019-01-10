let __value = 13;
const isomorphicFetch = jest.fn(()=> __value);

isomorphicFetch.__setValue = v => __value = v;

export default isomorphicFetch;