import axios from '../../config/axios';

export const fetchAll = async (skipAmount, limit, filters) => {
  try {
    // console.log('fetching...');
    const result = await axios.get('/items', {
      params: { limit, skipAmount, ...filters },
    });

    // console.log(result.data.length);
    return result.data;
  } catch (err) {
    alert('Error fetching items');
  }
};

export const fetchOne = async (id) => {
  // try {
  // console.log(id);
  const result = await axios.get(`/items/${id}`);
  return result.data;
  // } catch (err) {
  //   console.log(err);
  //   alert('Error fetching ad');
  // }
};

export const postAd = async (axiosPrivate, data) => {
  try {
    await axiosPrivate.post('/items', data);
  } catch (err) {
    alert('Error posting item');
  }
};

export const fetchCategories = async () => {
  try {
    const result = await axios.get('/categories');
    return result.data;
  } catch (err) {
    alert('Error fetching categories');
  }
};
