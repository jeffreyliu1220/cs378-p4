import Button from 'react-bootstrap/Button';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";

const databaseURL =
  "https://human-computer-interacti-bc357-default-rtdb.firebaseio.com/";



export default function MainPage(){
    const auth = getAuth();
    let user = auth.currentUser;
    console.log(user);
    console.log("MAIN PAGE USER: ", user?.email);

    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
            user = auth.currentUser;
            console.log("AHHHHHHHHHHH USER:", user);
        }
        else{
            //Navigate back if refresh logged out?
            consolee.log("AHHHHHHHHHHHHHHHH NOTHING????")
            const navigate = useNavigate();
            navigate("/");
        }
      });
    }, [])

    return(
        <>
        <div>
            Hello: {user?.email}!
        </div>
        
        <Logout></Logout>
        <Form></Form>
        </>
    )

}

function Logout(){
    const navigate = useNavigate();
    
    //Logout and navigate back to login page
    const handleLogout = () =>{
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("LOGGING OUT");
            navigate("/");
        }).catch((error) => {
            // An error happened.
            console.log("ERROR LOGGING OUT");
        });
    }

    return(
        <>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}



function Form() {
  const [firstInputValue, setFirstInputValue] = useState(null);
  const [secondInputValue, setSecondInputValue] = useState(null);
  const [dataPostResult, setDataPostResult] = useState(null);
  const [dataRetrieveResult, setDataRetrieveResult] = useState(null);
  const [retrieveType, setRetrieveType] = useState(null);
  const [user, setUser] = useState(null);
//TODO: If not logged log back in wiht user creds????
    //If user is already logged in just go straight to main page
    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } 
      });
    })

  const sendData = () => {
    setFirstInputValue("");
    setUser(null);
    const sampleDict = {
      user: user.email,
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
        //Filter if user matches curr user
        if (res) {
          const keys = Object.keys(res);
          console.log(res);
          const dataPoints = keys
            .map((k) => res[k])
            .filter((e) => e["user"] === user.email);
          setSecondInputValue(dataPoints);
        }
      });
  };

  const handleInputChange = (event) => {
    const target = event.target;
    setFirstInputValue(target.value);
    console.log(target.value);
  };

  const handleRetrieveTypeChange = (event) => {
    const target = event.target;
    setRetrieveType(target.value);
    console.log(target.value);
  };

  return (
    <div className="App">
      <h1>Modified React + Firebase Tutorial</h1>
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
        <Button onClick={() => sendData()}>
          Send data
        </Button>
        <text>{dataPostResult}</text>
      </div>
      <div className="container">
        <Button onClick={() => getData()}>
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
          : "Waiting to retrieve data"}
      </div>
    </div>
  );
}
