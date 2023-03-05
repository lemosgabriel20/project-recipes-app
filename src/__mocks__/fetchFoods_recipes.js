const fetchFoods = async () => {
  const response = await fetch(`https://www.${web}.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const limit = 12;
  setLoadRecipes(data[token].slice(0, limit));
};

export default { fetchFoods };
