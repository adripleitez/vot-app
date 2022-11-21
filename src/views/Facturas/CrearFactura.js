/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  CardBody,
  Button,
  Form,
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
import { React, useState, useEffect, ref } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  onSnapshot,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { useHistory } from 'react-router-dom';


const Tables = () => {
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);

  //Para la suma de costos
  const [costos, setCostos] = useState(0);
  //Para agregar el dropdown de Servicios

  const [servData, setServData] = useState([]);

  //Para agregar el dropdown de productos
  const [prodData, setProdData] = useState([]);
  // Para jalar la orden de trabajo al dropdown
  const [otData, setotData] = useState([]);

  const [clientData, setClientData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Codigo Factura");
  const [vehicle, setVehicle] = useState("");

  const [dui, setClientDui] = useState("");

  const [nombreCliente, setClienteNombre] = useState("");

  const [last, setLast] = useState([]);
  const history = useHistory();

  const defaultFactura = {
    codigo_factura: "",
    fecha_factura: date,
    id_orden_de_trabajo: "",
    nombre_cliente: "",
    total: "",
    vehiculo: "",
  };
  //Para llenar la factura
  const [factura, setFactura] = useState(defaultFactura);

  const options = [
    "Codigo Factura",
    "Fecha Factura",
    "ID Orden de Trabajo",
    "Cliente",
    "Total",
    "Vehiculo",
  ];

  //Para capturar el evento ( id)
  const handleChanges = async (event) => {
    //console.log(event.target.value);
    await setVehiclebyFilter(event.target.value)
    setCostos(0);
    //setSelectedOption(event.target.value)
    await getServicesByFilter(event.target.value);
    await getProductByFilter(event.target.value);
    await setNamebyFilter;

    setFactura({ ...factura, id_orden_de_trabajo: event.target.value});
  };

  // read Orders
  const getOrder = async () => {
    await onSnapshot(
      query(collection(db, "Orden_trabajo")),
      (querySnapshot) => {
        const workorders = [];
        querySnapshot.forEach((doc) => {
          workorders.push({ ...doc.data(), id: doc.id });
        });
        //console.log(workorders);
        setotData(workorders);
      }
    );
  };

  const setVehiclebyFilter = async (id) => {
    try {

      onSnapshot(query(collection(db, "Orden_trabajo"), where("OT_id", "==", id), limit(1)), (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        setVehicle(docs[0].vehiculo_id);
        setClientDui(docs[0].dui)
        setFactura({ ...factura, vehiculo: docs[0].vehiculo_id});
      });

    } catch (error) {
      console.log(error);
    }
  };

  const setNamebyFilter = async () => {
    try {

      onSnapshot(query(collection(db, "Cliente"), where("dui", "==", dui), limit(1)), (querySnapshot) => {
        const docs1 = [];
        querySnapshot.forEach((doc) => {
            docs1.push({ ...doc.data(), id: doc.id });
        });
        setClienteNombre(docs1[0].name);
      });

    } catch (error) {
      console.log(error);
    }
  };


  const getClient = async () => {
    await onSnapshot(query(collection(db, "Facturas")), (querySnapshot) => {
      //Aun no creado
      const clients = [];
      querySnapshot.forEach((doc) => {
        clients.push({ ...doc.data(), id: doc.id });
      });
      //console.log(clients);
      setClientData(clients);
    });
  };

  const lastDoc = () => {
    onSnapshot(query(collection(db, "Facturas"), orderBy("fecha_factura", "desc"), limit(1)), (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
        });
        let id = docs[0].codigo_factura.split(/-0*/);
        setLast("FT-" + (parseInt(id[1]) + 1).toString().padStart(6, '0'));
        setFactura({ ...factura, codigo_factura: "FT-" + (parseInt(id[1]) + 1).toString().padStart(6, '0') });
    });
};

  // Para hallar los servicios filtrados por la OT_id
  const getServicesByFilter = async (id) => {
    try {
      let servicesFiltered = [];
      const q = query(
        collection(db, "ServiciosRealizados"),
        where("OT_id", "==", id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((element) => {
        let ServiceFiltered = { id: element.id, ...element.data() };
        servicesFiltered = [...servicesFiltered, ServiceFiltered];
      });
      setServData(servicesFiltered);
      //console.log(servicesFiltered);
    } catch (error) {
      console.log(error);
    }
  };

  // Para hallar los productos filtrados por la OT_id
  const getProductByFilter = async (id) => {
    try {
      let productsFiltered = [];
      const q = query(
        collection(db, "ProductosVendidos"),
        where("OT_id", "==", id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((element) => {
        let ProductsFiltered = { id: element.id, ...element.data() };
        productsFiltered = [...productsFiltered, ProductsFiltered];
      });
      setProdData(productsFiltered);
      //console.log(productsFiltered);
    } catch (error) {
      console.log(error);
    }
  };


  // Toda la parte de agregar factura
  const handleFacturaChanges = (e) => {
    const { name, value } = e.target;
    setFactura({ ...factura, [name]: value });
    //console.log(name, value);
  };

  const handleFactura = async (e) => {
    e.preventDefault();
    setFactura({ ...factura, total: costos});
    //console.log(factura);
    await addDoc(collection(db, "Facturas"), factura);
    history.push("/admin/listado-facturas")
  };

  let results = [];
  if (!search) {
    results = clientData;
  } else {
    if (filter === "Codigo Factura")
      results = clientData.filter((dato) =>
        dato.codigo_factura
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );
    else if (filter === "Fecha Factura")
      results = clientData.filter((dato) =>
        dato.fecha_factura
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );
    else if (filter === "ID Orden de Trabajo")
      results = clientData.filter((dato) =>
        dato.id_orden_de_trabajo
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );
    else if (filter === "Cliente")
      results = clientData.filter((dato) =>
        dato.nombre_cliente
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );
    else if (filter === "Total")
      results = clientData.filter((dato) =>
        dato.total.toString().toLowerCase().includes(search.toLocaleLowerCase())
      );
    else if (filter === "Vehiculo")
      results = clientData.filter((dato) =>
        dato.vehiculo
          .toString()
          .toLowerCase()
          .includes(search.toLocaleLowerCase())
      );

    /*results = clientData.filter((dato)=>
    dato.correo.toLowerCase().includes(search.toLocaleLowerCase())
    )*/
  }

  useEffect(() => {
    (async () => {
      await getClient();
      await getOrder();
    })();
    lastDoc();
  }, []);

  /*
  useEffect( () => {
     
  }, []);
*/
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row className="px-4">
                  <Col className="order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                      <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                          <Col xs="8">
                            <h3 className="mb-0">Agregar Factura</h3>
                          </Col>
                          <Col className="text-right" xs="4">
                            <Button
                              color="primary"
                              href="#cliente"
                              onClick={handleFactura}
                              size="sm"
                            >
                              Agregar factura
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
                                    htmlFor="input-codigo_factura"
                                  >
                                    Código Factura
                                  </label>
                                  <Input
                                    name="codigo_factura"
                                    className="form-control-alternative"
                                    id="input-codigo_factura"
                                    defaultValue={last}
                                    type="text"
                                    onChange={handleFacturaChanges}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-fecha_factura"
                                  >
                                    Fecha de la factura
                                  </label>
                                  <Input
                                    name="fecha_factura"
                                    className="form-control-alternative"
                                    id="input-fecha_factura"
                                    type="date"
                                    defaultValue={date}
                                    onChange={handleFacturaChanges}
                                  />
                                </FormGroup>
                              </Col>

                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-id_orden_de_trabajo"
                                  >
                                    ID de la orden de trabajo
                                  </label>
                                  <Input
                                    type="select"
                                    name="id_orden_de_trabajo"
                                    id="select"
                                    onChange={async (evt) => {
                                      await handleChanges(evt);
                                    }}
                                  >
                                    <option> Seleccione la orden</option>
                                    {otData.map((s) => {
                                      return (
                                        <option value={s.OT_id}>
                                          {s.OT_id}
                                        </option>
                                      );
                                    })}
                                  </Input>
                                  {/* <Input
                            name="id_orden_de_trabajo"
                            className="form-control-alternative"
                            id="input-id_orden_de_trabajo"
                            type="text"
                            onChange={handleFacturaChanges}
                          /> */}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-nombre_cliente"
                                  >
                                    Nombre del cliente
                                  </label>
                                  <Input
                                    name="nombre_cliente"
                                    className="form-control-alternative"
                                    id="input-nombre_cliente"
                                    type="text"
                                    defaultValue={nombreCliente}
                                    onChange={handleFacturaChanges}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-total"
                                  >
                                    Total a facturar
                                  </label>
                                  <Input
                                    name="total"
                                    className="form-control-alternative"
                                    id="input-total"
                                    value={JSON.stringify(costos)}
                                    type="text"
                                    onChange={handleFacturaChanges}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-vehiculo"
                                  >
                                    Vehiculo
                                  </label>
                                  <Input
                                    name="vehiculo"
                                    className="form-control-alternative"
                                    id="input-vehiculo"
                                    defaultValue={vehicle}
                                    type="text"
                                    onChange={handleFacturaChanges}
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
                    <h3 className="mb-0">Listado de servicios Vendidos</h3>
                    </div> 
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Descripcion</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Sección</th>
                      <th scope="col">Impuestos</th>
                      <th scope="col">Aplicable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* tabla de servicios acm1pt */}
                    {servData.map((s, i) => {
                      return (
                        <tr>
                          <th scope="row">{s.descripcion}</th>
                          <td>{s.costo}</td>
                          {/* <td>
                            {s.estatus === false ? (
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-success" />
                                Pendiente
                              </Badge>
                            ) : (
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                                Realizado
                              </Badge>
                            )}
                          </td> */}
                          <td>{s.seccion}</td>
                          <td>{s.impuesto}</td>
                          <td>
                            {" "}
                            <Button
                              color="primary"
                              onClick={() =>
                                setCostos(
                                  costos + Number(s.costo) + Number(s.impuesto)
                                )}
                              size="sm"
                            >
                              Agregar
                            </Button>
                            
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

        <Row className="p-4">
          <Col className="order-xl-1 mb-3" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <div class="d-flex">
                    <h3 className="mb-0">Listado de productos Vendidos</h3>
                    </div> 
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Costo</th>
                      <th scope="col">Seccion</th>
                      <th scope="col">Aplicable</th>

                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {prodData.map((s) => {
                      return (
                        <tr>
                          <th scope="row">{s.nombre}</th>
                          <td>{s.cantidad}</td>
                          <td>{s.costo_unitario}</td>
                          <td>{s.seccion}</td>
                          <td>
                            {" "}
                            <Button
                              color="primary"
                              onClick={() =>
                                setCostos(costos + Number(s.costo_unitario))}
                              size="sm"
                            >
                              Agregar
                            </Button>
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

export default Tables;
