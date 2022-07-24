import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supliers, setSupliers] = useState([]);
  const [suplier, setSuplier] = useState("");
  const [namaSuplier, setNamaSuplier] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [gambar, setGambar] = useState("");
  const [error, setError] = useState("");

  async function getBarang() {
    try {
      const response = await axios.get(`/barang/${id}`);
      console.log(response.data.data.nama_barang , "this barang");
      setNamaBarang(response.data.data.nama_barang);
      setNamaSuplier(response.data.data.nama_suplier);
      setSuplier(response.data.data.id_suplier);
      setStok(response.data.data.stok);
      setHarga(response.data.data.harga);
      setKeterangan(response.data.data.keterangan);
    } catch (error) {
     
      console.error(error);
    }
  }

  async function getSuplier() {
    try {
      const response = await axios.get("/supliers");
      // console.log(response.data.data);
      setSupliers(response.data.data);
    } catch (error) {
     
      console.error(error);
    }
  }

  const imageHandler = (event) => {
    setGambar(event.target.files[0]);
  };

  const createBarang = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_barang", namaBarang);
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("keterangan", keterangan);
    formData.append("gambar", gambar);
    formData.append("suplier", suplier);

    axios
      .post(`http://localhost:8000/api/barang/${id}/update`, formData)
      .then(function (response) {
        navigate("/barang");
        Swal.fire(
          'Success',
          'Data Berhasil Ditambah',
          'success'
        )
        // console.log(response);
      })
      .catch(function (error) {
        setError(error.response.data.message)
        console.log(error);
      });
  };

  useEffect(() => {
    getSuplier();
    getBarang();
  }, []);

  var suplierOption = supliers.map((suplier, index) => (
    <option key={index} value={suplier.id}>
      {suplier.nama_suplier}
    </option>
  ));

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header">
          Create Supier
          <Link className="btn btn-primary btn-sm float-end" to={`/barang`}>
            Create
          </Link>
        </div>

        <div className="card-body">
          <form onSubmit={createBarang}>
            <div className="mb-3">
              <label htmlFor="namaBarang" className="form-label">
                Nama Barang
              </label>
              <input
                type="text"
                id="namaBarang"
                className="form-control"
                value={namaBarang}
                onChange={(event) => {
                  setNamaBarang(event.target.value);
                }}
              />
               <span className="text-danger">{error.nama_barang}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="suplier" className="form-label">
                Suplier
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                defaultValue={suplier}
                onChange={(event) => {
                  setSuplier(event.target.value);
                }}
              >
                <option>{namaSuplier}</option>
                {suplierOption}
              </select>
              <span className="text-danger">{error.suplier}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga
              </label>
              <input
                type="text"
                id="harga"
                className="form-control"
                value={harga}
                onChange={(event) => {
                  setHarga(event.target.value);
                }}
              />
               <span className="text-danger">{error.harga}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="stok" className="form-label">
                Stok
              </label>
              <input
                type="text"
                id="stok"
                className="form-control"
                value={stok}
                onChange={(event) => {
                  setStok(event.target.value);
                }}
              />
               <span className="text-danger">{error.stok}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">
                Keterangan
              </label>
              <textarea
                className="form-control"
                id="keterangan"
                rows="3"
                value={keterangan}
                onChange={(event) => {
                  setKeterangan(event.target.value);
                }}
              ></textarea>
               <span className="text-danger">{error.keterangan}</span>
            </div>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Gambar
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={imageHandler}
              />
               <span className="text-danger">{error.gambar}</span>

            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
