export const fetchRecentChats = async (axios) => {
  try {
    const result = await axios.get('/chat');
    const chats = result.data.map((chat) => ({
      ...chat,
      img: `https://material-ui.com/static/images/avatar/${Math.floor(
        Math.random() * 7
      )}.jpg`,
    }));

    return chats;
  } catch (err) {
    console.log(err);
    alert('error');
  }
};
