import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CssBaseline, Typography } from '@material-ui/core';

import MyDropzone from './Components/MyDropzone';
import DisplayTable from './Components/DisplayTable'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filesData: []
    }
  }

  handleUploadData = (filesData) => {
    this.setState({
      filesData
    })
  }
  render() {
    const { filesData } = this.state;
    return (
      <React.Fragment>
       
        <div>
          <Typography component="div" /*  style={{}}  */>
            <MyDropzone handleUploadData={this.handleUploadData} />
            {filesData && filesData.length ? <DisplayTable /> : null}
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
