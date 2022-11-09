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
import { db } from '../../firebase'
import { collection, addDoc, doc, getDoc, query, onSnapshot } from "firebase/firestore";

const ModalComponent = (props) => {

    const defaultProduct = {
        id: "",
        nombre: "",
        seccion: "",
        costo_unitario: "",
        cantidad: "",
        OT_id: props.lastOrder
    };


    const [product, setProduct] = useState(defaultProduct);

    const [prodData, setProdData] = useState([]);

    //read product
    const getProducts = () => {
        onSnapshot(query(collection(db, "Productos")), (querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id_doc: doc.id });
            });
            setProdData(products);
        });
    }

    const handleClose = (e) => {
        e.preventDefault();
        props.close(false);
        setProduct(defaultProduct);
    }

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
        console.log(product);
    };

    const handleProduct = async (e) => {
        e.preventDefault();
        props.setProducts([...props.products, product])
        props.close(false);
        setProduct(defaultProduct);
    };

    const handleTemplateChange = async (e) => {
        console.log(e.target.value);
        const docSnap = await getDoc(doc(db, "Productos", e.target.value));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const doc = docSnap.data();
            setProduct({
                id: doc.id,
                nombre: doc.nombre,
                seccion: doc.seccion,
                costo_unitario: doc.costo_unitario,
                cantidad: "",
                OT_id: props.lastOrder
            });
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getProducts();
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
                                                        Seleccionar Producto
                                                    </label>
                                                    <Input type="select" name="type" id="select"
                                                        onChange={handleTemplateChange}>
                                                        {prodData.map((s) => {
                                                            return <option key={s.id_doc} value={s.id_doc}>{s.nombre}</option>
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
                                                        Código de Producto
                                                    </label>
                                                    <Input
                                                        name="id"
                                                        className="form-control-alternative"
                                                        id="input-codigo"
                                                        type="text"
                                                        value={product.id}
                                                        onChange={handleProductChange}
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
                                                        //value={product.seccion}
                                                        onChange={handleProductChange}>
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
                                                        Nombre
                                                    </label>
                                                    <Input
                                                        name="nombre"
                                                        className="form-control-alternative"
                                                        id="input-descripcion"
                                                        type="text"
                                                        value={product.nombre}
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
                                                        htmlFor="input-costo"
                                                    >
                                                        Costo unitario
                                                    </label>
                                                    <Input
                                                        name="costo_unitario"
                                                        className="form-control-alternative"
                                                        id="input-costo"
                                                        placeholder="$0.00"
                                                        type="text"
                                                        value={product.costo_unitario}
                                                        onChange={handleProductChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-impuesto"
                                                    >
                                                        Cantidad
                                                    </label>
                                                    <Input
                                                        name="cantidad"
                                                        className="form-control-alternative"
                                                        id="input-impuesto"
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
                        onClick={handleProduct}
                    >
                        Aceptar
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default ModalComponent;