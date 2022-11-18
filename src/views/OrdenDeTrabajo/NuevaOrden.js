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
    Badge,
    Alert
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";
//import {useHistory} from 'react-router-dom';
import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { collection, addDoc, query, onSnapshot, orderBy, limit, serverTimestamp, getDoc, doc, updateDoc } from "firebase/firestore";
import ModalComponent from '../../components/Modal/ModalComponent'
import ModalProducts from '../../components/Modal/ModalProducts'
import ModalComponentChecks from '../../components/Modal/ModalComponentChecks'
//import { useHistory } from 'react-router-dom';

const Profile = () => {

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substring(0, 10);

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
        OT_id: "",
        encargado: "",
        estado: "ACTIVA",
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

    const defaultFlags = {
        radioExisteCliente: false,
        radioExisteVehiculo: false,
        selectedClient: "",
        selectedVehicle: ""
    };

    const defaultChecks = {
        radioLlanta: "Si",
        radioMica: "Si",
        radiollave: "Si",
        radioherramienta: "Si",
        radioTriangulo: "Si",
        radioAntena: "Si",
        radioInterior: "Si",
        radioExterior: "Si",
        radioRuedas: "Si",
        radioAdornos: "Si",
        radioBrazos: "Si",
        radioExtinguidor: "Si",
        radioLoderas: "Si",
        radioRespaldo: "Si",
        radioTarjeta: "Si",
        radioCasetera: "Si",
        radioCricos: "Si",
        radioLuces: "Si",
        radioAire: "Si",
        radioBateria: "Si",
        OT_id: ""
    };


    //const history = useHistory();

    const [order, setOrder] = useState(defaultOrder);

    const [client, setClient] = useState(defaultClient);

    const [selectClients, setSelectClients] = useState([]);

    const [selectVehicles, setSelectVehicles] = useState([]);

    const [checks, setChecks] = useState(defaultChecks);

    const [vehicle, setVehicle] = useState(defaultVehicle);

    const [diagnosis, setDiagnosis] = useState(defaultDiagnosis);

    const [modalService, setModalService] = useState(false);

    const [modalProducts, setModalProducts] = useState(false);

    const [modalChecks, setModalChecks] = useState(false);

    const [lastOrder, setLastOrder] = useState([]);

    const [services, setServices] = useState([]);

    const [products, setProducts] = useState([]);

    const [visible, setVisible] = useState(false);

    const [error, setError] = useState(false);

    const [flags, setFlags] = useState(defaultFlags);

    const onDismiss = () => {
        setVisible(false);
    }

    const onDismiss2 = () => {
        setError(false);
    }

    const lastDoc = () => {
        onSnapshot(query(collection(db, "Orden_trabajo"), orderBy("timestamp", "desc"), limit(1)), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            let id = docs[0].OT_id.split(/-0*/);
            setLastOrder("OT-" + (parseInt(id[1]) + 1).toString().padStart(6, '0'));
            setOrder({ ...order, OT_id: "OT-" + (parseInt(id[1]) + 1).toString().padStart(6, '0'), fecha_inicio: date })
            setDiagnosis({ ...diagnosis, OT_id: "OT-" + (parseInt(id[1]) + 1).toString().padStart(6, '0') });
            setChecks({ ...checks, OT_id: "OT-" + (parseInt(id[1]) + 1).toString().padStart(6, '0') });
        });
    };

    const getClients = () => {
        onSnapshot(query(collection(db, "Cliente")), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setSelectClients(docs);
        });
    };

    const getVehicles = () => {
        onSnapshot(query(collection(db, "Vehiculos")), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setSelectVehicles(docs);
        });
    };

    const selectVehicleChange = async (e) => {
        if (e.target.value !== "default") {
            const docSnap = await getDoc(doc(db, "Vehiculos", e.target.value));
            if (docSnap.exists()) {
                const doc = docSnap.data();
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
                setFlags({ selectedVehicle: e.target.value })
            } else {
                console.log("No such document!");
            }
        }
    };

    const selectClientChange = async (e) => {
        if (e.target.value !== "default") {
            const docSnap = await getDoc(doc(db, "Cliente", e.target.value));
            if (docSnap.exists()) {
                const doc = docSnap.data();
                setClient({
                    dui: doc.dui,
                    name: doc.name,
                    lastname: doc.lastname,
                    tel: doc.tel,
                    email: doc.email,
                    type: doc.type,
                    repName: doc.repName
                });
                setFlags({ selectedClient: e.target.value })
            } else {
                console.log("No such document!");
            }
        }
    };

    useEffect(() => {
        lastDoc();
        getVehicles();
        getClients();
    });

    const handleOrderChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value })
    };

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value })
    };

    const handleVehicleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value })
    };

    const handleDiagnosisChange = (e) => {
        const { name, value } = e.target;
        setDiagnosis({ ...diagnosis, [name]: value })
        console.log(diagnosis)
    };

    const handleFlagsChange = (e) => {
        const { name, value } = e.target;
        setFlags({ ...flags, [name]: value === "No" ? false : true });
        if (name === "radioExisteCliente") {
            if (value === "No") {
                setClient(defaultClient);
                setFlags({ selectedClient: "" });
            }
        } else {
            if (value === "No") {
                setVehicle(defaultVehicle);
                setFlags({ selectedVehicle: "" });
            }
        }
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

    const saveOrdenTrabajo = async (e) => {
        e.preventDefault();
        console.log(services);
        console.log(products);
        const OT = {
            ...order,
            vehiculo_id: vehicle.placa,
            cliente_id: client.dui
        }

        try {
            //Guardando servicios
            for (const service of services) {
                await addDoc(collection(db, 'ServiciosRealizados'), service);
            }

            //Guardando productos
            for (const product of products) {
                await addDoc(collection(db, 'ProductosVendidos'), product);
            }

            if (flags.selectedClient === "") {
                await addDoc(collection(db, 'Cliente'), client);
            } else {
                await updateDoc(doc(db, 'Cliente', flags.selectedClient), client)
            }
            if (flags.selectedVehicle === "") {
                await addDoc(collection(db, 'Vehiculos'), vehicle);
            } else {
                await updateDoc(doc(db, 'Vehiculos', flags.selectedVehicle), vehicle)
            }

            await addDoc(collection(db, 'Orden_trabajo'), OT);
            await addDoc(collection(db, 'Diagnostico'), diagnosis);
            await addDoc(collection(db, 'Revisiones'), checks);

            setVisible(true);

        } catch (error) {
            setError(true);
        }

    };

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Alert color="success" isOpen={visible} toggle={onDismiss} fade={false}>
                    Orden creada exitosamente <i className="ni ni-check-bold" />
                </Alert>
                <Alert color="danger" isOpen={error} toggle={onDismiss2} fade={false}>
                    Orden no creada <i className="ni ni-check-bold" />
                </Alert>
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
                                            <Input
                                                name="id"
                                                className="form-control-alternative"
                                                id="input-id-orden"
                                                defaultValue={lastOrder}
                                                type="text"
                                                onChange={handleOrderChange}
                                            />
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
                                                defaultValue={date}
                                                onChange={handleOrderChange}
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
                                                type="text"
                                                onChange={handleOrderChange}
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
                                        <Row className="justify-content-left">
                                            <Col lg="12">
                                                <label className="form-control-label"> ¿Existe el cliente? </label>
                                                <Row className="justify-content-left mb-3">
                                                    <Col lg="4">
                                                        <FormGroup check><Input type="radio" name="radioExisteCliente" defaultChecked={true} value="No" onChange={handleFlagsChange} />{' '} No </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup check><Input type="radio" name="radioExisteCliente" value="Si" onChange={handleFlagsChange} />{' '} Si </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-left">
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                    >
                                                        Seleccionar Cliente
                                                    </label>
                                                    <Input type="select" name="type" id="select"
                                                        onChange={selectClientChange}
                                                        disabled={!flags.radioExisteCliente}>
                                                        <option hidden value="default" selected={!flags.radioExisteCliente}>Selecciona un cliente</option>
                                                        {selectClients.map((s) => {
                                                            return <option key={s.id} value={s.id}>{s.dui} - {s.name}</option>
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select"
                                                        className="form-control-label"
                                                    >
                                                        Selecciona tipo de Cliente
                                                    </label>
                                                    <Input type="select" name="type" id="select"
                                                        value={client.type}
                                                        onChange={handleClientChange}>
                                                        <option>Física</option>
                                                        <option>Jurídica</option>
                                                    </Input>
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
                                                    <Input
                                                        name="dui"
                                                        className="form-control-alternative"
                                                        id="input-dui"
                                                        type="text"
                                                        value={client.dui}
                                                        onChange={handleClientChange}
                                                    />
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
                                                    <Input
                                                        name="name"
                                                        className="form-control-alternative"
                                                        id="input-name"
                                                        type="text"
                                                        value={client.name}
                                                        onChange={handleClientChange}
                                                    />
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
                                                    <Input
                                                        name="tel"
                                                        className="form-control-alternative"
                                                        id="input-tel"
                                                        type="text"
                                                        value={client.tel}
                                                        onChange={handleClientChange}
                                                    />
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
                                                    <Input
                                                        name="email"
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        type="email"
                                                        value={client.email}
                                                        onChange={handleClientChange}
                                                    />
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
                                                    <Input
                                                        name="repName"
                                                        className="form-control-alternative"
                                                        id="input-name"
                                                        type="text"
                                                        value={client.repName}
                                                        onChange={handleClientChange}
                                                    />
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
                                        <Row className="justify-content-left">
                                            <Col lg="12">
                                                <label className="form-control-label"> ¿Existe el vehículo? </label>
                                                <Row className="justify-content-left mb-3">
                                                    <Col lg="4">
                                                        <FormGroup check><Input type="radio" name="radioExisteVehiculo" defaultChecked={true} value="No" onChange={handleFlagsChange} />{' '} No </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup check><Input type="radio" name="radioExisteVehiculo" value="Si" onChange={handleFlagsChange} />{' '} Si </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-left">
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                    >
                                                        Seleccionar Vehiculo
                                                    </label>
                                                    <Input type="select" name="type" id="select" disabled={!flags.radioExisteVehiculo}
                                                        onChange={selectVehicleChange}
                                                    >
                                                        <option hidden value="default" selected={!flags.radioExisteVehiculo}>Selecciona un vehiculo</option>
                                                        {selectVehicles.map((s) => {
                                                            return <option key={s.id} value={s.id}>{s.placa} - {s.marca} - {s.modelo}</option>
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-number-plate"
                                                    >
                                                        Placa
                                                    </label>
                                                    <Input
                                                        name="placa"
                                                        className="form-control-alternative"
                                                        id="input-number-plate"
                                                        type="text"
                                                        value={vehicle.placa}
                                                        onChange={handleVehicleChange}
                                                    />
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
                                                    <Input
                                                        name="numero_motor"
                                                        className="form-control-alternative"
                                                        id="input-num-motor"
                                                        type="text"
                                                        value={vehicle.numero_motor}
                                                        onChange={handleVehicleChange}
                                                    />
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
                                                    <Input
                                                        name="año"
                                                        className="form-control-alternative"
                                                        id="input-year"
                                                        type="text"
                                                        value={vehicle.año}
                                                        onChange={handleVehicleChange}
                                                    />
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
                                                    <Input
                                                        name="marca"
                                                        className="form-control-alternative"
                                                        id="input-brand"
                                                        type="text"
                                                        value={vehicle.marca}
                                                        onChange={handleVehicleChange}
                                                    />
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
                                                    <Input
                                                        name="modelo"
                                                        className="form-control-alternative"
                                                        id="input-model"
                                                        type="text"
                                                        value={vehicle.modelo}
                                                        onChange={handleVehicleChange}
                                                    />
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
                                                    <Input
                                                        type="text"
                                                        name="color"
                                                        id="select"
                                                        list="color"
                                                        onChange={handleVehicleChange}
                                                    />
                                                        <datalist id="color">
                                                            <option>Rojo</option>
                                                            <option>Azul</option>
                                                            <option>Morado</option>
                                                            <option>Amarillo</option>
                                                            <option>Naranja</option>
                                                            <option>Negro</option>
                                                            <option>Blanco</option>
                                                            <option>Verde</option>
                                                            <option>Dorado</option>
                                                            <option>Plateado</option>
                                                            <option>Café</option>
                                                        </datalist>

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
                                                    <Input
                                                        name="Chasis_VIN"
                                                        className="form-control-alternative"
                                                        id="input-vin"
                                                        type="text"
                                                        value={vehicle.Chasis_VIN}
                                                        onChange={handleVehicleChange}
                                                    />
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
                                                    <Input
                                                        name="aseguradora"
                                                        className="form-control-alternative"
                                                        defaultValue=""
                                                        id="input-aseguradora"
                                                        type="text"
                                                        value={vehicle.aseguradora}
                                                        onChange={handleVehicleChange}
                                                    />
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
                                                        Selecciona tipo de vehiculo
                                                    </label>
                                                    <Input type="select" name="tipo" id="select-tipo-vehiculo"
                                                        value={vehicle.tipo}
                                                        onChange={handleVehicleChange}>
                                                        <option>Particular</option>
                                                        <option>Autobus</option>
                                                        <option>Motocicleta</option>
                                                        <option>Camiones</option>
                                                    </Input>
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
                                                    name="workshopRemarks"
                                                    className="form-control-alternative"
                                                    defaultValue=""
                                                    id="input-observaciontes-taller"
                                                    type="text"
                                                    onChange={handleDiagnosisChange}
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
                                                    defaultValue=""
                                                    id="input-observaciontes-cliente"
                                                    type="text"
                                                    onChange={handleDiagnosisChange}
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
                                                    defaultValue={date}
                                                    type="date"
                                                    onChange={handleDiagnosisChange}
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
                                                    onChange={handleDiagnosisChange}
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
                                                    onChange={handleDiagnosisChange}
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
                                                    name="workshopManager"
                                                    className="form-control-alternative"
                                                    defaultValue=""
                                                    id="input-recibido-por"
                                                    type="text"
                                                    onChange={handleDiagnosisChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="text-right mt-4" xs="2">
                                            <Button
                                                color="primary"
                                                href="#revisiones"
                                                onClick={handleChecks}
                                                size="m"
                                            >
                                                Ver Revisiones
                                            </Button>
                                            <ModalComponentChecks open={modalChecks} close={setModalChecks} checks={checks} setChecks={setChecks} lastOrder={lastOrder} />
                                        </Col>
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
                                <ModalComponent open={modalService} close={setModalService} setServices={setServices} services={services} lastOrder={lastOrder} isNew={true}/>
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
                                <ModalProducts open={modalProducts} close={setModalProducts} setProducts={setProducts} products={products} lastOrder={lastOrder} isNew={true}/>
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
                                        {products.map((s, i) => {
                                            return <tr key={i}>
                                                <th scope="row">{s.nombre}</th>
                                                <td>{s.costo_unitario}</td>
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
                                                <td>{s.cantidad}</td>
                                                <td>{s.seccion}</td>
                                            </tr>
                                        })}
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
                                    onClick={saveOrdenTrabajo}
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

export default Profile;
