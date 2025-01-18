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

export const generateOrderNo = () => {
    const now = new Date();
    const timestamp = now.getFullYear().toString().slice(-2) + // 연도 2자리
        (now.getMonth() + 1).toString().padStart(2, "0") + // 월 2자리
        now.getDate().toString().padStart(2, "0") + // 일 2자리
        now.getHours().toString().padStart(2, "0") + // 시 2자리
        now.getMinutes().toString().padStart(2, "0") + // 분 2자리
        now.getSeconds().toString().padStart(2, "0"); // 초 2자리
    const randomPart = Math.random().toString(36).substr(2, 2).toUpperCase(); // 랜덤 2자리 (영문/숫자)
    return timestamp + randomPart; // 예: "240115123012X3"
};


