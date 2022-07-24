import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [barang, setBarang] = useState([]);

  async function getData() {
    try {
      const response = await axios.get(`barang/${id}`);
      setBarang(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteBarang = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/barang/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/barang");
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  // pagination pagination pagination pagination pagination pagination
  

  useEffect(() => {
    getData();
  }, []);

  var conten1 = (
    <div className="card">
      <div className="card-body">
        <img
          src={`http://localhost:8000/image/${barang.gambar}`}
          class="img-fluid"
          alt="..."
        />
      </div>
    </div>
  );

  var content2 = (
    <div className="card p-2">
      <div className="card.body">
        <div className="row mb-3">
          <div className="col-3">Nama Barang</div>
          <div className="col-1">:</div>
          <div className="col">{barang.nama_barang}</div>
        </div>

        <div className="row mb-3">
          <div className="col-3">Harga</div>
          <div className="col-1">:</div>
          <div className="col">Rp. {barang.harga}</div>
        </div>

        <div className="row mb-3">
          <div className="col-3">Stok</div>
          <div className="col-1">:</div>
          <div className="col">{barang.stok}</div>
        </div>

        <div className="row mb-3">
          <div className="col-3">keterangan</div>
          <div className="col-1">:</div>
          <div className="col">{barang.keterangan}</div>
        </div>

        <div className="row mb-3">
          <div className="col-3">Suplier</div>
          <div className="col-1">:</div>
          <div className="col">{barang.nama_suplier}</div>
        </div>

        <div className="row mb-3">
          <div className="col-3">Alamat Suplier</div>
          <div className="col-1">:</div>
          <div className="col">
            {barang.alamat_suplier}
            <br></br>
            {barang.telp_suplier}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Container className="pt-3">
      <Card>
        <Card.Header>
          asdasdasd{" "}
          <Link className="btn btn-primary float-end btn-sm" to="/barang">
            Back
          </Link>
        </Card.Header>
        <Card.Body>
          <Row>
            <div className="col-3">{conten1}</div>
            <div className="col">{content2}</div>
          </Row>
        </Card.Body>
        <Card.Footer>
          <div class="d-grid gap-2 d-md-block text-center">
            <div class="row">
              <div class="col">
                <Link
                  to={`/barang/${barang.id}/update`}
                  className="btn btn-primary btn-sm"
                  role="button"
                >
                  Edit
                </Link>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  onClick={() => deleteBarang(barang.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}
