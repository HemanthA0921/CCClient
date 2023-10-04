import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [dataServer1, setDataServer1] = useState([]);
  const [dataServer2, setDataServer2] = useState([]);
  const [dataServer3, setDataServer3] = useState([]);
  const [formData, setFormData] = useState({ name: "", RollNo: "", server: "server1" });

  const fetchServerData = async (server) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${server}data`);
      switch (server) {
        case "server1":
          setDataServer1(response.data);
          break;
        case "server2":
          setDataServer2(response.data);
          break;
        case "server3":
          setDataServer3(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchServerData("server1");
    fetchServerData("server2");
    fetchServerData("server3");
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, RollNo, server } = formData;
    try {
      await axios.post(`http://localhost:3000/api/${server}submit`, { name, RollNo });
      setFormData({ name: "", RollNo: "", server: "server1" });
      fetchServerData(server);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Sample Data</h1>

      <div className="table-container">
        <h2>Data from Server 1</h2>
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
        <h2>Data from Server 2</h2>
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
        <h2>Data from Server 3</h2>
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
        <label>
          Select Server:
          <select
            name="server"
            onChange={handleInputChange}
            value={formData.server}
          >
            <option value="server1">Server 1</option>
            <option value="server2">Server 2</option>
            <option value="server3">Server 3</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
