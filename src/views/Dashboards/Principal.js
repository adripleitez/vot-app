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
    Container
  } from "reactstrap";
  // core components
  import Header from "components/Headers/HeaderGeneric.js";
  
  
  import { useState, useEffect } from "react";
  import { db } from '../../firebase'
  import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
  
  
  const Tables = () => {
    const [otData, setotData] = useState([]);
    const [search,setSearch]= useState("");
  
    const getOrder = () => {
      onSnapshot(query(collection(db, "Orden_trabajo")), (querySnapshot) => {
          const workorders = [];
          querySnapshot.forEach((doc) => {
            workorders.push({ ...doc.data(), id: doc.id });
          });
          console.log(workorders);
          setotData(workorders);
      });
    }
  
    const searcher = (e) =>{
      setSearch(e.target.value)
      //captura los caracteres que se van typeando
      console.log(e.target.value)
  
    }
  
    let results = [];
    if(!search){
      results=otData
  }
  
  else{
  
    results=otData.filter((dato)=> dato.OT_id.toLowerCase().includes(search.toLocaleLowerCase())||
    dato.estado.toLowerCase().includes(search.toLocaleLowerCase()) ||
    dato.empleado.toLowerCase().includes(search.toLocaleLowerCase()));
    
    /*results = clientData.filter((dato)=>
    dato.correo.toLowerCase().includes(search.toLocaleLowerCase())
    )*/
  }
  
  useEffect(() => {
    getOrder();
  }, []);
  
  
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
            DASHBOARDS WILL BE HERE
          </Container>
        </>
      );
    };
    
    export default Tables;