import axios from "axios";

export const submitData = (data) => {
  axios
    .request(config)
    .then((response) => {
      console.log(response);

      const documentId = response.data.data;
      setId(documentId);

      console.log(id);
      getDocument(id); //9148065
    })
    .catch((error) => {
      console.log(error);
    });
};
