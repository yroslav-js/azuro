export const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let day: number | string = date.getDate()
  let month: number | string = date.getMonth() + 1
  let year = date.getFullYear()
  let minutes: number | string = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;
  return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
}