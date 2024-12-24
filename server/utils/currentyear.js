export const getCurrentFormattedDate = () => {
    const today = new Date(); // 현재 날짜와 시간
    const year = today.getFullYear(); // 년도
    const month = today.getMonth() + 1; // 월 (getMonth()는 0부터 시작하므로 1을 더해줍니다)
    const day = today.getDate(); // 일
  
    // 숫자를 문자열로 변환하면서 두 자리 수를 맞추기 위해 `padStart()` 사용
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
  
    return `${year}-${formattedMonth}-${formattedDay}`; // 'YYYY-MM-DD' 형식
  };