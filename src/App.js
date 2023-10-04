import React , {useEffect,useState} from 'react';
import './App.css';
import axios from 'axios'


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server using Axios
    axios.get("http://localhost:5000/api/data")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("data"+data);

  return (
    <div>
      <h1>Sample Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
