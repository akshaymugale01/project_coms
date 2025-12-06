import React, { useEffect, useState } from "react";
import wave from "/wave.png";
import bridge from "/bridge.jpg";
import { getItemInLocalStorage } from "../utils/localStorage";
import { API_URL, getVibeBackground, postVibeBackground } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setBackground } from "../features/theme/backgroundSlice";
const Background = () => {
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const [showBackgroundOptions, setShowBackgroundOptions] = useState(false);
  const images = [
    { index: 0, src: wave },
    { index: 1, src: bridge },
];
  const defaultImage = { index: 0, src: wave };
  let selectedImageSrc = defaultImage.src;
  let selectedImageIndex = defaultImage.index;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const send_background = async () => {
    console.log("Sending bg:", selectedImageSrc);

    const formData = new FormData();
    const response = await fetch(selectedImageSrc);
    const blob = await response.blob();
    console.log(response);
    formData.append("user_id", user_id);
    formData.append("image", selectedImageSrc);
    formData.append("index", selectedImageIndex);

    try {
      const res = await postVibeBackground(formData);

      if (res.success) {
        console.log("success");

        selectedImageSrc = API_URL + res.data.image;
        console.log(selectedImageSrc);
        selectedImageIndex = res.data.index;

        // Now, you can use selectedImageSrc and selectedImageIndex as needed
        console.log("Received response:", res);

        // For example, update state or perform any other actions
        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
        
        console.log("Received selectedImageSrc:", selectedImageSrc);
        console.log("Received selectedImageIndex:", selectedImageIndex);
      }
    } catch (error) {
      // toast.error('Please Check Your Internet , Try again! ',{position: "top-center",autoClose: 2000})
    } finally {
    }
  };
  const dispatch = useDispatch()
  const Get_Background = async () => {
    try {
      // const params = {
      //   user_id: user_id,
      // };
      const user_id = getItemInLocalStorage("VIBEUSERID");
      console.log(user_id);
      const data = await getVibeBackground(user_id);

      if (data.success) {
        console.log("sucess");

        console.log(data.data);
        selectedImageSrc = API_URL + data.data.image;

        
        selectedImageIndex = data.data.index;

        // Now, you can use selectedImageSrc and selectedImageIndex as needed
        console.log("Received response:", data);

        // For example, update state or perform any other actions
        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
        console.log("Received selectedImageSrc:", selectedImageSrc);
        console.log("Received selectedImageIndex:", selectedImageIndex);
        console.log(selectedImage);
        dispatch(setBackground(selectedImageSrc));
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // Call the function to get the background image when the component mounts
    Get_Background();
  }, [dispatch]);
  const handleDivClickBackground = (image) => {
    fetch(image.src)
      .then((response) => response.blob())
      .then((blob) => {
        selectedImageSrc = blob;
        selectedImageIndex = image.index;
        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
        send_background();
      })
      .catch((error) => {
        console.error("Error fetching or converting image:", error);
        // Handle the error as needed
      });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const selectedIndex = 8;
      selectedImageSrc = file;
      selectedImageIndex = selectedIndex;

      setSelectedImage(selectedImageSrc);
      setSelectedIndex(selectedImageIndex);
      send_background();
    }
  };
  const isSelected = (image) => {
    // return image.src === selectedImage.src;
    return image === selectedIndex;
  };
  const [fontColor, setFontColor] = useState('black');
  const analyzeImage = () => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = selectedImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
  
      let totalR = 0, totalG = 0, totalB = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        totalR += imageData[i];
        totalG += imageData[i + 1];
        totalB += imageData[i + 2];
      }
  
      const pixelCount = imageData.length / 4;
      const avgR = totalR / pixelCount;
      const avgG = totalG / pixelCount;
      const avgB = totalB / pixelCount;
  
      const brightness = Math.sqrt(0.299 * avgR ** 2 + 0.587 * avgG ** 2 + 0.114 * avgB ** 2);
      setFontColor(brightness < 128 ? 'white' : 'black');
    };
  };
  return (
    <div
    //   style={{
    //     backgroundSize: "100% 100%",
    //     background: `url(${selectedImage}) no-repeat center center / cover`,
    //   }}
    
    className="mb-10"
    >
    <img
    src={selectedImage}
    alt="selected image"
    onLoad={analyzeImage}
    style={{ display: 'none' }} 
/>
      <div
        className="flex flex-col"
        style={{  borderRadius: 10 }}
      >
        
          
            <p className="font-medium">Background Image </p>
          
        
        <br></br>
        <div className="" style={{}}>
         

          <div
            className="flex justify-center flex-wrap items-center md:grid-cols-4 gap-5"
            
          >
            {images.map((image, index) => (
              <div
                key={image.index}
                className={` w-40 shadow-custom-all-sides ${
                  isSelected(index) ? "selected" : "boxborder"
                }`}
                onClick={() => handleDivClickBackground(image)}
                style={{
                  borderRadius: 8,
                  background: `url(${image.src})`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: 70,
                }}
              ></div>
            ))}
          </div>

          <div>
            <center>
              <span style={{ color: "#000", fontWeight: 600, fontSize: 16 }}>
                OR
              </span>
            </center>
          </div>
          <div className="col-md-12 mb-2 mt-2" style={{ position: "relative" }}>
            {selectedImage ? (
              <div
                className=" mb-2 selected"
                style={{
                  borderRadius: 8,
                  height: "100px",
                  cursor: "pointer",
                  color: "#000",
                  backgroundColor: "rgb(23 103 159 / 43%)",
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="imageInput"
                />

                <label
                  htmlFor="imageInput"
                  className="flex w-full h-full justify-center items-center"
                  style={{
                    borderRadius: 8,
                    height: "100%",
                    cursor: "pointer",
                    color: "#000",
                  }}
                >
                  <center>
                    <span
                    className=" h-full w-full"
                      role="img"
                      aria-label="Choose from gallery font-medium"
                      style={{ color: fontColor , fontSize:20}}
                        //    style={{color: 'black',
                        //  textShadow: '0 0 5px white',}}
                    >
                      Choose from gallery
                    </span>
                  </center>
                </label>
              </div>
            ) : (
              <>
                <div
                  className="shadow-custom-all-sides"
                  style={{
                    borderRadius: 8,
                    height: "100px",
                    cursor: "pointer",
                    color: "#000",
                    backgroundColor: "rgb(23 103 159 / 43%)",
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="imageInput"
                  />
                  <label
                    htmlFor="imageInput"
                    className="col-md-12 mt-3 mb-3"
                    style={{
                      borderRadius: 8,
                      height: "100%",
                      cursor: "pointer",
                      color: "#000",
                    }}
                  >
                    <center>
                      <span role="img" aria-label="Choose from gallery">
                        Choose from galleryr
                      </span>
                    </center>
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
