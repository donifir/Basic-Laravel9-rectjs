import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Suplier() {
  const navigate = useNavigate();
  const [supliers, setSupliers] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");

  async function getUser() {
    try {
      const response = await axios.get("/supliers");
      setSupliers(response.data.data);
      setLoading(false);
      // console.log(response.data.data);
    } catch (error) {
      setErrors(error.message);
      setLoading(false);
      // console.error(error.message);
    }
  }
  const deleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/suplier/${id}`)
      .then(({ data }) => {
        // console.log(data);
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        getUser();
        navigate("/suplier");
      })
      .catch(({ data: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  var loadingViews = (
    <tr>
      <td colSpan="5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </td>
    </tr>
  );

  var errorViews = (
    <tr>
      <td colspan="5">
        <div className="d-flex justify-content-center">
          <span>{errors}</span>
        </div>
      </td>
    </tr>
  );

  var suplierTable = supliers.map((suplier, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{suplier.nama_suplier}</td>
      <td>{suplier.telp_suplier}</td>
      <td>{suplier.alamat_suplier}</td>
      <td>
        <Link
          className="btn btn-primary btn-sm m-1"
          to={`/suplier/${suplier.id}/edit`}
        >
          Edit
        </Link>
        <Button
          className="btn btn-danger btn-sm"
          onClick={() => deleteProduct(suplier.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Container className="pt-3">
      <Card>
        <Card.Header>
          Haloo
          {/* <Button className="float-end btn-sm" href="/suplier/create">Create</Button> */}
          <Link
            className="btn btn-primary float-end btn-sm"
            to="/suplier/create"
          >
            Create
          </Link>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Suplier</th>
                <th>Telp Suplier</th>
                <th>Alamat Suplier</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? loadingViews : errors ? errorViews : suplierTable}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
