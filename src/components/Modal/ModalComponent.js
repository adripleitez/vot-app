import { React, useState, useEffect } from 'react';
import {
    Button,
    Modal,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import { db } from './../../firebase'
import { collection, doc, getDoc, query, onSnapshot } from "firebase/firestore";

const ModalComponent = (props) => {

    const defaultService = {
        servicioid: "",
        seccion: "Neumáticos",
        descripcion: "",
        costo: "",
        comision: "",
        impuesto: "",
        observaciones: "",
        tipo: "",
        taller: "",
        OT_id: props.lastOrder,
        estatus: false
    };


    const [service, setService] = useState(defaultService);

    const [servData, setServData] = useState([]);

    //read service
    const getServices = () => {
        onSnapshot(query(collection(db, "Servicio")), (querySnapshot) => {
            const services = [];
            querySnapshot.forEach((doc) => {
                services.push({ ...doc.data(), id: doc.id });
            });
            setServData(services);
        });
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.close(false);
        setService(defaultService);
    }

    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setService({ ...service, [name]: value })
    };

    const handleService = async (e) => {
        e.preventDefault();
        props.setServices([...props.services, service])
        props.close(false);
        setService(defaultService);
    };

    const handleTemplateChange = async (e) => {
        console.log(e.target.value);
        const docSnap = await getDoc(doc(db, "Servicio", e.target.value));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const doc = docSnap.data();
            setService({
                servicioid: doc.servicioid,
                seccion: doc.seccion,
                descripcion: doc.descripcion,
                costo: doc.costo,
                comision: doc.comision,
                impuesto: doc.impuesto,
                observaciones: doc.observaciones,
                tipo: doc.tipo,
                taller: doc.taller,
                estatus: false,
                OT_id: props.lastOrder,
            });
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <>
            <Modal size="lg" className="modal-dialog-centered"
                isOpen={props.open}>
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={handleClose}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body mt--4">
                    <Row className="ml--2 mr--2">
                        <Card className="bg-secondary shadow">
                            <CardBody>
                                <Form>
                                    <div className="pl-lg-4">
                                        <Row className="justify-content-left">
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-id-orden"
                                                    >
                                                        Seleccionar Servicio
                                                    </label>
                                                    <Input type="select" name="type" id="select"
                                                        onChange={handleTemplateChange}>
                                                        {servData.map((s) => {
                                                            return <option key={s.id} value={s.id}>{s.descripcion}</option>
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
                                                        htmlFor="input-codigo"
                                                    >
                                                        Código de Servicio
                                                    </label>
                                                    <Input
                                                        name="servicioid"
                                                        className="form-control-alternative"
                                                        id="input-codigo"
                                                        type="text"
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select"
                                                        className="form-control-label"
                                                    >
                                                        Sección
                                                    </label>
                                                    <Input type="select" name="seccion" id="select"
                                                        //value={service.seccion}
                                                        onChange={handleServiceChange}>
                                                        <option>Neumáticos</option>
                                                        <option>Revisiones</option>
                                                        <option>Baterías / Arranques</option>
                                                        <option>Frenos</option>
                                                        <option>Reparación Motor</option>
                                                        <option>Reparación Caja</option>
                                                        <option>Amortiguadores</option>
                                                        <option>Accesorios de tienda y alfombrilla</option>
                                                        <option>Sonido y multimedia</option>
                                                        <option>Reparación Carrocería</option>
                                                        <option>Reparación Mecánica</option>
                                                        <option>Otro</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-descripcion"
                                                    >
                                                        Descripción
                                                    </label>
                                                    <Input
                                                        name="descripcion"
                                                        className="form-control-alternative"
                                                        id="input-descripcion"
                                                        type="text"
                                                        value={service.descripcion}
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select-type"
                                                        className="form-control-label"
                                                    >
                                                        Tipo de Servicio
                                                    </label>
                                                    <Input type="select" name="tipo"
                                                        id="select-type"
                                                        //value={service.tipo}
                                                        onChange={handleServiceChange}>
                                                        <option>Interno</option>
                                                        <option>Externo</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        htmlFor="select-taller"
                                                        className="form-control-label"
                                                    >
                                                        Taller
                                                    </label>
                                                    <Input type="select" name="taller" id="select-taller"
                                                    value={service.taller}
                                                        onChange={handleServiceChange}>
                                                        <option>LA CHOLA</option>
                                                        <option>123 TALLER</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-costo"
                                                    >
                                                        Costo
                                                    </label>
                                                    <Input
                                                        name="costo"
                                                        className="form-control-alternative"
                                                        id="input-costo"
                                                        placeholder="$0.00"
                                                        type="text"
                                                        value={service.costo}
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-impuesto"
                                                    >
                                                        Impuesto
                                                    </label>
                                                    <Input
                                                        name="impuesto"
                                                        className="form-control-alternative"
                                                        id="input-impuesto"
                                                        placeholder="%"
                                                        type="text"
                                                        value={service.impuesto}
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-commission"
                                                    >
                                                        Comisión
                                                    </label>
                                                    <Input
                                                        name="comision"
                                                        className="form-control-alternative"
                                                        id="input-commission"
                                                        placeholder="%"
                                                        type="text"
                                                        value={service.impuesto}
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-observaciones"
                                                    >
                                                        Observaciones
                                                    </label>
                                                    <Input
                                                        name="observaciones"
                                                        className="form-control-alternative"
                                                        id="input-observaciones"
                                                        type="textarea"
                                                        value={service.observaciones}
                                                        onChange={handleServiceChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Row>
                </div>
                <div className="modal-footer">
                    <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        color="primary" 
                        type="button"
                        onClick={handleService}
                    >
                        Aceptar
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default ModalComponent;