import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Row,
  Col,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import Dropdown from 'react-dropdown';
import '../dropdown.css';
import "@fortawesome/fontawesome-free";


const Profile = () => {
  var curr = new Date();
  curr.setDate(curr.getDate());

  const defaultProduct = {
    nombre: "",
    id_prov: "",
    direccion: "",
    contacto: "",
  };

  const [proveedor, setProv] = useState(defaultProduct);
  const [provData, setProvData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter,setFilter]= useState("Nombre");

  const options = [
    'Nombre', 'ID', 'Direccion', 'Contacto'
  ];
  const defaultOption = options[0];

  const handleProvChanges = (e) => {
    const { name, value } = e.target;
    setProv({ ...proveedor, [name]: value });
    console.log(name, value);
  };

  //save service
  const handleProv = async (e) => {
    e.preventDefault();
    console.log(proveedor);
    await addDoc(collection(db, "Proveedores"), proveedor);
  };

  //read service
  const getServices = () => {
    onSnapshot(query(collection(db, "Proveedores")), (querySnapshot) => {
      const proveedores = [];
      querySnapshot.forEach((doc) => {
        proveedores.push({ ...doc.data(), id: doc.id });
      });
      console.log(proveedores);
      setProvData(proveedores);
    });
  };

  const searcher = (e) => {
    setSearch(e.target.value);
    //captura los caracteres que se van typeando
    console.log(e.target.value);
  };

  const selectAction = (e) => {
    setFilter(e.value);
    }


  let results = [];
  if (!search) {
    results = provData;
  } else {
    if(filter === 'Nombre') results=provData.filter((dato)=> dato.nombre.toString().toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Direccion') results=provData.filter((dato)=> dato.direccion.toString().toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='ID') results=provData.filter((dato)=> dato.id_prov.toString().toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Contacto') results=provData.filter((dato)=> dato.contacto.toString().toLowerCase().includes(search.toLocaleLowerCase()));

    /*results = clientData.filter((dato)=>
      dato.correo.toLowerCase().includes(search.toLocaleLowerCase())
      )*/
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="px-4">
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Agregar Proveedor</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#cliente"
                      onClick={handleProv}
                      size="sm"
                    >
                      Guardar
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nombre"
                          >
                            Nombre
                          </label>
                          <Input
                            name="nombre"
                            className="form-control-alternative"
                            id="input-nombre"
                            type="text"
                            onChange={handleProvChanges}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-id_prov"
                          >
                            ID
                          </label>
                          <Input
                            name="id_prov"
                            className="form-control-alternative"
                            id="input-id_prov"
                            type="text"
                            onChange={handleProvChanges}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-direccion"
                          >
                            Dirección
                          </label>
                          <Input
                            name="direccion"
                            className="form-control-alternative"
                            id="input-direccion"
                            type="text"
                            onChange={handleProvChanges}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-contacto"
                          >
                            Contacto
                          </label>
                          <Input
                            name="contacto"
                            className="form-control-alternative"
                            id="input-contacto"
                            type="text"
                            onChange={handleProvChanges}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="p-4">
          <Col className="order-xl-1 mb-3" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <div class="d-flex">
                    <input class="d-inline-block" style={{ height: 'fit-content', padding: '9px', borderColor: '#ffffff5c', borderStyle: "groove"}} value={search} onChange={searcher} type="text" placeholder="Buscar Proveedor..."></input>
                    <p class="d-inline-block" style={{padding: '10px'}}>Filtrar por:</p>
                    <Dropdown class="d-inline-block" options={options} onChange={selectAction} value={defaultOption} placeholder="Select an option" responsive/>
                    </div> 
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">ID</th>
                      <th scope="col">Direccion</th>
                      <th scope="col">contacto</th>

                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((s) => {
                      return (
                        <tr key={s.id}>
                          <th scope="row">{s.nombre}</th>
                          {/* <td>
                                                      {s.status == false 
                                                          ?   <Badge color="" className="badge-dot mr-4">
                                                              <i className="bg-success" />
                                                                      Pendiente
                                                              </Badge>
                                                          :   <Badge color="" className="badge-dot mr-4">
                                                                  <i className="bg-warning" />
                                                                      Realizado
                                                              </Badge>
                                                      }
                                                  </td> */}

                          <td>{s.id_prov}</td>
                          <td>{s.direccion}</td>
                          <td>{s.contacto}</td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                role="button"
                                size="sm"
                                color=""
                                onClick={(e) => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Editar
                                </DropdownItem>
                                <DropdownItem
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Eliminar
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
