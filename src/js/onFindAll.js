import axios from "axios";

export function onFindAll(name) {
  const url = `https://pixabay.com/api/`;
  const API_KEY = `key=29432031-54944c319385602ed128077f3`;
  const urlOptions = `image_type=photo&orientation=horizontal&safesearch=true`;

  return axios
    .get(`${url}?${API_KEY}&q=${name}&${urlOptions}`)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    });
}