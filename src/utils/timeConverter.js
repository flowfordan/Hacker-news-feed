export const timeConverter = (unix) => {
    const a = new Date(unix * 1000);
    const months = [
      'Jan','Feb','Mar',
      'Apr','May','Jun',
      'Jul','Aug','Sep',
      'Oct','Nov','Dec'
    ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes().toString().length === 1? `0${a.getMinutes()}` : a.getMinutes();
  const sec = a.getSeconds().toString().length === 1? `0${a.getSeconds()}` : a.getSeconds();
  const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
  return time;
}