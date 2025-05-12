import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./css/Menu.css";

function Menu() {
  // Sample menu items
  const menuItems = [
    {
      title: "Fıstık Dilimi",
     
      image: "/image/1_1.jpg",
    },
    {
      title: "1 Kişilik Sıkım",
     
      image: "/image/6.jpg",
    },
    {
      title: "Special Dürüm",
    
      image: "/image/1_6.jpg",
    },
    {
      title: "Bir Kişilik Sunum",
   
      image: "/image/1_3.jpg",
    },
    {
      title: "Fıstık Dilimi",
      
      image: "/image/1_1.jpg",
    },
    {
      title: "Bir Kişilik Sunum",
    
      image: "/image/6.jpg",
    },
    {
      title: "Special Dürüm",
     
      image: "/image/1_6.jpg",
    },
   
    {
      title: "Fıstık Dilimi",
      
      image: "/image/1_1.jpg",
    },
    {
      title: "Ayran",
      
      image: "/image/kapali-Ayran.jpg",
    },
    {
      title: "Açık Ayran",
      
      image: "/image/acıkAyran.jpg",
    },
    {
      title: "Kola",
      
      image: "/image/kola.jpg",
    },
    {
      title: "Nigde Gazozu",
     
      image: "/image/nigdegazoz.jpg",
    },
    {
      title: "Şalgam",
     
      image: "/image/salgam.jpg",
    },
  ];

  return (
    <div className="menu-container">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        
      >
        Menümüz
      </Typography>
      <Typography variant="body1" gutterBottom>
        <span className="span_name">İÇEÇEK VE ÇİĞ KÖFTE SERİLERİMİZ</span>
        <br />
        Menümüzdeki lezzetleri keşfedin!
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="menu-card">
              {item.image && (
                <CardMedia
                  component="img"
                  className="menu-card-image"
                  image={item.image}
                  alt={item.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="h2">
                  {item.title}
                </Typography>
               
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Menu;