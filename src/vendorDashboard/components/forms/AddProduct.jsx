import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setFile] = useState(null);

  const handleCategoryChange =(event)=>{
    const value= event.target.value;
    if(category.includes(value))
    {
      setCategory(category.filter((item)=> item !==value));
    }
    else{
      setCategory([...category, value])
    }
  }
  const handleBestSeller = (event)=>{
    const value = event.target.value === 'true';
    setBestSeller(value);
    
  }
  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try{
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');


      if(!loginToken || !firmId)
      {
        console.error("user not authenticated");
      }
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);
      
      category.forEach((value)=>{
        formData.append('category',value)
      }) 
      
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
        method:'POST',
        body: formData
      })
      const data = await response.json()

      if(response.ok){
        alert('Product added succesfully');
      }
      setProductName('');
      setPrice('');
      setCategory([]);
      setBestSeller(false);
      setDescription('');
      setFile(null);

    }
    catch(error){
      console.log(data.message);
      alert("Failed to add Product");
    }
  }

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleAddProduct}>
            <h3>Add Product</h3>
            <label>Product Name:</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" />
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter product price" />
            {/* <label>Category:</label>
            <input type="text" placeholder="Enter product category" /> */}
            <div className="checkInp">
            <label>Category:</label>
            <div className="inputsContainer">
              <div className="checkBoxContainer">
              <label>Veg</label>
              <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
            </div>
            <div className="checkBoxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
            </div>
            </div>
        </div>
            {/* <label>BestSeller:</label>
            <input type="text" placeholder="Enter product best seller status" /> */}
        <div className="checkInp">
            <label>Best Seller:</label>
            <div className="inputsContainer">
              <div className="checkBoxContainer">
              <label>Yes</label>
              <input type="radio" checked={bestSeller === true} value="true" onChange={handleBestSeller}/>
            </div>
            <div className="checkBoxContainer">
              <label>No</label>
              <input type="radio" checked={bestSeller === false} value="false" onChange={handleBestSeller}/>
            </div>
            </div>
        </div>
            <label>Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" />
            <label>Product Image:</label>
            <input type="file" onChange={handleImageUpload } />
            <br />
            <div className="btnSubmit">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct