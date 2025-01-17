const BASE_URL = "https://67172d90b910c6a6e026d725.mockapi.io/mesage";
const useFetch = () => {
  const request = ({ url, method = "GET", data }) => {
    return fetch(`${BASE_URL}/${url}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  };
  return request;
};

export { useFetch };
