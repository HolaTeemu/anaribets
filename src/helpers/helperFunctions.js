export const createFormattedDate = (date) => {
  let startTime = new Date(date);

  let hours = startTime.getHours().toString();
  let minutes = startTime.getMinutes().toString();

  if (hours.length === 1) {
    hours = `0${hours}`;
  }

  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }

  const formattedDateString = `${startTime.getDate()}.${
    startTime.getMonth() + 1
  } klo ${hours}:${minutes}`;

  return formattedDateString;
};
