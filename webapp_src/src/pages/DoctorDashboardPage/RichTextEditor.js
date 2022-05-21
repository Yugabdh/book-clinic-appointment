import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { MdDelete } from "react-icons/md";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import useForm from "../../hooks/useForm";

import {
  setDoc,
  doc,
} from "firebase/firestore";

import {
  db,
} from '../../firebase';

import validate from './MedicineFormValidationRules';

const RichTextEditor = ({patient}) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const [medicineList, setMedicineList] = useState([]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  const [saving, setSaving] = useState(false);

  const convertDate = () => {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    const dateInFormate = [day, month, year].join('-');
    return dateInFormate;
  }

  const {
    values,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    setIsSubmitting,
  } = useForm(addMedicine, validate);

  function addMedicine() {
    setMedicineList([...medicineList, values.medicine]);
    setValues({})
    setIsSubmitting(false);
  }

  const deleteMedicine = (event) => {
    let toDelete = parseInt(event.currentTarget.dataset.count);
    let temp = [];
    for(let i =0; i<medicineList.length; i++) {
      if(toDelete !== i) {
        temp.push(medicineList[i])
      }
    }
    setMedicineList(temp);
  }

  async function addNote() {
    setSaving(true);
    setDoc(doc(db, "users/"+patient.uid+"/notes", convertDate()), {
      note: convertedContent,
      medicineList: medicineList,
    })
    .finally(() => {
      setSaving(false);
    })
  }

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
              inline: { inDropdown: false },
              list: { inDropdown: false },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </Col>
        <Col lg={12}>
          <Form onSubmit={ handleSubmit } noValidate>
            <Form.Group className="mt-3">
              <div className="form-medicine">
                <div className="form-medicine-input">
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    placeholder="Medicine name"
                    name="medicine"
                    onChange={handleChange}
                    value={values.medicine || ''}
                    className={`${errors.medicine && 'wrong-input'}`}
                    required
                  />
                  {
                    errors.medicine && (<Form.Text className="text-danger">{errors.medicine}</Form.Text>)
                  }
                </div>
                <div className="form-medicine-btn">
                  <button type="submit" className="primary-button">+ Add</button>
                </div>
              </div>
            </Form.Group>
          </Form>
        </Col>
        <Col lg={12}>
          <div className="pills-wrapper">
            {
              Array.isArray(medicineList) ? medicineList.map((item, idx) => (
                <div className="pill-container" key={idx}>
                  <div className="pills-container-main">
                    <div className="pill">{item}</div>
                    <div className="pill-button" data-count={idx} onClick={deleteMedicine}><MdDelete /></div>
                  </div>
                </div>
              )): null
            }
          </div>
        </Col>

        <Col lg={12}>
          <div className="d-flex justify-content-start save-btn-wrapper">
            <button className="primary-button" onClick={() => addNote()} disabled={saving}>{saving? "Saving...": "Save"}</button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default RichTextEditor;