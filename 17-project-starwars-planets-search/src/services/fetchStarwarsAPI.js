const fetchStarwarsAPI = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { results } = await fetch(endpoint).then((data) => data.json());
  console.log(results);
  results.filter((item) => delete item.residents); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  return results;
};

export default fetchStarwarsAPI;
