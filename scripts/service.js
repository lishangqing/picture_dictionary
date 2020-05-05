
function getJsonFromResponse(response) {
  if (response.status === 200) {
    return response.json();
  } else {
    throw Error(response.status);
  }
}

const service = {
  getAllThemes: () => {
    let url = configuration.base_url + '/home/contents';
    return fetch(url)
    .then(response => {
      if(response.ok === true) {
        return response.json();
      } else {
        throw Error(`There was an error in the communication with the server: ${response.statusText}`);
      }
    });
  },
  getImageIds: (themeId) => {
    let url = configuration.base_url + '/home/pages';
    return fetch(`${url}/${themeId}`)
    .then(response => {
      if(response.ok)
        return response.json();
      else throw Error(response.status);
    });
  },
  getImageUrl : (themeId, imageId) =>
  {
    return `${configuration.base_url}/home/pages/${themeId}/image/${imageId}`;
  },
  getLabel: (themeId, imageId, x, y) => {
    return fetch(`${configuration.base_url}/home/words/${themeId}/${imageId}/${x}/${y}`)
    .then(response => {
      if(response.ok)
        return response.json();
      else throw Error(response.status);
    });
  },
  saveImage: (themeId, formData) => {
    return fetch(`${configuration.base_url}/admin/image/${themeId}`, {method: 'POST', body: formData})
    .then(getJsonFromResponse);
  },
  updateImage: (imageId, formData) => {
    return fetch(`${configuration.base_url}/admin/image/${imageId}`, {method: 'PUT', body: formData})
    .then(getJsonFromResponse);
  },
  getThemes: () => {
    return fetch(`${configuration.base_url}/home/contents`)
    .then(response => response.json());
  },
  updateLabel: (method, name, x, y, number, imageId, id) => {
    return fetch(`${configuration.base_url}/admin/label`, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({name: name,
                            x: x,
                            y: y,
                            number: number,
                            imageId: imageId,
                            id: id})})
    .then(getJsonFromResponse);
  },
  saveTheme: (themeName) => {
    return fetch(`${configuration.base_url}/admin/theme`, {
      method: "post",
      headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({theme: themeName})})
    .then(getJsonFromResponse);
  },
  getLabels: (imageId) => {
    return fetch(`${configuration.base_url}/home/labels/${imageId}`)
    .then(getJsonFromResponse)
  }
};
