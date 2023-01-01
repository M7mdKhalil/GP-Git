import { EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../App.css";

export default function TextEditor() {
  //text editor
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <div className="App">
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
    </div>
  );
}
