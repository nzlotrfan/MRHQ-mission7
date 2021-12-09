// My notes:
// Goal is to find a position for the pivot.
// Search the array, bring all the elemenets less than the pivot on the left, and all greater on the right
// {i}'s job is to remember the index that {i} last placed an item that was less than the pivot
// {j} scans (J'S THE INVESTIGATOR) from the left boundary to the item BEFORE the right boundary, checks them to see if they're greater or less than pivot
// {J} can't touch the right boundary

// THE BELOW CODE WORKS BUT NEED TO UNDERSTANDDDDDD

/*
 * @param {Array<number>} arr
 * @return {Array<number>}
 */
const QuickSortLowHigh = (arr) => {
  quicksortHelper(arr, 0, arr.length - 1);
  return arr;
};

// Helper function for recursively doing the quicksort
// quicksort will be called recursively for the elemnts to the left of pivot
// And the elements to the right of pivot
const quicksortHelper = (arr, left, right) => {
  if (left < right) {
    // Find the position of pivot
    const pivotFinalRestingPosition = partition(arr, left, right);

    // Recursively call left and right subarray to the pivot
    quicksortHelper(arr, left, pivotFinalRestingPosition - 1);
    quicksortHelper(arr, pivotFinalRestingPosition + 1, right);
  }
};

// Helper function to perform the partition
const partition = (arr, left, right) => {
  // Here we make the right most element as pivot
  const pivot = arr[right].price;

  // We re-arrange the array such that
  // The elements smaller than the pivot are at left to the pivot
  // And The elements greater than the pivot are at right to the pivot
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j].price <= pivot) {
      i++;

      swap(arr, i, j);
    }
  }

  // The pivot comes to its correct position
  swap(arr, i + 1, right);

  // Return the pivot's final resting position
  return i + 1;
};

// Helper function to swap elements at 2 different array indices
const swap = (arr, first, second) => {
  const temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
};

export default QuickSortLowHigh;
