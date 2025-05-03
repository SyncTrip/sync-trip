import React from "react";
import { Box, Typography, Button, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import theme from "../../theme";

const styles = {
  root: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    background: "white",
  },
  pantalla1: {
    fontSize: "1.5rem",
    color: "black",
    textAlign: "center",
    marginBottom: "2rem",
    width: "100%",
  },
  imageList: {
    width: 600,
    maxWidth: "90vw",
  },
  };

const itemData = [

  {
    img: require('../../assets/img1.jpg'),
    title: 'Mysterious mountain',
  },
  {
    img: require('../../assets/img2.jpg'),
    title: 'Hidden islands in the sea',
  },
  {
    img: require('../../assets/img3.jpg'),
    title: 'Enigmatic city',
  },
];

const ScenarioSelector = ({ increase }) => (
  <Box style={styles.root}>
    <Typography variant="h2" style={styles.pantalla1}>
      What scenario calls you most to find the secret? Select one
    </Typography>
    <ImageList cols={3} gap={24} style={styles.imageList}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
           onClick={() => increase((prev) => prev + 1)}
            src={item.img}
            alt={item.title}
            style={{ width: '100%', borderRadius: 8 }}
          />
          <ImageListItemBar
            title={item.title}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  </Box>
);

export default ScenarioSelector;
