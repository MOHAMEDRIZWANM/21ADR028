import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthComponent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [products, setProducts] = useState([]);

  const authenticateAndGetToken = async () => {
    const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'http://20.244.56.144/test/auth';
    const dataUrl = "http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000";
    const data = {
      companyName: "AFFORDMED",
      clientID: "6a05ab1d-1ba3-455b-9f26-49dbd355ea17",
      clientSecret: "itoiAlvydtbowSUh",
      ownerName: "Mohamed Rizwan M",
      ownerEmail: "mohamedrizwanm.21aid@kongu.edu",
      rollNo: '21ADR028'
    }

    try {
      const response = await axios.post(corsAnywhereUrl + targetUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Required header for cors-anywhere
        },
      });

      console.log(response)

      const accessToken = response.data.access_token; // getting aut
      console.log(accessToken)

      setAccessToken(accessToken);

  // Function to fetch data using access token
      const response2 = await axios.get(corsAnywhereUrl + dataUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Requested-With': 'XMLHttpRequest', 
        },
      });
      console.log(response2)
      setProducts(response2.data); //  data structure matches expected response
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error (e.g., show error message)
    }
  };
  
  useEffect(() => {
    authenticateAndGetToken(); // Call authentication on component mount
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
  {products.map((product, index) => (
    <li key={index}>
      {product.productName} - Price: {product.price} - Rating: {product.rating}
    </li>
  ))}
</ul>

    </div>
  );
};

export default AuthComponent;