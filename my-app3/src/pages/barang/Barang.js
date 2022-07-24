import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Barang() {
  const [barangs, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dataSearching, setDataSearching] = useState("all");
  const [cp, setCp] = useState([]);
  const [dataLeng, setDataLeng] = useState();
  // const arr = ['1', '2', '3'];

  const dataSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    setDataSearching(search ? search : "all");
    // console.log(search, " ini search");
    // console.log(dataSearching, " ini dataSearching");
  };

  async function getBarangs() {
    try {
      const response = await axios.post(
        `/barang/${dataSearching}?page=${page}`
      );
      setBarang(response.data.data);
      setCp(response.data.index);
      setLoading(false);
      setDataLeng(response.data.leng / 2);
      console.log(response);
    } catch (error) {
      setLoading(false);
      setErrors(error.message);
      console.error(error);
    }
  }
  useEffect(() => {
    getBarangs();
    console.log(page);
  }, [dataSearching, page]);

  var loadingViews = (
    <tr>
      <td colSpan="7">
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
      <td colspan="7">
        <div className="d-flex justify-content-center">
          <span>{errors}</span>
        </div>
      </td>
    </tr>
  );

  var barangTable = barangs.map((barang, index) => (
    <tr key={index}>
      <td>{(page - 1) * 2 + (index + 1)}</td>
      <td>{barang.nama_barang}</td>
      <td>{barang.nama_suplier}</td>
      <td>{barang.harga}</td>
      <td>{barang.stok}</td>

      <td className="text-center">
        <Link className="btn btn-primary btn-sm" to={`/barang/${barang.id}`}>
          Detail
        </Link>
      </td>
    </tr>
  ));

  function goToNextPage() {
    // not yet implemented
    setPage(page + 1);
  }

  function goToPreviousPage() {
    // not yet implemented
    setPage(page - 1);
  }

  function changePage(pagest) {
    setPage(pagest);
  }

  return (
    <Container className="pt-3">
      <Card>
        <Card.Header>
          List Barang
          <Link
            className="btn btn-primary btn-sm float-end"
            to={`/barang/create`}
          >
            Create
          </Link>
        </Card.Header>
        <Card.Body>
          {/* search */}

          <form onSubmit={dataSearch}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="text"
                className="form-control"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          {/* endsearch */}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Suplier</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Akse</th>
              </tr>
            </thead>
            <tbody>
              {loading ? loadingViews : errors ? errorViews : barangTable}
            </tbody>
          </Table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <button className="page-link" onClick={goToPreviousPage}>
                Prev
              </button>

              {(() => {
                let rows = [];
                for (let i = 0; i < dataLeng; i++) {
                  rows.push(
                    <button
                      key={i}
                      className="page-link"
                      onClick={() => changePage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return rows;
              })()}

              {/* {cp.map((cpss, index) => (
                <button
                  key={index}
                  className="page-link"
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))} */}

              {console.log(dataLeng, "this cp")}

              <button className="page-link" onClick={() => changePage(1)}>
                1
              </button>

              <button className="page-link" onClick={goToNextPage}>
                Next
              </button>
            </ul>
          </nav>
        </Card.Body>
      </Card>
    </Container>
  );
}
