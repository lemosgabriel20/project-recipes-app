const fetchApi = async (url, key) => {
  const response = await fetch(url);
  const data = await response.json();
  return data[key];
};

export default { fetchApi };
