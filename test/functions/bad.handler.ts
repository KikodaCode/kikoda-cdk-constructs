/**
 * This file has intential syntax errors
 * expecting a transpilation error here.
 */

// @ts-expect-error
cons typo = () => {
  return { hello: 'world' };
};
