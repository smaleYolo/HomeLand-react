import React from 'react';
import {housesData} from "../data";
import {useParams} from "react-router-dom";
import {BiBed, BiBath, BiArea} from "react-icons/bi";
import {Link} from 'react-router-dom';

const PropertyDetails = () => {
  const {id} = useParams()

  return (
      <h1>zako4u pozhe</h1>
  );
};

export default PropertyDetails;
