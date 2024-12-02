import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { API_URL, getVibeBackground, getVibeSocialData } from "../../api";
import {
  FaCheck,
  FaFacebook,
  FaInstagram,
  FaPlus,
  FaTelegramPlane,
} from "react-icons/fa";
import gmail from "/gmail.png";
import outlook from "/outlook.png";
import FacebookModal from "../../containers/modals/IntegrationModal/FacebookModal";
import { Link } from "react-router-dom";
import Gmail from "./Gmail";

const Integration = () => {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [screen, setScreen] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFacebookOpen, setIsFacebookOpen] = useState(false);
  const defaultImage = { index: 0, src: "" };
  let selectedImageSrc = defaultImage.src;
  let selectedImageIndex = defaultImage.index;
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const user_id = getItemInLocalStorage("VIBEUSERID");
  const Get_Background = async () => {
    try {
      const user_id = getItemInLocalStorage("VIBEUSERID");
      console.log(user_id);
      const data = await getVibeBackground(user_id);

      if (data.success) {
        console.log("sucess");

        console.log(data.data);
        selectedImageSrc = API_URL + data.data.image;

        selectedImageIndex = data.data.index;

        console.log("Received response:", data);

        setSelectedImage(selectedImageSrc);
        setSelectedIndex(selectedImageIndex);
        console.log("Received selectedImageSrc:", selectedImageSrc);
        console.log("Received selectedImageIndex:", selectedImageIndex);
        console.log(selectedImage);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    Get_Background();
    GetAuth();
  }, []);

  const GetAuth = async () => {
    try {
      const response = await getVibeSocialData(user_id);

      if (response.success) {
        console.log("success");
        console.log(response.data);
        setSocialMediaData(response.data);

        // setProjectList(response.data.data.Boards);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onOpenFacebook = () => {
    setIsFacebookOpen(true);
  };
  const onCloseFacebook = () => {
    setIsFacebookOpen(false);
  };

  const isInstalled = (platform) => {
    const socialMedia = socialMediaData.find(
      (item) => item.platform === platform
    );

    return socialMedia && socialMedia.status_login;
  };

  const onOpenInstagram = () => {
    setIsInstagramOpen(true);
  };
  const onCloseInstagram = () => {
    setIsInstagramOpen(false);
  };

  const onOpenTelegram = () => {
    setIsTelegramOpen(true);
  };
  const onCloseTelegram = () => {
    setIsTelegramOpen(false);
  };

  const signInOutlook = async () => {
    try {
      const loginUrl =
        "https://vibecopilot.ai/api/outlook-login/?from_local=true&redirect_to=settings";

      window.location.href = loginUrl;
      getQueryParam();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const signIn = () => {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    const form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauth2Endpoint);

    const params = {
      client_id:
        "339274559462-6r06f0d9aqubhnhqmvrkjaqs8nikiidd.apps.googleusercontent.com",
      // local host
      // redirect_uri: "http://localhost:5173/integration",
      redirect_uri: "https://app.myciti.life/integration",
      response_type: "token",

      scope:
        "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",

      include_granted_scopes: "true",
      state: "pass-through-value",
    };

    for (const p in params) {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    setScreen("gmail")
  };

  const handleDivClick = async () => {
    const data = await fetchData();
    if (data) {
      setAccounts(data);
      gotoFacebookPage();
    }
  };

  return (
    <section
      className="flex"
      style={{
        background: `url(${selectedImage})no-repeat center center / cover`,
      }}
    >
      <Navbar />
      <div className="p-4 w-full  flex md:mx-2 overflow-hidden ">
        <div className="flex flex-col max-w-28  items-center max-h-screen overflow-scroll hide-scrollbar mb-10 bg-black p-2 bg-opacity-30 rounded-md shadow-custom-all-sides backdrop-blur-sm justify-around gap-4">
          <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <div className="p-4 rounded-md bg-white">
              <center>
                <img  src={gmail} />
              </center>
            </div>
            <div className="flex flex-col gap-1">
              <span className="" style={{ color: "#000" }}>
                <p className="font-medium text-white text-sm">Gmail</p>
              </span>

              {isInstalled("Gmail") ? (
                <button
                  // to={"/gmail"}
                  onClick={()=> setScreen("gmail")}
                  className="flex items-center font-medium justify-center shadow-custom-all-sides bg-white p-1 px-8 rounded-md gap-2"
                >
                  <FaCheck
                    className=""
                    style={{
                      fontSize: 14,
                      color: isInstalled("Gmail") ? "#0a6f4c" : "#132A3A",
                    }}
                  />
                  Open
                </button>
              ) : (
                <button
                  className="font-medium shadow-custom-all-sides p-1 px-8 rounded-md bg-white"
                  onClick={signIn}
                  disabled={isInstalled("Gmail")}
                >
                  <div className="flex gap-2 justify-center items-center">
                    <FaPlus
                      className=""
                      style={{
                        fontSize: 14,
                        color: isInstalled("Gmail") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Install
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="border border-white w-full opacity-40" />
            <div
              className="py-4 rounded-md"
              style={{ backgroundColor: "#4267b2" }}
            >
              <center>
                <FaFacebook style={{ color: "#fff", fontSize: 40 }} />
              </center>
            </div>
            <div className="flex flex-col gap-1">
              <span className="flex flex-col">
                <p className="font-medium text-white text-sm">Facebook</p>
              </span>

              <button
                className="font-medium shadow-custom-all-sides p-1 px-8 rounded-md text-center bg-white"
                onClick={onOpenFacebook}
                disabled={isInstalled("Facebook")}
              >
                {isInstalled("Facebook") ? (
                  <div className="flex gap-2 justify-center items-center">
                    <FaCheck
                      className=""
                      style={{
                        fontSize: 14,
                        color: isInstalled("Facebook") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Installed
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaPlus
                      className=""
                      style={{
                        fontSize: 14,
                        color: isInstalled("Facebook") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Install
                  </div>
                )}
              </button>
            </div>

            {/* facebook modal */}
            {/* <FacebookModal handleDivClick={handleDivClick} isFacebookOpen={isFacebookOpen} isLoggedIn={isLoggedIn} onCloseFacebook={onCloseFacebook}  /> */}
          </div>
          {/* insta */}
          <div className="border border-white w-full opacity-40" />
          <div className="w-full flex flex-col gap-2">
            <div
              className="py-4 rounded-md"
              style={{
                backgroundImage:
                  "linear-gradient(to top right,#ffd600, #ff1600, #cb00b8 )",
                borderRadius: 8,
              }}
            >
              <center>
                <FaInstagram style={{ color: "#fff", fontSize: 40 }} />
              </center>
            </div>
            <div className="flex flex-col gap-1">
              <span className="" style={{ color: "#000" }}>
                <p className="font-medium text-white text-sm">Instagram</p>
              </span>

              <button
                className="font-medium shadow-custom-all-sides p-1 px-8 rounded-md bg-white"
                onClick={onOpenInstagram}
                disabled={isInstalled("Instagram")}
              >
                {isInstalled("Instagram") ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaCheck
                      style={{
                        fontSize: 14,
                        color: isInstalled("Instagram") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Installed
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaPlus
                      style={{
                        fontSize: 14,
                        color: isInstalled("Instagram") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Install
                  </div>
                )}
              </button>
            </div>

            {/* <Modal 
                                isOpen={isInstagramOpen}
                                onRequestClose={onCloseInstagram}
                                contentLabel="Open Instagram"
                                style={modalStyleTemplate}
                            >
                                
                                <div className='row' >
                                    <div className="col-md-3 p-1" >
                                    <div className='' style={{backgroundImage: 'linear-gradient(to top right,#ffd600, #ff1600, #cb00b8 )', borderRadius:8 ,height:"100px"  }}>
                                        <center>
                                        <FaInstagram style={{color:'#fff', fontSize:40,marginTop:"25px"}}/> 
                                        
                                        </center>
                                    </div>
                                    <span className='p-0 '><b>Instagram</b></span><br/>
                                    <span className='p-0 ' style={{fontSize:12, color:'#cdcdcd'}}>
                                        Grab Instagram leads and keep the chat going without leaving VibeCopilot
                                        </span><br/>
                                    
                                    </div>
                                    <div className="col-md-9 p-2" >
                                    <span className='p-0 ' ><b> Step 1: Sign in to Instagram with Facebook</b></span><br/>
                                    <span className='p-0 ' style={{fontSize:14}}>Get access to all the tools below by signing in to Instagram</span>
                                   
                                    
                                    <div>
                                        {isLoggedIn ? (
                                            <div className='row'>
                                            <div className='col-md-1'>
                                            <img src={userPictureUrl} alt="Profile Picture" width={50} height={50} style={{borderRadius:50}} /> 
                                            </div>
                                            <div className='col-md-2'>
                                            <p style={{color:'yellow',fontSize:16}}>{userName}</p>
                                            </div>
                                           
                                            <div className='col' style={{fontSize:18,color:'red'}}>
                                            
                                            </div>
                                            
                                            </div>
                                        ) : (
                                        <FacebookLogin
                                             appId="314506584473330"
                                            //appId="881200300090039"
                                            autoLoad={true}
                                            fields="name,email,picture"
                                            // name,email,picture,public_profile
                                            onClick={componentClicked}
                                            callback={responseFacebooki}
                                            icon={<FaFacebook className='mb-1 mr-1' style={{fontSize:14}} />}
                                            textButton="Sign in to Facebook"   
                                        />
                                        )}
                                        </div>
                                    
                                    <br/><br/>
                                    <span className='p-0 ' ><b> Step 2: Connect your favorite tools</b></span><br/>
                                    <span className='p-0 ' style={{fontSize:14}}>Capture leads, nurture relationships and close more sales with Instagram tools</span>
                                    

                                    <div className='row mt-2 p-2'> 
                                        <div className='mr-1 mb-1' style={{backgroundColor:'#4267b2',borderRadius:5, width:'50%'}}>
                                            <center>
                                            <FaComments style={{color:'#fff', fontSize:40,marginTop:"25px"}}/><br/> 
                                            <span className='p-0 ' ><b>Instagram Post And Comments</b></span><br/>
                                            <span className='p-0 m-1 ' style={{fontSize:14}}>
                                            <div>
                                            Grab leads from Instagram Post and Comments from

                                            <span className='p-0' style={{fontSize:12}}>
                                                <br></br>
                                                    
                                                    {
                                                        // If accounts exist, join their names with a comma and display. Otherwise, show an empty span
                                                        accounts && accounts.length > 0 
                                                            ? <span className='p-0' style={{fontSize: 12}}>
                                                                {accounts.map(account => account.instagram_business_account?.username).filter(username => username).join(', ')}
                                                            </span>
                                                            : <span></span>
                                                    }
                                                </span>
                                                <div className='mb-2 m-2' style={{border:'1px solid #fff',borderRadius:4, cursor:"pointer"}} onClick={handleDivClicki}
                                                >
                                                        Go to Instagram
                                                </div>
                                               
                                                     </div>
                                                    </span><br/>
                                           
                                            </center>
                                        </div>
                                        
                                        
                                    </div>
                                       
                                    </div>
                                </div>
                               
                            </Modal> */}
          </div>
          {/* gmail */}
          <div className="border border-white w-full opacity-40" />
          
          <div className="w-full flex flex-col gap-2">
            <div
              className="py-4 rounded-md"
              style={{
                backgroundColor: "#32a9dd",
              }}
            >
              <center>
                <FaTelegramPlane style={{ color: "#fff", fontSize: 35 }} />
              </center>
            </div>
            <div className="flex flex-col gap-1">
              <span className="" style={{ color: "#000" }}>
                <p className="font-medium text-white text-sm">Telegram</p>
              </span>

              <button
                className="font-medium shadow-custom-all-sides p-1 px-8 rounded-md bg-white"
                onClick={onOpenTelegram}
                disabled={isInstalled("Telegram")}
              >
                {isInstalled("Telegram") ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaCheck
                      className=""
                      style={{
                        fontSize: 14,
                        color: isInstalled("Telegram") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Installed
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaPlus
                      className=""
                      style={{
                        fontSize: 14,
                        color: isInstalled("Telegram") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Install
                  </div>
                )}
              </button>
            </div>
            {/* <Modal 
                                isOpen={isTelegramOpen}
                                onRequestClose={onCloseTelegram}
                                contentLabel="Open Telegram"
                                style={modalStyleTemplate}
                            >
                                
                                <div className='row' >
                                    <div className="col-md-3 p-1" >
                                    <div className='' style={{backgroundColor:'#32a9dd', borderRadius:8 ,height:"100px"  }}>
                                        <center>
                                        <FaTelegramPlane style={{color:'#fff', fontSize:40,marginTop:"25px"}}/> 
                                        
                                        </center>
                                    </div>
                                    <span className='p-0 '><b>Telegram</b></span><br/>
                                    <span className='p-0 ' style={{fontSize:12, color:'#cdcdcd'}}>Communicate with your customers directly from VibeCopilot</span><br/>
                                   
                                    </div>
                                    <div className="col-md-9 p-2" > 
                                        <h5>Get Started with Telegram</h5>
                                        <span className='p-0 ml-2' ><b> Enter Phone Number</b></span> {validationMessage && <span style={{color: 'red'}}>{validationMessage}</span>}<br/>
                                        
                                        
                                        <div className="input-group col-md-8 mt-1 mb-1">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text mr-2" style={{borderRadius:5}}>+91</span>
                                            </div>
                                            <input 
                                                type="tel" 
                                                className="form-control mr-2"
                                                value={phoneNumber}
                                                onChange={handleInputChange}
                                                style={{borderRadius:5}} 
                                                placeholder="Enter phone no."
                                                pattern="[0-9]{10}"
                                                title="Please enter a phone number."
                                            />
                                            <button className='pr-2 pl-2' onClick={handleSubmit}>Send</button>
                                            
                                        </div>
                                        {isActive && <span>OTP will expire in {formatTime(timer)} seconds</span>}

                                     
                                        {isNumberValid && (
                                            <>
                                            <hr style={{ backgroundColor:'white', width:360 }}/> 
                                            
                                            <div  className=" col-md-8">
                                            {isFalseOtp && <div style={{textAlign:"end"}}><button onClick={handleSubmit} > Resend Otp</button></div>}
                                               
                                            </div>
                                           
                                        <span className='p-0 ml-2 ' ><b> Enter the Password if Two-Step Verification.</b></span><br/>
                                            <input value={password_value} onChange={handleInputPasswardVerify}  className='col-md-8 m-2 p-1' style={{borderRadius:5}}/>
                                            <br/>
                                            
                                            <span className='p-0 ml-2 ' ><b> Enter the code for verification of your account.</b></span><br/>
                                            <input value={inputValue} onChange={handleInputChangeVerify}  className='col-md-8 m-2 p-1' style={{borderRadius:5}}/>
                                            
                                            <div  className=" col-md-8">
                                                <div style={{textAlign:"end"}}>   {isFalseOtp && <span style={{color:"red"}}>Incorrect OTP</span>}</div>
                                               
                                            </div>
                                            <br/>

                                            <div className='col-md-8'><center><button className='p-1 pl-4 pr-4 m-1 ml-2' onClick={gototelegram}>Save</button></center></div>
                                            </>
                                        )}
                                      
                                        

                                       
                                    </div>
                                </div>
                                
                            </Modal> */}
          </div>
          <div className="border border-white w-full opacity-40" />
          <div className="w-full flex flex-col gap-2">
            <div
              className=" "
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: 8,
              }}
            >
              <center>
                <img className="w-20" src={outlook} />
              </center>
            </div>
            <div className="flex flex-col gap-1">
              <span className="" style={{ color: "#000" }}>
                <p className="font-medium text-white text-sm">Outlook</p>
              </span>

              <button
                className="font-medium shadow-custom-all-sides p-1 px-8 rounded-md bg-white"
                onClick={signInOutlook}
                disabled={isInstalled("Outlook")}
              >
                {isInstalled("Outlook") ? (
                  <div className="flex items-center justify-center gap-2">
                    <FaCheck
                      className=""
                      style={{
                        fontSize: 14,
                        color: isInstalled("Outlook") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Installed
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FaPlus
                      className=""
                      style={{
                        fontSize: 14,
                        color: isInstalled("Outlook") ? "#0a6f4c" : "#132A3A",
                      }}
                    />
                    Install
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
       
          {screen === "gmail" && <Gmail/>}
        
      </div>
    </section>
  );
};

export default Integration;
