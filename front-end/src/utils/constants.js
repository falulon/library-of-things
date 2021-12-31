import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "מחסן",
    url: "/",
  },
  {
    id: 2,
    text: "עלינו",
    url: "/about",
  },
  {
    id: 3,
    text: "חפצים",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

// export const products_url = 'https://course-api.com/react-store-products'
export const products_url = "http://localhost:3001/products";

// export const single_product_url = `https://course-api.com/react-store-single-product?id=`
export const single_product_url = `http://localhost:3001/products/`;

export const info_url = "http://localhost:3001/info";

export const users_url = "http://localhost:3001/users";

export const borrow_url = "http://localhost:3001/borrow";

export const cloudinary_url =
  "https://api.cloudinary.com/v1_1/dcvhpkczi/image/upload";
