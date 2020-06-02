import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormHelperText } from '@material-ui/core';
function MyDropzone(props) {
  const onDrop = useCallback(async (acceptedFiles, e )=> {

    console.log("..........", e)
    let abortController = new AbortController();
window.onbeforeunload = function(e) { abortController.abort(); };
    if (acceptedFiles[0].type === "text/plain") {
      document.querySelector("#error").style.display = 'none';
      const data = new FormData();
      data.append('file', acceptedFiles[0]);
      debugger
	  
	   console.log("called..")
	  
	  let res = await uploadedData(data);
	  
	    console.log("res", res)
    /* fetch('http://localhost:8000/upload', {
        method: 'POST', // or 'PUT'
        body: data,
        headers: {
          accept: 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          props.handleUploadData(data)
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        }); */
    }
    else {
      document.querySelector("#error").style.display = 'block';
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const uploadedData = async (fileData)=>{
	  console.log("called")
			
		const response = await fetch('http://localhost:8000/upload', {
				method: 'POST', // or 'PUT'
				body: fileData,
				headers: {
				  accept: 'application/json'
				}
			  })
			  
			  var result = await response.json();
			  
			  console.log("result", result)
		
  }
  return (
    <React.Fragment>
      <div style={{ height: '200px', backgroundColor: 'lightBlue', textAlign: 'center', position: 'relative', border: '1px solid cadetblue' }} {...getRootProps()}>
        <input accept="text/plain" {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p style={{
              position: 'absolute',
              top: '34%',
              width: '100%'
            }}>Drag 'n' drop some files here, or click to select files</p>
        }

      </div>
      <FormHelperText id="error" style={{ color: 'red', display: 'none' }}>Invalid file format, please upload .txt file</FormHelperText>
    </React.Fragment>

  )
}

export default MyDropzone;