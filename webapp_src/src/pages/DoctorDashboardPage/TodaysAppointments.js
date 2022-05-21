import React, { useState } from 'react';

import {
  query,
  getDocs,
  collection
} from "firebase/firestore";

import {
  db,
} from '../../firebase';

import AppointmentsList from './AppointmentsList';
import FullScreenLoaderComponent from '../../components/FullScreenLoaderComponent';

const TodaysAppointments = ({setPatient}) => {

  const [slotOneList, setSlotOneList] = useState([]);
  const [slotTwoList, setSlotTwoList] = useState([]);
  const [slotThreeList, setSlotThreeList] = useState([]);
  const [slotFourList, setSlotFourList] = useState([]);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);

  async function getDataFromFirebase() {
    setLoading1(true);
    setLoading2(true);
    setLoading3(true);
    setLoading4(true);
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    const dateInFormate = [day, month, year].join('-');

    const q1 = query(collection(db, "appointments/"+dateInFormate+"/slot1"));
    const q2 = query(collection(db, "appointments/"+dateInFormate+"/slot2"));
    const q3 = query(collection(db, "appointments/"+dateInFormate+"/slot3"));
    const q4 = query(collection(db, "appointments/"+dateInFormate+"/slot4"));

    getDocs(q1)
      .then(docs => {
        if(docs.docs.length>0) {
          let data = [];
          docs.docs.forEach((doc) => {
            data.push(doc.data())
          });
          setSlotOneList(data);
        }
      }).finally(() => {
        setLoading1(false);
      });
    
    getDocs(q2)
      .then(docs => {
        if(docs.docs.length>0) {
          let data = [];
          docs.docs.forEach((doc) => {
            data.push(doc.data())
          });
          setSlotTwoList(data);
        }
      }).finally(() => {
        setLoading2(false);
      });
    
    getDocs(q3)
      .then(docs => {
        if(docs.docs.length>0) {
          let data = [];
          docs.docs.forEach((doc) => {
            data.push(doc.data())
          });
          setSlotThreeList(data);
        }
      }).finally(() => {
        setLoading3(false);
      });
    
    getDocs(q4)
      .then(docs => {
        if(docs.docs.length>0) {
          let data = [];
          docs.docs.forEach((doc) => {
            data.push(doc.data())
          });
          setSlotFourList(data);
        }
      }).finally(() => {
        setLoading4(false);
      });
  }

  return (
    <>
    <button onClick={() => getDataFromFirebase()} className="primary-button button-lg">
      {slotOneList.length >0 || slotTwoList.length >0 || slotThreeList.length >0 || slotFourList.length >0? "Refresh":"Get Appointments"}
    </button>
    <div className="appointments-list">
    {loading1? <FullScreenLoaderComponent />: 
      slotOneList.length > 0? 
        <>
        <p className="slot-heading">Slot 1</p>
        <AppointmentsList setPatient={setPatient} appoinmentList={slotOneList} />
        </>:<></>
    }
    {loading2? <FullScreenLoaderComponent />: 
      slotTwoList.length > 0? 
        <>
        <p className="slot-heading">Slot 2</p>
        <AppointmentsList setPatient={setPatient} appoinmentList={slotTwoList} />
        </>:<></>
    }
    {loading3? <FullScreenLoaderComponent />: 
      slotThreeList.length > 0? 
        <>
        <p className="slot-heading">Slot 3</p>
        <AppointmentsList setPatient={setPatient} appoinmentList={slotThreeList} />
        </>:<></>
    }
    {loading4? <FullScreenLoaderComponent />: 
      slotFourList.length > 0? 
        <>
        <p className="slot-heading">Slot 4</p>
        <AppointmentsList setPatient={setPatient} appoinmentList={slotFourList} />
        </>:<></>
    }
    </div>
    </>
  )
}

export default TodaysAppointments;