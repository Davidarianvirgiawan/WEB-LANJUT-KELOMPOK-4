import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Card, Button, Form, Table, ButtonGroup } from "react-bootstrap";

const App = () => {
 const [input ,setInput] = useState({
  nama : "",
  no_hp : "",
  email : "",
  tabungan : 0,
  pemasukan : 0,
  pengeluaran : 0
 });
 const [selData, setSelData] = useState(-1)
 const [dataUser, setDataUser] = useState([]);
  async function getDataUser() {
    try {
      const res = await fetch("/api")
      if(!res.ok ) {
        console.log("Error fetching data")
        return
      }
      const data = await res.json()
      console.log(data)
      setDataUser(data)
    }catch(err) {
      console.log(err);
    }
  }
  

  useEffect(() => {
    getDataUser()
    return () => {
      setInput({
        nama : "",
        no_hp : "",
        email : "",
        tabungan : 0,
        pemasukan : 0,
        pengeluaran : 0
      
       })
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch( selData >= 0 ? "/api/"+selData: "/api", {
        method : selData >= 0 ?"PUT" : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(input)
      })
      if(!res.ok) return
      alert("Berhasil")
      getDataUser()
    }catch(err) {
      console.log(err)
    }
    setInput({
      nama : "",
      no_hp : "",
      email : "",
      tabungan : 0,
      pemasukan : 0,
      pengeluaran : 0
    
     })
    
  };
  const handleChange = (ev) => {
    console.log(ev.target.type)
    setInput(prev => ({
      ...prev,
      [ev.target.name] : ev.target.type == "number" ? parseInt(ev.target.value) : ev.target.value
    }))
  }

  async function hapus(id) {
    try {
      const res = await fetch("/api/"+id, {
        method : "DELETE"
      })
      if(!res.ok) return
      getDataUser()
      alert("Berhasil")
    }catch(err) {
      console.log(err)
      return
    }
  }
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="text-center">Tabungan</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        
        <Col md={5}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Nama User">
                  <Form.Label>Nama User</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User"
                    name="nama"
                    value={input.nama}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="NO HP">
                  <Form.Label>No HP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="NO HP"
                    name="no_hp"
                    value={input.no_hp}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="tabungan">
                  <Form.Label>Tabungan</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Tabungan"
                    name="tabungan"
                    value={input.tabungan}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="pemasukan">
                  <Form.Label>Pemasukan</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="pemasukan"
                    name="pemasukan"
                    value={input.pemasukan}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="pengeluaran">
                  <Form.Label>Pengeluaran</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="pengeluaran"
                    name="pengeluaran"
                    value={input.pengeluaran}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  {selData >= 0 ? "Edit" :"Submit"  }
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col style={{width:"fit-content"}}>
          <Table striped bordered hover>
            <thead>
              <th>No</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Tabungan</th>
              <th>Pemasukan</th>
              <th>Pengeluaran</th>
              <th>Aksi</th>
            </thead>
            <tbody>
              {
                dataUser.map((user, index) =>
                 {
                  return (
                    <tr key={user.id_user}>
                      <td>{index+1}</td>
                      <td>{user.nama}</td>
                      <td>{user.no_hp}</td>
                      <td>{user.email}</td>
                      <td>{user.tabungan}</td>
                      <td>{user.pemasukan}</td>
                      <td>{user.pengeluaran}</td>
                      <td>
                        <ButtonGroup>
                          <Button onClick={() => {
                            hapus(user.id_user)
                          }}>Hapus</Button>
                          <Button onClick={() => {
                            setSelData(user.id_user)
                            setInput(user)
                          }}>Edit</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  )
                 })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
