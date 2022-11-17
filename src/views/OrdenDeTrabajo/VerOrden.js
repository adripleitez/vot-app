import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Table,
    Row,
    Col,
    Badge
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
import {useHistory} from 'react-router-dom';
import { useState, useEffect, React } from "react";
import { db } from '../../firebase'
import { collection, addDoc, query, onSnapshot, orderBy, limit, serverTimestamp, getDoc, doc, where, getDocs } from "firebase/firestore";
import ModalComponent from '../../components/Modal/ModalComponent'
import ModalProducts from '../../components/Modal/ModalProducts'
import ModalComponentChecks from '../../components/Modal/ModalComponentChecks'
import { useParams } from "react-router-dom";
import '../custom.css';

const VerOrden = () => {

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0,10);

    let params = useParams()

    useEffect(() => {
        getDocuments();
      },[]);

    const defaultClient = {
        dui: "",
        name: "",
        lastname: "",
        tel: "",
        email: "",
        type: "Física",
        repName: ""
    };

    const defaultOrder = {
        id:"",
        OT_id: "",
        encargado: "",
        estado: "",
        fecha_cierre: "",
        fecha_inicio: "",
        presupuesto: "",
        vehiculo_id: "",
        cliente_id: "",
        timestamp: serverTimestamp()
    };

    const defaultVehicle = {
        placa: "",
        tipo: "",
        numero_motor: "",
        año: "",
        marca: "",
        modelo: "",
        color: "",
        Chasis_VIN: "",
        aseguradora: ""
    };

    const defaultDiagnosis = {
        workshopRemarks: "",
        workshopManager: "",
        clientRemarks: "",
        date: date,
        kms: "",
        gas: "",
        OT_id: ""
    };

    const [order, setOrder] = useState(defaultOrder);

    const [client, setClient] = useState(defaultClient);

    const [vehicle, setVehicle] = useState(defaultVehicle);

    const [diagnosis, setDiagnosis] = useState(defaultDiagnosis);

    const [services, setServices] = useState([]);

    const [modalService, setModalService] = useState(false);

    const [modalProducts, setModalProducts] = useState(false);

    const [modalChecks, setModalChecks] = useState(false);

    const getDocuments = async (e) => {
        let clientId;
        let vehicleId;
        let orderState;

        if (params.id) {
            const q = query(collection(db, "Orden_trabajo"), where("OT_id", "==", params.id), limit(1));
            const docSnap = await getDocs(q);
            docSnap.forEach((d) => {
                const doc = d.data();
                clientId = doc.cliente_id;
                vehicleId = doc.vehiculo_id;
                orderState = doc.estado

                setOrder({
                    id: doc.id,
                    OT_id: doc.OT_id,
                    encargado: doc.encargado,
                    estado: doc.estado,
                    fecha_cierre: doc.fecha_cierre,
                    fecha_inicio: doc.fecha_inicio,
                    presupuesto: doc.presupuesto,
                    vehiculo_id: doc.vehiculo_id,
                    cliente_id: doc.cliente_id,
                    timestamp: doc.timestamp
                });
              });

            if (orderState !== "ACTIVA"){
                document.getElementById("state").classList.add("form-control-custom-cancel");
                document.getElementById("state").classList.remove("form-control-custom-active");
            }else{
                document.getElementById("state").classList.add("form-control-custom-active");
                document.getElementById("state").classList.remove("form-control-custom-cancel");
            }
            
            const q1 = query(collection(db, "Cliente"), where("dui", "==", clientId), limit(1));
            const docSnap1 = await getDocs(q1);
            docSnap1.forEach((d) => {
                const doc = d.data();
                setClient({
                    dui: doc.dui,
                    name: doc.name,
                    lastname: doc.lastname,
                    tel: doc.tel,
                    email: doc.email,
                    type: doc.type,
                    repName: doc.repName
                });
              });

            const q2 = query(collection(db, "Vehiculos"), where("placa", "==", vehicleId), limit(1));
            const docSnap2 = await getDocs(q2);
            docSnap2.forEach((d) => {
                const doc = d.data();
                setVehicle({
                    placa: doc.placa,
                    tipo: doc.tipo,
                    numero_motor: doc.numero_motor,
                    año: doc.año,
                    marca: doc.marca,
                    modelo: doc.modelo,
                    color: doc.color,
                    Chasis_VIN: doc.Chasis_VIN,
                    aseguradora: doc.aseguradora
                });
              });

              const q3 = query(collection(db, "Diagnostico"), where("OT_id", "==", params.id), limit(1));
              const docSnap3 = await getDocs(q3);
              docSnap3.forEach((d) => {
                  const doc = d.data();
                  setDiagnosis({
                      workshopManager: doc.workshopManager,
                      workshopRemarks: doc.workshopRemarks,
                      numero_motor: doc.numero_motor,
                      clientRemarks: doc.clientRemarks,
                      date: doc.date,
                      kms: doc.kms,
                      gas: doc.gas
                  });
                });

                const q4 = query(collection(db, "ServiciosRealizados"), where("OT_id", "==", params.id));
                const docSnap4 = await getDocs(q4);
                const s = [];
                docSnap4.forEach((doc) => {
                    s.push({ ...doc.data(), id: doc.id });
                    setServices(s);
                });
        }
    };

    const handleDiagnosisChange = (e) => {
        const { name, value } = e.target;
        //setDiagnosis({ ...diagnosis, [name]: value, OT_id: lastOrder })
        console.log(diagnosis)
    };

    const handleModalService = (e) => {
        e.preventDefault();
        setModalService(true);
    };

    const handleModalProducts = (e) => {
        e.preventDefault();
        setModalProducts(true);
    };

    const handleChecks = (e) => {
        e.preventDefault();
        setModalChecks(true);
    };

    //save client
    const handleClient =  async(e) => {
        e.preventDefault();
        await addDoc(collection(db, 'Cliente'), client);
    };

    //save vehicle
    const handleVehicle = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'Vehiculos'), vehicle);
    };

    //save diagnosis
    const handleDiagnosis = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'Diagnostico'), diagnosis);
    };

     //save workshop
     const handleWorkshop = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'Diagnostico'), diagnosis);
    };

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="mb-3">
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Orden de trabajo</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row className="justify-content-left">
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-id-orden"
                                            >
                                                ID
                                            </label>

                                            <h1
                                                id="state"
                                            >
                                                {order.OT_id} {order.estado}
                                            </h1>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-date"
                                            >
                                                Fecha Registrado
                                            </label>
                                            <Input
                                                name="date"
                                                className="form-control-alternative"
                                                id="input-date"
                                                defaultValue={order.fecha_inicio}
                                                type="date"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                        <FormGroup>
                                            <label
                                                className="form-control-label"
                                                htmlFor="input-encargado"
                                            >
                                                Nombre Encargado
                                            </label>
                                            <Input
                                                name="encargado"
                                                className="form-control-alternative"
                                                id="input-encargado"
                                                defaultValue={order.encargado}
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="order-xl-1 mb-3" xl="6">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Datos del cliente</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select"
                                                        className="form-control-label"
                                                    >
                                                        Selecciona tipo de Cliente
                                                    </label>
                                                    <h2 className="form-control-custom"> {client.type} </h2>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-dui"
                                                    >
                                                        DUI Persona / NIT Empresa
                                                    </label>
                                                    <h2 className="form-control-custom"> {client.dui} </h2>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-name"
                                                    >
                                                        Nombre del cliente / empresa
                                                    </label>
                                                    <h2 className="form-control-custom"> {client.name} </h2>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-tel"
                                                    >
                                                        Teléfono
                                                    </label>
                                                    <h2 className="form-control-custom"> {client.tel} </h2>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Correo Electronico
                                                    </label>
                                                    <h2 className="form-control-custom"> {client.email} </h2>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-name"
                                                    >
                                                        Nombre del representante
                                                    </label>
                                                    <h2 className="form-control-custom"> {client.repName} </h2>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col className="order-xl-1 mb-3" xl="6">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Datos Vehiculo</h3>
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
                                                        htmlFor="input-number-plate"
                                                    >
                                                        Placa
                                                    </label>
                                                    <h2 className="form-control-custom"> {vehicle.placa} </h2>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-num_motor"
                                                    >
                                                        Numero Motor
                                                    </label>
                                                    <h2 className="form-control-custom"> {vehicle.numero_motor} </h2>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Año
                                                    </label>
                                                    <h2 className="form-control-custom"> {vehicle.año} </h2>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-brand"
                                                    >
                                                        Marca
                                                    </label>
                                                    <h2 className="form-control-custom"> {vehicle.marca} </h2>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-model"
                                                    >
                                                        Modelo
                                                    </label>
                                                    <h2 className="form-control-custom"> {vehicle.modelo} </h2>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-color"
                                                    >
                                                        Color
                                                    </label>
                                                    <h2 className="form-control-custom"> {vehicle.color} </h2>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-VIN"
                                                    >
                                                        Chasis VIN
                                                    </label>
                                                    <h2 className="form-control-custom"> {vehicle.Chasis_VIN} </h2>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                <label
                                                    className="form-control-label"
                                                    htmlFor="input-aseguradora"
                                                >
                                                    Aseguradora
                                                </label>
                                                <h2 className="form-control-custom"> {vehicle.aseguradora} </h2>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select-tipo-vehiculo"
                                                        className="form-control-label"
                                                    >
                                                        Selecciona tipo de Vehiculo
                                                    </label>
                                                    <h2 className="form-control-custom"> {vehicle.tipo} </h2>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Diagnóstico</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                            <div className="pl-lg-4">
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-observaciontes-taller"
                                        >
                                            Observaciones del Taller
                                        </label>
                                        <Input
                                            name = "workshopRemarks"
                                            className="form-control-alternative"
                                            defaultValue={diagnosis.workshopRemarks}
                                            id="input-observaciontes-taller"
                                            type="text"
                                            onChange = {handleDiagnosisChange}
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-observaciontes-cliente"
                                        >
                                            Observaciones del Cliente
                                        </label>
                                        <Input
                                            name="clientRemarks"
                                            className="form-control-alternative"
                                            defaultValue={diagnosis.clientRemarks}
                                            id="input-observaciontes-cliente"
                                            type="text"
                                            onChange = {handleDiagnosisChange}
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-fecha-diag"
                                    >
                                        Fecha de Diagnóstico
                                    </label>
                                    <Input
                                        name="date"
                                        className="form-control-alternative"
                                        id="fecha-diag"
                                        defaultValue={diagnosis.date}
                                        type="date"
                                        onChange = {handleDiagnosisChange}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-km"
                                    >
                                        KMs Entrada
                                    </label>
                                    <Input
                                        name="kms"
                                        className="form-control-alternative"
                                        id="input-km"
                                        type="number"
                                        onChange = {handleDiagnosisChange}
                                        defaultValue={diagnosis.kms}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col lg="4">
                                    <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-gasolina"
                                    >
                                        Gasolina de entrada
                                    </label>
                                    <Input
                                        name="gas"
                                        className="form-control-alternative"
                                        id="input-gasolina"
                                        type="number"
                                        onChange = {handleDiagnosisChange}
                                        defaultValue={diagnosis.gas}
                                    />
                                    </FormGroup>
                                </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="input-recibido-por"
                                        >
                                            Recibido por
                                        </label>
                                        <Input
                                            name="workshopManagerr"
                                            className="form-control-alternative"
                                            id="input-recibido-por"
                                            type="text"
                                            defaultValue={diagnosis.workshopManager}
                                        />
                                        </FormGroup>
                                    </Col>
                                    {/* <Col className="text-right mt-4" xs="2">
                                        <Button
                                            color="primary"
                                            href="#revisiones"
                                            onClick={handleChecks}
                                            size="m"
                                        >
                                            Ver Revisiones
                                        </Button>
                                        <ModalComponentChecks open={modalChecks} close={setModalChecks} idordenTrabajo={lastDoc}/>
                                    </Col> */}
                                </Row>
                            </div>
                                
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Listado de servicios</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#servicos"
                                            onClick={handleModalService}
                                            size="sm"
                                        >
                                            Agregar
                                        </Button>
                                    </Col>
                                </Row>
                                <ModalComponent open={modalService} close={setModalService}/>
                            </CardHeader>
                            <CardBody>
                            <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Descripcion</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Sección</th>
                                            <th scope="col">Observaciones</th>
                                            <th scope="col">Impuestos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map((s, i) => {
                                            return <tr key={i}>
                                                <th scope="row">{s.descripcion}</th>
                                                <td>{s.costo}</td>
                                                <td>
                                                    {s.estatus === false
                                                        ? <Badge color="" className="badge-dot mr-4">
                                                            <i className="bg-success" />
                                                            Pendiente
                                                        </Badge>
                                                        : <Badge color="" className="badge-dot mr-4">
                                                            <i className="bg-warning" />
                                                            Realizado
                                                        </Badge>
                                                    }
                                                </td>
                                                <td>{s.seccion}</td>
                                                <td>{s.observaciones}</td>
                                                <td>{s.impuesto}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Listado de productos</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color="primary"
                                            href="#servicos"
                                            onClick={handleModalProducts}
                                            size="sm"
                                        >
                                            Agregar
                                        </Button>
                                    </Col>
                                </Row>
                                <ModalProducts open={modalProducts} close={setModalProducts}/>
                            </CardHeader>
                            <CardBody>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Costo unitario</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Sección</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Cambio de aceite</th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-success" />
                                                    Realizado
                                                </Badge>
                                            </td>

                                            <td>Sección 1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Cambio de aceite</th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>Sección 1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Cambio de aceite</th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>Sección 1</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Cambio de aceite</th>
                                            <td>$10 USD</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    Pendiente
                                                </Badge>
                                            </td>

                                            <td>Sección 1</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                        <Row className="justify-content-right mt-3">
                            <Col lg="10" >
                            
                            </Col>
                            <Col lg="2" >
                                <Button
                                    color="primary"
                                    href="#guardarOrden"
                                    onClick={handleChecks}
                                    size="m"
                                >
                                    Guardar Orden de Trabajo
                                </Button>
                            </Col>
                            
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default VerOrden;
