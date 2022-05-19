import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import {
  setDoc,
  doc,
} from "firebase/firestore";

import {
  db,
} from '../../firebase';

const RichTextEditor = ({patientUID}) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
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

  async function addNote() {
    setSaving(true);
    convertContentToHTML();
    console.log(convertedContent);
    setDoc(doc(db, "users/"+patientUID+"/notes", convertDate()), {
      note: convertedContent,
    }, { merge: true })
    .finally(() => {
      setSaving(false);
    })
  }

  return (
    <>
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
        inline: { inDropdown: false },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
    />
    <div className="d-flex justify-content-start save-btn-wrapper pt-4">
    <button className="primary-button" onClick={() => addNote()} disabled={saving}>{saving? "Saving...": "Save"}</button>
    </div>
    </>
  )
}

export default RichTextEditor;