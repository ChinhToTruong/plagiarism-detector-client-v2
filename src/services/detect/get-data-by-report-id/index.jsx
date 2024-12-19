import axios from "axios";

export const getData = (id) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:8080/plagiarism/${id}`,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  axios
    .request(config)
    .then((response) => {
      console.log(response.data.data.data);
      const key = response.data.data.data.auth_key;
      setKey(key);
      const link = `https://plagiarismsearch.com/r/${id}?key=${key}`;
      setLink(link);
    })
    .catch((error) => {
      console.error(error);
    });
};
