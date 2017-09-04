/**
* Format timestamps in a more user friendly date format
* @param  {Date} timestamp - Timestamp to be formated
* @return {String} The formatted timestamp
*/

export default (timestamp) => {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];
  
  const date = new Date(timestamp);
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}