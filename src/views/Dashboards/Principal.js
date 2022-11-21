import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
} from "reactstrap";
// core components
import Header from "components/Headers/HeaderGeneric.js";


import { useState, useEffect } from "react";
import { db } from '../../firebase'
import { collection, query, onSnapshot, getCountFromServer, where } from "firebase/firestore";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2"
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4,
} from "variables/charts.js";

const Tables = () => {
    const [otData, setotData] = useState([]);
    // const [servData, setServData] = useState([]);
    // const [prodData, setProdData] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [selledProducts, setSelledProducts] = useState([]);
    const [performedServices, setPerformedServices] = useState([]);

    const getOrder = () => {
        onSnapshot(query(collection(db, "Orden_trabajo")), (querySnapshot) => {
            const workorders = [];
            querySnapshot.forEach((doc) => {
                workorders.push({ ...doc.data(), id: doc.id });
            });
            setotData(workorders);
        });
    }

    const getSelledProducts = async () => {
        const coll = collection(db, "ProductosVendidos");
        const query_ = query(coll);
        const snapshot = await getCountFromServer(query_);
        setSelledProducts(snapshot.data().count);
    }

    const getPerformedServices = async () => {
        const coll = collection(db, "ServiciosRealizados");
        const query_ = query(coll);
        const snapshot = await getCountFromServer(query_);
        setPerformedServices(snapshot.data().count);
    }

    const getActiveOrders = async () => {
        const coll = collection(db, "Orden_trabajo");
        const query_ = query(coll, where('estado', '==', 'ACTIVA'));
        const snapshot = await getCountFromServer(query_);
        setActiveOrders(snapshot.data().count);
    }


    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    useEffect(() => {
        getOrder();
        getActiveOrders();
        getSelledProducts();
        getPerformedServices();
    }, []);

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1 mb-3" xl="2">
                        <Row className="justify-content-left mb-1 h-25" xs="1">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody className="mt-4">
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Ordenes
                                            </CardTitle>
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-2"
                                            >
                                                Activas
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">
                                                {activeOrders}
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                <i className="fas fa-check" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                        <Row className="justify-content-left mb-1 h-25" xs="1">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody className="mt-4">
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Servicios
                                            </CardTitle>
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-2"
                                            >
                                                Realizados
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">
                                                {performedServices}
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                                                <i className="fas fa-wrench" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                        <Row className="justify-content-left mb-1 h-25" xs="1">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody className="mt-4">
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-0"
                                            >
                                                Productos
                                            </CardTitle>
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-2"
                                            >
                                                Vendidos
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">
                                                {selledProducts}
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                <i className="fas fa-chart-bar" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                        <Row className="justify-content-left mb-1 h-25" xs="1">
                            <Card className="card-stats mb-4 mb-xl-0">
                                <CardBody className="mt-4">
                                    <Row>
                                        <div className="col">
                                            <CardTitle
                                                tag="h5"
                                                className="text-uppercase text-muted mb-2"
                                            >
                                                Ingresos
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">
                                                20,000
                                            </span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                                                <i className="fas fa-dollar-sign" />
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Row>
                    </Col>

                    <Col className="order-xl-1" xl="10">
                        <Row className="h-100">
                            <Col>
                                <Row className="mb-3">
                                    <Col lg="6" className="mr-n3 ml-2">
                                        <Card className="bg-default shadow">
                                            <CardHeader className="bg-transparent">
                                                <Row className="align-items-center">
                                                    <div className="col">
                                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                                            2022
                                                        </h6>
                                                        <h2 className="text-white mb-0">Ordenes de Trabajo</h2>
                                                    </div>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* Chart */}
                                                <div className="chart">
                                                    <Line
                                                        data={chartExample1.data}
                                                        options={chartExample1.options}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="6" className="mr-n3">
                                        <Card className="bg-secondary shadow">
                                            <CardHeader className="bg-transparent">
                                                <Row className="align-items-center">
                                                    <div className="col">
                                                        <h6 className="text-uppercase text-dark ls-1 mb-1">
                                                            2022
                                                        </h6>
                                                        <h2 className="text-dark mb-0">Ventas x Proveedor</h2>
                                                    </div>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* Chart */}
                                                <div className="chart">
                                                    <Bar
                                                        data={chartExample4.data}
                                                        options={chartExample4.options}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="6" className="mr-n3 ml-2">
                                        <Card className="bg-secondary shadow">
                                            <CardHeader className="bg-transparent">
                                                <Row className="align-items-center">
                                                    <div className="col">
                                                        <h6 className="text-uppercase text-dark ls-1 mb-1">
                                                            2022
                                                        </h6>
                                                        <h2 className="text-dark mb-0">Ingresos Servicios</h2>
                                                    </div>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* Chart */}
                                                <div className="chart">
                                                    <Line
                                                        data={chartExample2.data}
                                                        options={chartExample2.options}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="6">
                                        <Card className="bg-default shadow">
                                            <CardHeader className="bg-transparent">
                                                <Row className="align-items-center">
                                                    <div className="col">
                                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                                            2022
                                                        </h6>
                                                        <h2 className="text-white mb-0">Ingresos Productos</h2>
                                                    </div>
                                                </Row>
                                            </CardHeader>
                                            <CardBody>
                                                {/* Chart */}
                                                <div className="chart">
                                                    <Line
                                                        data={chartExample3.data}
                                                        options={chartExample1.options}
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default Tables;