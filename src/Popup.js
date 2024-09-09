import React, { useState } from "react";
import "./Popup.css";
import { Button, Col, Input, Row, Toast } from "reactstrap";
// import { IoIosArrowBack } from "react-icons/io";


const options = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function Popup({ handleClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("");

  const handleSchemaChange = (e) => {
    setSelectedSchema(e.target.value);
  };

  const addSchema = () => {
    if (selectedSchema && !schemas.includes(selectedSchema)) {
      setSchemas([...schemas, selectedSchema]);
      setSelectedSchema("");
    }
  };

  const saveSegment = async () => {
    const schemaData = schemas.map((schema) => ({
      [schema]: options.find((option) => option.value === schema)?.label,
    }));

    const data = {
      segment_name: segmentName,
      schema: schemaData,
    };
    console.log(data, "data");
    try {
      const response = await fetch(
        "https://webhook.site/e7319ed6-0b31-451d-83f9-4133720cc17a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify(data),
        }
      );
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }

    handleClose();
  };

  const availableOptions = options.filter(
    (option) => !schemas.includes(option.value)
  );

  return (
    <div className="popup-box">
      <div className="box">
        <div className="Header">
          {/* <Col lg='2'className="close-icons" onClick={handleClose}> X </Col> */}
            {/* <Col lg='9'className="close-icon"> Saving Segment </Col>  */}
            Saving Segment
        </div>
        <div className="form-group">
          <label className="input-name">Enter the Name of the Segment:</label>
          <Input
            type="text"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Enter Segment Name"
            className="input-option"
          />
        </div>

        <div className="form-group">
          <label className="input-name">
            To Save Your Segment, You need to add the schemas to build the
            query:
          </label>
          <select
            className="input-option"
            value={selectedSchema}
            onChange={handleSchemaChange}
          >
            <option value="">Select Schema</option>
            {availableOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="save-button" onClick={addSchema}>
            + Add new schema
          </button>
        </div>

        <div className="schema-list">
          {schemas.map((schema, index) => (
            <div key={index} className="schema-item">
              {options.find((option) => option.value === schema)?.label}
            </div>
          ))}
        </div>
        <div style={{padding:'10px',justifyContent:'space-around',width:'100%',display:'flex'}}>
        <button className="save-button" onClick={saveSegment}>
          Save the Segment
        </button>
        <Button className="cancel-button" onClick={handleClose}> Close </Button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
