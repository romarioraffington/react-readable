/**
* Filter array in ascending and descending order
* @param  {Object[]} arr - The array to be filtered
* @param  {string} order - The order to filter the array (asc or desc) 
* @param  {string} by - The key to filter by (e.g voteScore, timestamp)
* @return {Object[]} The filtered array
*/

export default (arr, order='asc', by='voteScore') => {
  if (order === 'asc') {
    return arr.sort((a, b) => b[by] - a[by]);
  } else {
    return arr.sort((a, b) => a[by] - b[by]);
  }
}