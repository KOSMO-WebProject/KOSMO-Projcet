export const getCurrentFormattedDate = (type) => {
  const now = new Date(); // 현재 날짜와 시간
  const year = now.getFullYear(); // 년도
  const month = now.getMonth() + 1; // 월
  const day = now.getDate(); // 일
  const hours = now.getHours(); // 시간
  const minutes = now.getMinutes(); // 분
  const seconds = now.getSeconds(); // 초

  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  switch (type) {
      case 'date':
          return `${year}-${formattedMonth}-${formattedDay}`;
      case 'datetime':
          return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      default:
          throw new Error('Invalid type specified. Use "date" or "datetime".');

  }
};