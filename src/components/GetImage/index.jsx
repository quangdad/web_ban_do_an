// 1. Import classes
// ==================

import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import img from "../../access/imgs/banner.jpg";

const GetImage = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "demo",
    },
  });
  const myImage = cld.image(img);

  myImage.resize(fill().width(250).height(250));
  console.log(myImage);
  return (
    <div className="App-body">
      <h1>React Quick Start</h1>
      <div>
        <AdvancedImage cldImg={myImage} />
      </div>
    </div>
  );
};

export default GetImage;
