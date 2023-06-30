export function getFormatedDate(inputDate) {
  const today = new Date(); // Current date
  const updatedAt = new Date(inputDate); // Replace with your actual updatedAt timestamp
  const options = { hour: '2-digit', minute: '2-digit', hour12: false };

  const timeDiff = today.getTime() - updatedAt.getTime();
  const isSameDate = today.toDateString() === updatedAt.toDateString();

  const msInOneDay = 24 * 60 * 60 * 1000;

  if (isSameDate) {
    // Less than 24 hours, display as "today, hh:mm"
    const formattedTime = updatedAt.toLocaleTimeString([], options);
    return `Today, ${formattedTime}`;
  } else if (timeDiff < 2 * msInOneDay) {
    // Between 24 and 48 hours, display as "yesterday, hh:mm"
    const formattedTime = updatedAt.toLocaleTimeString([], options);
    return `Yesterday, ${formattedTime}`;
  } else if (timeDiff <= 6 * msInOneDay) {
    // Between 2 and 6 days, display as "Wednesday: hh:mm" (or any other day)
    const formattedTime = updatedAt.toLocaleTimeString([], options);
    const formattedDay = updatedAt.toLocaleDateString([], { weekday: 'long' });
    return `${formattedDay}, ${formattedTime}`;
  } else {
    // More than 6 days, display as "dd, mm, yyyy"
    const formattedDate = updatedAt.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...options,
    });
    return formattedDate;
  }
}
