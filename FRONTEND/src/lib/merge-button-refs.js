/* 
    This function merges multiple refs into a single ref callback.
    It ensures that the value is assigned to each ref, whether it's a function or a mutable ref object.
    This is useful when you need to merge external refs with an internal ref.
*/

export function mergeButtonRefs(refs) {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    }
  };
}