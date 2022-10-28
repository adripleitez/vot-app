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
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";

const ModalComponent = (props) => {

    const defaultService = {
        servicioid: "",
        type: "Neumáticos",
        description: "",
        cost: "",
        commission: "",
        tax: "",
        observations: "",
        status: false
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
            console.log(services);
            setServData(services);
        });
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.close(false);
    }

    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setService({ ...service, [name]: value })
        console.log(name, value);
    };

    const handleTemplateChange = (e) => {
        console.log(e.target.value);
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
                            {/* <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Agregar Servicio</h3>
                                </Col>
                                <Col className="text-right" xs="4">
                                    <Button
                                        color="primary"
                                        href="#cliente"
                                        onClick={e=>e.preventDefault}
                                        size="sm"
                                    >
                                        Guardar
                                    </Button>
                                </Col>
                            </Row>
                        </CardHeader> */}
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
                                                        {servData.map((s)=>{
                                                            return <option key={s.id} value={s.id}>{s.description}</option>
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
                                                    <Input type="select" name="type" id="select"
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
                                                        name="description"
                                                        className="form-control-alternative"
                                                        id="input-descripcion"
                                                        type="text"
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
                                                    <Input type="select" name="type" id="select-type"
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
                                                    <Input type="select" name="type" id="select-taller"
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
                                                        name="cost"
                                                        className="form-control-alternative"
                                                        id="input-costo"
                                                        placeholder="$0.00"
                                                        type="text"
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
                                                        name="tax"
                                                        className="form-control-alternative"
                                                        id="input-impuesto"
                                                        placeholder="%"
                                                        type="text"
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
                                                        name="commission"
                                                        className="form-control-alternative"
                                                        id="input-commission"
                                                        placeholder="%"
                                                        type="text"
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
                                                        name="observations"
                                                        className="form-control-alternative"
                                                        id="input-observaciones"
                                                        type="textarea"
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
                        onClick={() => this.toggleModal("exampleModal")}
                    >
                        Close
                    </Button>
                    <Button color="primary" type="button">
                        Save changes
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default ModalComponent;