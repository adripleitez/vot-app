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

const Profile = () => {
  var curr = new Date();
  curr.setDate(curr.getDate());

  const defaultProduct = {
    costo_unitario: "",
    id: "",
    nombre: "",
    proveedor: "",
    seccion: "",
    stock: "",
  };

  const [product, setProduct] = useState(defaultProduct);
  const [prodData, setProdData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter,setFilter]= useState("Nombre");

  const options = [
    'Nombre', 'Proveedor', 'Costo', 'Seccion', 'Stock'
  ];
  const defaultOption = options[0];
  var dFilter = 'Nombre';

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    console.log(name, value);
  };

  //save service
  const handleProduct = async (e) => {
    e.preventDefault();
    console.log(product);
    await addDoc(collection(db, "Productos"), product);
  };

  //read service
  const getServices = () => {
    onSnapshot(query(collection(db, "Productos")), (querySnapshot) => {
      const productos = [];
      querySnapshot.forEach((doc) => {
        productos.push({ ...doc.data(), id: doc.id });
      });
      console.log(productos);
      setProdData(productos);
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
    results = prodData;
  } else {
    if(filter === 'Nombre') results=prodData.filter((dato)=> dato.nombre.toString().toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Proveedor') results=prodData.filter((dato)=> dato.proveedor.toString().toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Costo') results=prodData.filter((dato)=> dato.costo_unitario.toString().toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Seccion') results=prodData.filter((dato)=> dato.seccion.toString().toLowerCase().includes(search.toLocaleLowerCase()));
    else if(filter==='Stock') results=prodData.filter((dato)=> dato.stock.toString().toLowerCase().includes(search.toLocaleLowerCase()));

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
                    <h3 className="mb-0">Agregar Producto</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#cliente"
                      onClick={handleProduct}
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
                            htmlFor="input-costo_unitario"
                          >
                            Costo unitario
                          </label>
                          <Input
                            name="costo_unitario"
                            className="form-control-alternative"
                            id="input-costo_unitario"
                            type="text"
                            onChange={handleProductChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-id"
                          >
                            id
                          </label>
                          <Input
                            name="id"
                            className="form-control-alternative"
                            id="input-id"
                            type="text"
                            onChange={handleProductChange}
                          />
                        </FormGroup>
                      </Col>

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
                            onChange={handleProductChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-proveedor"
                          >
                            Proveedor
                          </label>
                          <Input
                            name="proveedor"
                            className="form-control-alternative"
                            id="input-proveedor"
                            type="text"
                            onChange={handleProductChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-seccion"
                          >
                            Sección
                          </label>
                          <Input
                            name="seccion"
                            className="form-control-alternative"
                            id="input-seccion"
                            type="text"
                            onChange={handleProductChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-stock"
                          >
                            Stock
                          </label>
                          <Input
                            name="stock"
                            className="form-control-alternative"
                            id="input-stock"
                            type="text"
                            onChange={handleProductChange}
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
                    <h3 className="mb-0">Listado de productos</h3>
                    <div class="d-flex">
                    <input class="d-inline-block" style={{height: 'fit-content', padding: '10px'}} value={search} onChange={searcher} type="text" placeholder="Buscar..."></input>
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
                      <th scope="col">Proveedor</th>
                      <th scope="col">Costo</th>
                      <th scope="col">Seccion</th>
                      <th scope="col">Stock</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((s) => {
                      return (
                        <tr key={s.id}>
                          <th scope="row">{s.nombre}</th>
                          <td>{s.proveedor}</td>
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
                          <td>{s.costo_unitario}</td>
                          <td>{s.seccion}</td>
                          <td>{s.stock}</td>
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
