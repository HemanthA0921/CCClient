import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [dataServer1, setDataServer1] = useState([]);
  const [dataServer2, setDataServer2] = useState([]);
  const [dataServer3, setDataServer3] = useState([]);
  const [datapublic, setDataPublic] = useState([]);
  const [state, setState] = useState(0)
  const [formData, setFormData] = useState({ name: "", RollNo: "", server: "server3"});

  const fetchServerData = async (server) => {
    try {
      const response = await axios.get(`http://65.2.150.20/api/data`);
      console.log(response.data);
      setDataServer1(response.data[0]);
      setDataServer2(response.data[1]);
      setDataServer3(response.data[2]);
      setDataPublic(response.data[3]);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchServerData()
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, RollNo, server } = formData;
    try {
      const data = await axios.post(`http://65.2.150.20/api/submit`, { name, RollNo , server });
      console.log(data.data)
      setFormData({ name: "", RollNo: "", server: "server1" });
      fetchServerData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Sample Data</h1>

      <div className="table-container">
        <h2>Data from Server 1(AWS)</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
            </tr>
          </thead>
          <tbody>
            {dataServer1.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.RollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h2>Data from Server 2(Azure)</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
            </tr>
          </thead>
          <tbody>
            {dataServer2.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.RollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h2>Data from Server 3(Local)</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
            </tr>
          </thead>
          <tbody>
            {dataServer3.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.RollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h2>Data from public shared server</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
            </tr>
          </thead>
          <tbody>
            {datapublic.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.RollNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Submit Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Roll No:
          <input
            type="number"
            name="RollNo"
            value={formData.RollNo}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
