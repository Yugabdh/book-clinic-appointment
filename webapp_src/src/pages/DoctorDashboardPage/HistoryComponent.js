import React, { useEffect, useState, useCallback } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

import HistoryList from './HistoryList';
import FullScreenLoaderComponent from '../../components/FullScreenLoaderComponent';

import {
  db,
} from '../../firebase';

import {
  getDocs,
  query,
  collection,
} from "firebase/firestore";

const HistoryComponent = ({patient}) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const getDataFromFirebase = useCallback(async () => {
    setLoading(true);
    setNotes([])
    const q = query(collection(db, "users/"+patient.uid, "notes"));
    getDocs(q)
      .then(docs => {
        if(docs.docs.length>0) {
          let data = [];
          docs.docs.forEach((doc) => {
            data.push({...doc.data(), id: doc.id})
          });
          setNotes(data);
        }
      })
      .finally(() =>{setLoading(false);});
  });

  useEffect(() => {
    if (patient.uid) {
      getDataFromFirebase();
    }
  }, [patient.uid]);

  return (
    <Container>
      <Row>
        <Col lg={12}>
          {
          loading? 
            <FullScreenLoaderComponent />
            : 
            <Accordion className="mt-3">
              <HistoryList notes={notes} />
            </Accordion>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default HistoryComponent;