import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const [namaSuplier, setNamaSuplier] = useState("");
  const [alamatSuplier, setAlamatSuplier] = useState("");
  const [telpSuplier, setTelpSuplier] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  async function getSuplier() {
  try {
    const response = await axios.get(`/suplier/${id}`);
    setNamaSuplier(response.data.data.nama_suplier);
    setAlamatSuplier(response.data.data.alamat_suplier);
    setTelpSuplier(response.data.data.telp_suplier);
    // console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

  const createSuplier=async(e)=>{
    e.preventDefault();

    axios.post(`/suplier/${id}/update`, {
        nama_suplier: namaSuplier,
        alamat_suplier: alamatSuplier,
        telp_suplier: telpSuplier
      })
      .then(function (response) {
        // console.log(response);
        navigate("/suplier");
        Swal.fire(
            'Success',
            'Data Berhasil Diupdate',
            'success'
          )
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data.message);
      });
    
  }

  useEffect(() => {
    getSuplier();
  }, [])
  

  return (
    <Container className="pt-3">
      <Card>
        <Card.Header>Haha</Card.Header>
        <Card.Body>
          <Form onSubmit={createSuplier}>

            <Form.Group className="mb-3" controlId="Nama">
              <Form.Label>Nama Suplier</Form.Label>
              <Form.Control
                type="text"
                value={namaSuplier}
                onChange={(event) => {
                  setNamaSuplier(event.target.value);
                }}
              />
              <span className="text-danger">{error.nama_suplier}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Nama">
              <Form.Label>Alamat Suplier</Form.Label>
              <Form.Control
                type="text"
                value={alamatSuplier}
                onChange={(event) => {
                  setAlamatSuplier(event.target.value);
                }}
              />
              <span className="text-danger">{error.alamat_suplier}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Nama">
              <Form.Label>Telp Suplier</Form.Label>
              <Form.Control
                type="text"
                value={telpSuplier}
                onChange={(event) => {
                  setTelpSuplier(event.target.value);
                }}
              />
              <span className="text-danger">{error.telp_suplier}</span>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
