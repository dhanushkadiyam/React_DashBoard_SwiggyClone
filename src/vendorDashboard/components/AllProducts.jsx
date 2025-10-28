import React,{useState, useEffect} from 'react'
import {API_URL} from '../data/apiPath';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


   const productsHandler = async () => {
       const firmId = localStorage.getItem('firmId');
       if (!firmId) {
           setErrorMessage("Firm ID is missing. Please log in again.");
           return;
       }
      try {
        const response = await fetch(`${API_URL}/product/${firmId}/products`);
        const newProductsData = await response.json();
        setProducts(newProductsData.products);
        console.log(newProductsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products. Please try again later.');
      }
    };
    useEffect(() => {
        productsHandler();
        console.log('this is useEffect');
    }, []);


    const deleteProductById = async (productId) => {
        try {
            const confirmDelete = confirm("Are you sure you want to delete this product?");
            if (!confirmDelete) return;

            const response = await fetch(`${API_URL}/product/${productId}`, {
            method: 'DELETE',
              });
              if (response.ok) {
            setProducts(products.filter((product) => product._id !== productId));
            alert('Product deleted successfully');
              }
          } catch (error) {
              console.error('Error deleting product:', error);
              alert('Failed to delete product. Please try again later.');
          }
    };

  return (
    <div>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className ="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Product Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>
                        {item.image && (
                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} 
                            style= {{ width: '50px', height: '50px' }}/>
                        )}
                    </td>
                    <td>
                        <button onClick={() => deleteProductById(item._id)}>Delete</button>
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts