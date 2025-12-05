import React from 'react'
import { FaComments, FaFacebook } from 'react-icons/fa';
import Modal from 'react-responsive-modal'
import { FacebookProvider, LoginButton } from 'react-facebook-login-lite';

const FacebookModal = ({isFacebookOpen, onCloseFacebook, isLoggedIn, handleDivClick, accounts}) => {
    const modalStyleTemplate = {
        content: {
        //   width: isMobile ? '270px' : '750px',
          height: '80%' ,
          // (isSecondInputVisible) ? '350' : '40%',
          margin: 'auto',
          backgroundColor:"#133953",
        //   backgroundColor: 'linear-gradient(to right,#153043 30%, #133953 70%)',
          color:'#fff',
          borderRadius:5,
          overflowY: 'auto',
          scrollbarWidth: 'thin', 
          scrollbarColor: '#888 #ddd',
          msOverflowStyle: 'none', 
          
          '&::-webkit-scrollbar': {
            width: '1px', 
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888', 
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#aaa', 
          },
        },
       
      
      };

      const handleResponse = (data) => {
        console.log("Facebook login response:", data);
        
      };
    
      const handleError = (error) => {
        console.log("Facebook login error:", error);
      };
      
  return (
       <Modal
                                isOpen={isFacebookOpen}
                                onRequestClose={onCloseFacebook}
                                contentLabel="Open Facebook"
                                style={modalStyleTemplate}
                            >
                                
                                <div className='row' >
                                    <div className="col-md-3 p-1" >
                                    <div className='' style={{backgroundColor:'#4267b2', borderRadius:8 ,height:"100px"  }}>
                                        <center> 
                                        <FaFacebook style={{color:'#fff', fontSize:40,marginTop:"25px"}}/> 
                                      
                                        </center>
                                    </div>
                                    <span className='p-0 ml-5'><b>Facebook</b></span><br/>
                                    <span className='p-0 ' style={{fontSize:12, color:'#cdcdcd'}}> Grab Facebook leads and keep the chat going without leaving VibeCopilot</span><br/>
                                    
                                    </div>
                                    <div className="col-md-9 p-2" >
                                    <span className='p-0 ' ><b> Step 1: Sign in to Facebook</b></span><br/>
                                    <span className='p-0 ' style={{fontSize:14}}>Get access to all the tools below by signing in to Facebook</span>
                                  
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
                                        // <FacebookLogin
                                        //      appId="314506584473330"
                                            
                                        //     autoLoad={true}
                                        //     fields="name,email,picture"
                                            
                                        //     onClick={componentClicked}
                                        //     callback={responseFacebook}
                                        //     icon={<FaFacebook className='mb-1 mr-1' style={{fontSize:14}} />}
                                        //     textButton="Sign in to Facebook"   
                                        // />
                                        <FacebookProvider appId="314506584473330"> 
        <LoginButton
          scope="email"
          onCompleted={handleResponse}
          onError={handleError}
        >
          <span><FaFacebook className='mb-1 mr-1' style={{fontSize:14}} /> Sign in to Facebook</span>
        </LoginButton>
      </FacebookProvider>
                                        )}
                                        </div>
                                    <br/><br/>
                                    <span className='p-0 ' ><b> Step 2: Connect your favorite tools</b></span><br/>
                                    <span className='p-0 ' style={{fontSize:14}}>Capture leads, nurture relationships and close more sales with Facebook tools</span>
                                    

                                    <div className='row mt-2 p-2'> 
                                        <div className='mr-1 mb-1' style={{backgroundColor:'#4267b2',borderRadius:5, width:'50%'}}>
                                            <center>
                                            <FaComments style={{color:'#fff', fontSize:40,marginTop:"25px"}}/><br/> 
                                            <span className='p-0 ' ><b> Post & Comments</b></span><br/>
                                            <span className='p-0 m-1 ' style={{fontSize:14}}>Get leads from Facebook Post,comments and reply from VibeCopilot</span><br/>
                                           
                                            <div style={{ position: 'relative' }}>
                                               
                                               
                                                <span className='p-0' style={{fontSize:12}}>
                                                  
                                                    {
                                                        
                                                        accounts && accounts.length > 0 
                                                            ? <span className='p-0' style={{fontSize: 12}}>
                                                                {accounts.map(account => account.name).join(', ')}
                                                            </span>
                                                            : <span></span>
                                                    }
                                                </span>
                                                <div className='mb-2 m-2' style={{border:'1px solid #fff',borderRadius:4}} onClick={handleDivClick}
                                                >
                                                        Go to Facebook Page
                                                </div>
                                                
                                                

                                            </div>
                                                
                                            </center>
                                        
                                        </div>
                                        
                                        
                                    </div>
                                       
                                    </div>
                                </div>
                                
                            </Modal> 
  )
}

export default FacebookModal
