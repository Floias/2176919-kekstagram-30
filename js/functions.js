/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

const findsMeeting = (workBeginning, workEnd, startMeeting, duration) => {
  const work = workBeginning.split(':').concat(workEnd.split(':')).map(i => Number(i));
  const meetingBeginning = startMeeting.split(':').map(i => Number(i));
  const startWorkMinutes = work[0] * 60 + work[1];
  const endWorkMinutes = work[2] * 60 + work[3];
  const startMeetingMinutes = meetingBeginning[0] * 60 + meetingBeginning[1];
  if (startMeetingMinutes >= startWorkMinutes && startMeetingMinutes <= endWorkMinutes) {
    const endMeetingMinutes = startMeetingMinutes + duration;
    return endMeetingMinutes <= endWorkMinutes;
  }
  return false;
};

findsMeeting('08:00', '17:30', '14:00', 90); // true
findsMeeting('8:0', '10:0', '8:0', 120);     // true
findsMeeting('08:00', '14:30', '14:00', 90); // false
findsMeeting('14:00', '17:30', '08:0', 90);  // false
findsMeeting('8:00', '17:30', '08:00', 900); // false

const checkingStringLength = (string, maxlength) => string.length <= maxlength;

const isPalindrome = (string) => {
  const result = string.replaceAll(' ', '').toLowerCase();
  let j = -1;
  for(let i = 0; i < result.length / 2; i++) {
    if (result[i] !== result.at(j)) {
      return false;
    }
    j -= 1;
  }
  return true;
};

const extractingNumbers = (string) => {
  const newString = string.toString();
  let result = '';
  for (let i = 0; i < newString.length; i++) {
    if (!Number.isNaN(parseInt(newString[i], 10))) {
      result += newString[i];
    }
  }
  if (result === '') {
    return NaN;
  }
  return Number(result);
};

checkingStringLength('проверяемая строка', 20);
isPalindrome('Лёша на полке клопа нашёл ');
extractingNumbers(1.5);
