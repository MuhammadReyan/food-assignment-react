
import { logDOM } from '@testing-library/react';
import './App.css';


import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap'

import React, { useState, useEffect } from 'react';










function App() {

  const [searchQuery, setSearchQuery] = useState('')
  const [menuData, setMenuData] = useState([]);



  async function fetchData() {
    try {
      const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`)
      const data = await res.json()
      console.log(data.data.recipes)
      setMenuData(data.data.recipes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])




  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    fetchData()
  }

  return (
    <div className='container'>
      <Header />
      <SubHeader />
      <input
        type="text"
        placeholder="Search for a dish..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <Menu menus={menuData} />
    </div >

  )
}


function Header() {
  return (
    <h1 className='animate-charcter'>--- Fast React Pizza Co.---</h1>
  )
}

function SubHeader() {
  return (
    <div>
      <h1 className='animates'>Our Menu</h1>,
      <p style={{ fontSize: "12px", textAlign: 'center', fontFamily: 'sans-serif', fontStyle: 'italic', fontWeight: 600 }}>Authentic Italian Cuision. 6 creative dishes to choose from. All from our stone oven,all organic,all delicious</p>
    </div>
  )
}

function Menu({ menus }) {

  return (
    <div style={{ display: "flex", flexWrap: "wrap", borderRadius: "4px", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "40px" }}>
      {menus.map((menu, index) => (
        <CardContainer key={index} image={menu.image_url} title={menu.title} publisher={menu.publisher} />
      ))}
    </div>
  )
}





function CardContainer({ image, title, publisher }) {
  return (
    <Card style={{ width: '18rem', }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title style={{ marginTop: "10px" }}>{title}</Card.Title>
        <Card.Text style={{ marginTop: "10px" }}>
          {publisher}
        </Card.Text>
        <Button style={{ marginTop: "20px" }} variant="primary">Order Now</Button>
      </Card.Body>
    </Card>


  );
}





export default App;
