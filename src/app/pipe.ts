/**
 *  Title: pipe.ts
 *
 *  Description: A set of tools used for making functional
 *  programming a lot simpler.
 * 
 *  @author Ketsumi
 */
export class Pipe {

  /**
   *  pipe function --
   *  reduces an array of functions that process a total accumulated value
   *  @param fns an array of functions to be executed on a value passed to the returned function
   *  @return a function to accept accept the initial value to be processed by the reducer
   */
  static pipe(...fns) {
    return x => fns.reduce((a, f) => f(a), x);
  }

  /**
   *  trace function --
   *  displays current value within a pipe
   *  @param label accepts a label to be logged with the returned value
   *  @return the current accumulated value in the reducer process
   */
  static trace(label) {
    return x => [x, console.log(`${label}:\n`, x)][0];
  }
}
