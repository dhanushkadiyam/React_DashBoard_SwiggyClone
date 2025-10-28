import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [offer, setOffer] = useState('');
  const [region, setRegion] = useState([]);
  const [file, setFile] = useState(null);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        alert("Please login first");
        return;
      }

    try{
    
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);

      category.forEach((value) =>{
        formData.append('category', value);
      });
      region.forEach((value) =>{
        formData.append('region', value);
      });
      if (file) formData.append('image', file);

      const response = await fetch(`${API_URL}/firm/add-firm`, {
      method: 'POST',
      headers: {
         'token': ` ${loginToken}`  // use standard header
      },
      body: formData
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      alert('Firm added successfully');
      setFirmName('');
      setArea('');
      setCategory([]);
      setOffer('');
      setRegion([]);
      setFile(null);
    }
    else if(data.message==="vendor can have one firm")
    {
      alert("Firm Exists 🥗. Only one firm can be added");
    }
    else {
      alert("Failed to add Firm");
    }
    const firmId = data.firmId;
    localStorage.setItem('firmId', firmId);
  } catch (error) {
    console.error('Failed to add firm:');
  }
}

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit ={handleFirmSubmit}>
          <h3>Add Firm</h3>
            <label>Firm Name:</label>
            <input type="text" name="firmName" value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="Enter firm name" />
            <label>Area:</label>
            <input type="text" name="area" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Enter firm address" />
            {/*<label>Category</label>
            <input type="text" placeholder="Enter firm category" />*/}
        <div className="checkInp">
            <label>Category:</label>
            <div className="inputsContainer">
              <div className="checkBoxContainer">
              <label>Veg</label>
              <input type="checkbox" checked={category.includes("veg")} onChange={handleCategoryChange} value="veg" />
            </div>
            <div className="checkBoxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" checked={category.includes("non-veg")} onChange={handleCategoryChange} value="non-veg" />
            </div>
            </div>
        </div>
            {/* <label>Region:</label>
            <input type="text" placeholder="Enter firm region" /> */}
            <label>Offer:</label>
            <input type="text" name="offer" value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="Enter firm offer" />
          <div className="checkInp">
            <label>Region:</label>
            <div className="inputsContainer">
              <div className="regionBoxContainer">
              <label>South Indian</label>
              <input type="checkbox" checked={region.includes("south-indian")} onChange={handleRegionChange} value="south-indian" />
            </div>
            <div className="regionBoxContainer">
              <label>North Indian</label>
              <input type="checkbox" checked={region.includes("north-indian")} onChange={handleRegionChange} value="north-indian" />
            </div>
            <div className="regionBoxContainer">
              <label>Chinese</label>
              <input type="checkbox" checked={region.includes("chinese")} onChange={handleRegionChange} value="chinese" />
            </div>
            <div className="regionBoxContainer">
              <label>Bakery</label>
              <input type="checkbox" checked={region.includes("bakery")} onChange={handleRegionChange} value="bakery" />
            </div>
            </div>
        </div>
            <label>Firm Image:</label>
            <input type="file" onChange={handleImageUpload} />
            <br />
            <div className="btnSubmit">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm