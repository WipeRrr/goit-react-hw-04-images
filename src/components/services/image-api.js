function fetchImage(name, page) {
  const KEY_API = `33763391-fe078dc9f17400c9e34720d71`;

  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No image with name: ${name}`));
  });
}

const api = {
  fetchImage,
};

export default api;
