export const fetchRecentChats = async (axios) => {
  const getLatestMessage = (chat) => {
    const latestMessage = chat.messages[chat.messages.length - 1];
    return latestMessage.isSender
      ? `You: ${latestMessage.content}`
      : latestMessage.content;
  };

  const getChatDate = (chat) => {
    const latestMessage = chat.messages[chat.messages.length - 1];
    const today = new Date();
    const msgDate = new Date(latestMessage.updatedAt);

    const oneWeekMs = 1000 * 60 * 60 * 24 * 7;
    const msDiff = Math.abs(today.getTime() - msgDate.getTime());
    const weeksDiff = Math.floor(msDiff / oneWeekMs);
    if (weeksDiff > 52) {
      const yearsDiff = Math.floor(weeksDiff / 52);
      return `${yearsDiff} ${yearsDiff > 1 ? 'years' : 'year'}`;
    } else if (weeksDiff === 0) {
      if (today.getDay() === msgDate.getDay()) return 'Today';
      else {
        const weekdays = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
        return weekdays[msgDate.getDay()];
      }
    } else {
      return `${weeksDiff} ${weeksDiff > 1 ? 'weeks' : 'week'}`;
    }
  };

  try {
    const result = await axios.get('/chat');
    const chats = result.data.map((chat) => ({
      ...chat,
      img: `https://material-ui.com/static/images/avatar/${Math.floor(
        Math.random() * 7
      )}.jpg`,
      date: getChatDate(chat),
      latestMessage: getLatestMessage(chat),
    }));
    return chats;
  } catch (err) {
    console.log(err);
    alert('error');
  }
};
