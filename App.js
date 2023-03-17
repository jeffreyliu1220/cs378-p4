import "./styles.css";
import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

const databaseURL = "https://cs378-24067-default-rtdb.firebaseio.com/";

export default function App() {
  const [firstInputValue, setFirstInputValue] = useState(null);
  const [secondInputValue, setSecondInputValue] = useState(null);
  const [dataPostResult, setDataPostResult] = useState(null);
  const [dataRetrieveResult, setDataRetrieveResult] = useState(null);
  const [postType, setPostType] = useState(null);
  const [retrieveType, setRetrieveType] = useState(null);

  const sendData = () => {
    setFirstInputValue("");
    setPostType(null);
    const sampleDict = {
      type: postType,
      date: new Date(),
      text: firstInputValue
    };
    return fetch(`${databaseURL + "/testData"}/.json`, {
      method: "POST",
      body: JSON.stringify(sampleDict)
    }).then((res) => {
      if (res.status !== 200) {
        setDataPostResult("There was an error: " + res.statusText);
        // throw new Error(res.statusText);
      } else {
        setDataPostResult("Successfully sent. Check Firebase console.");
        return;
      }
    });
  };

  const getData = () => {
    //console.log(this.props.videoTime)
    fetch(`${databaseURL + "/testData"}/.json`)
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          setDataRetrieveResult("There was an error: " + res.statusText);
          // throw new Error(res.statusText);
        } else {
          setDataRetrieveResult("Successfully retrieved the data");
          return res.json();
        }
      })
      .then((res) => {
        if (res) {
          const keys = Object.keys(res);
          console.log(res);
          const dataPoints = keys
            .map((k) => res[k])
            .filter((e) => e["type"] === retrieveType);
          setSecondInputValue(dataPoints);
        }
      });
  };

  const handleInputChange = (event) => {
    const target = event.target;
    setFirstInputValue(target.value);
    console.log(target.value);
  };

  const handlePostTypeChange = (event) => {
    const target = event.target;
    setPostType(target.value);
    console.log(target.value);
  };

  const handleRetrieveTypeChange = (event) => {
    const target = event.target;
    setRetrieveType(target.value);
    console.log(target.value);
  };

  return (
    <div className="App">
      <h1>React + Firebase Tutorial</h1>
      <h2>CS378 23Spring P4</h2>
      <div className="container">
        <TextField
          id="outlined-basic"
          label="Type something to send data"
          fullWidth
          value={firstInputValue}
          onChange={handleInputChange}
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={postType}
            label="Category"
            onChange={handlePostTypeChange}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => sendData()}>
          Send data
        </Button>
        <text>{dataPostResult}</text>
      </div>
      <div className="container">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={retrieveType}
            label="Category"
            onChange={handleRetrieveTypeChange}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => getData()}>
          Retrieve data
        </Button>
        <text>{dataRetrieveResult}</text>
        {secondInputValue && secondInputValue.length
          ? secondInputValue.map(function (data) {
              return (
                <span className="retrieved-data">
                  {"Text: " +
                    data["text"] +
                    ", Date: " +
                    data["date"].slice(0, 10) +
                    " "}
                </span>
              );
            })
          : "No data with category " + retrieveType}
      </div>
    </div>
  );
}
