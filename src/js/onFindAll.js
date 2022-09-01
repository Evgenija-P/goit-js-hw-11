import axios from 'axios';

export const onFindAll = async (name, page, perPage) => {
  const url = `https://pixabay.com/api/`;
  const API_KEY = `key=29432031-54944c319385602ed128077f3`;
  const urlOptions = `image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const response = await axios.get(`${url}?${API_KEY}&q=${name}&${urlOptions}`);
  // console.log(response.data);
  return response.data;
};
