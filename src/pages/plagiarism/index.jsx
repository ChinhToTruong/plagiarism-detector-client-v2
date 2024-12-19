import { useState } from "react";
import { Button, Box, Container, TextField, Divider } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const TYPE_BOX = {
  url: "url",
  text: "text",
  file: "file",
};

const renderComponent = (type) => {
  switch (type) {
    case TYPE_BOX.file:
      return <input type="file" />;

    case TYPE_BOX.text:
      return (
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Nhập chữ tại đây..."
          margin="normal"
        />
      );

    case TYPE_BOX.url:
      return (
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Nhập duong dan..."
          margin="normal"
        />
      );
  }
};

const PlagiarismPage = () => {
  const [file, setFile] = useState(null);
  const [plagiarismRate, setPlagiarismRate] = useState(null);
  const [originalityRate, setOriginalityRate] = useState(null);
  const [link, setLink] = useState("");
  const [id, setId] = useState("");
  const [key, setKey] = useState("");
  const [typeBox, setTypeBox] = useState(TYPE_BOX.text);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang

    let data = JSON.stringify({
      url: "https://vi.wikipedia.org/wiki/B%C3%AD_t%C3%ADch_H%C3%B2a_Gi%E1%BA%A3i",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/plagiarism/add-document",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

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

  const getDocument = (id) => {
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

  return (
    <Container
      maxWidth={"xl"}
      className="min-h-60 h-auto shadow-xl rounded-md flex justify-between"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 2 }}
        className="w-full"
      >
        <div id="content" className="py-4">
          {renderComponent(typeBox)}
        </div>
        <div
          id="footer"
          className="flex justify-between items-center px-16 py-4"
        >
          <div id="footer-option">option</div>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Kiem tra
          </Button>
        </div>
      </Box>
      {link && (
        <Box sx={{ mt: 2 }}>
          <p>plagiarism rate: {plagiarismRate} </p>
          <p>originality rate: {originalityRate}</p>
          <Link
            to={`https://plagiarismsearch.com/r/${id}?key=${key}`}
            accessKey="bien.nd203327@sis.hust.edu.vn:F36O6VSpQEAjqDVpz94d3MB6BPELxZQUO6CRcBOmUK3WVPXT9EoKgW-219039683"
          >
            {`https://plagiarismsearch.com/r/${id}?key=${key}`}
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default PlagiarismPage;
