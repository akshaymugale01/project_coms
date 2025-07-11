import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import wave from "/wave.png";
import { getVibeBackground, login, vibeLogin } from "../../api";
import Typewriter from "typewriter-effect";
import { setItemInLocalStorage } from "../../utils/localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [password, showPassword] = useState(false);
  const [page, setPage] = useState("login");
  const [bgImage, setBgImage] = useState("");
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const lowercaseOnly = /^[a-z0-9@._-]*$/;
      if (!lowercaseOnly.test(value)) {
        return;
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("TOKEN");
  //   const user = localStorage.getItem("Name");
  //   // console.log(user)
  //   if (token) {
  //     navigate("/dashboard");
  //     toast.success("You are already logged in!");
  //   }
  // }, []);

  useEffect(() => {
    const BgImage = async () => {
      const resp = await getVibeBackground();
      console.log("resp", resp);
      const image = resp?.data[1]?.image;
      setBgImage(image);
    };
    BgImage();
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("TOKEN");
      if (token) {
        try {
          // Optionally validate token via an API call
          const isValid = await someTokenValidationAPI(token);
          if (isValid) {
            navigate("/dashboard");
            toast.success("You are already logged in!");
          } else {
            localStorage.removeItem("TOKEN"); // Clear invalid token
          }
        } catch (error) {
          console.error("Token validation failed:", error);
        }
      }
    };

    validateToken();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await login({
        user: {
          email: formData.email,
          password: formData.password,
        },
      });

      const selectedSiteId = response?.data?.user?.selected_site_id;
      console.log("User", selectedSiteId);
      const userName = response.data.user.firstname;
      const userEmail = response.data?.user?.email;
      setItemInLocalStorage("USEREMAIL", userEmail);
      setItemInLocalStorage("SITEID", selectedSiteId);
      setItemInLocalStorage("Name", userName);
      const features = response.data.features;
      setItemInLocalStorage("FEATURES", features);

      const featNames = features.map((feature) => feature.feature_name);
      // vibe login
      // if (selectedSiteId === 10) {
      // if (featNames.includes("project_task")) {
      //   console.log("running myciti.life login");

      //   const vibeResponse = await vibeLogin({
      //     email: formData.email,
      //     password: formData.password,
      //   });
      //   console.log("vibe", vibeResponse);
      //   const vibeToken = vibeResponse.data.token.access.token;
      //   setItemInLocalStorage("VIBETOKEN", vibeToken);
      //   const vibeUserId = vibeResponse.data.data.user_id;
      //   setItemInLocalStorage("VIBEUSERID", vibeUserId);
      //   const vibeOrganizationId = vibeResponse.data.data.organization_id;
      //   setItemInLocalStorage("VIBEORGID", vibeOrganizationId);
      // }

      // console.log("skipped copilot");
      const loginD = response.data.user;
      setItemInLocalStorage("user", loginD);
      // console.log("User details", loginD);
      const userId = response.data.user.id;
      setItemInLocalStorage("UserId", userId);
      // console.log(userId)

      const unitId = response.data.user.unit_id;
      setItemInLocalStorage("UNITID", unitId);

      const building = response.data.buildings;
      setItemInLocalStorage("Building", building);
      // console.log("Buildingss-",building)

      const categories = response.data.categories;
      setItemInLocalStorage("categories", categories);
      const token = response.data.user.api_key;
      setItemInLocalStorage("TOKEN", token);

      // console.log(userName)
      const lastName = response.data.user.lastname;
      setItemInLocalStorage("LASTNAME", lastName);

      const userType = response.data.user.user_type;
      setItemInLocalStorage("USERTYPE", userType);
      const CompanyId = response.data.user.company_id;
      setItemInLocalStorage("COMPANYID", CompanyId);
      // setItemInLocalStorage("HRMSORGID", 4);
      setItemInLocalStorage("HRMSORGID", 1);
      // console.log(userType)

      const statuses = response.data.statuses;
      setItemInLocalStorage("STATUS", statuses);
      // console.log("Status", statuses)

      const complaint = response.data.complanits;
      setItemInLocalStorage("complaint", complaint);

      // console.log(userName)
      // console.log("Sit",selectedSiteId)
      toast.loading("Processing your data please wait...");
      // if (userType === "pms_admin") {
      //   navigate("/dashboard");
      // } else {
      //   navigate(selectedSiteId === 10 ? "/employee/dashboard" : "/mytickets");
      // }
      const route =
        userType === "pms_admin"
          ? "/dashboard"
          : selectedSiteId === 10
          ? "/employee/dashboard"
          : "/mytickets";

      // toast.loading("Processing your data, please wait...");
      setTimeout(() => {
        navigate(route);
      }, 100);

      toast.dismiss();

      toast.success("Login Successfully");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const togglePassword = () => {
    showPassword(!password);
  };

  // new Typewriter("#typewriter", {
  //   strings: ["Hello", "World"],
  //   autoStart: true,
  // });

  return (
    <>
      <style jsx>{`
        @keyframes rainbow {
          0% { color: #ff6b6b; text-shadow: 0 0 10px #ff6b6b; }
          16% { color: #4ecdc4; text-shadow: 0 0 10px #4ecdc4; }
          32% { color: #45b7d1; text-shadow: 0 0 10px #45b7d1; }
          48% { color: #96ceb4; text-shadow: 0 0 10px #96ceb4; }
          64% { color: #ffeaa7; text-shadow: 0 0 10px #ffeaa7; }
          80% { color: #dda0dd; text-shadow: 0 0 10px #dda0dd; }
          100% { color: #ff6b6b; text-shadow: 0 0 10px #ff6b6b; }
        }
        
        .rainbow-text {
          animation: rainbow 3s ease-in-out infinite;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 4s ease infinite;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .glow-effect {
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
      `}</style>
      
      <div
        className="h-screen relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage || wave})`,
          opacity: 0.9,
        }}
      >
        <div className="rounded-md">
          <h1 className="flex text-3xl p-2 px-10 font-semibold jersey-15-regular rainbow-text glow-effect">
            <Typewriter
              options={{
                strings: [
                  "My Citi Life",
                  "Welcome to My Citi World",
                  "Live Fully!",
                  "Experience Excellence",
                  "Your Digital Gateway"
                ],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
                pauseFor: 1500,
              }}
            />
          </h1>
        </div>
        <div className=" flex justify-center  h-[90vh] items-center">
          <div className="bg-white border-2 border-white w-[30rem] rounded-xl max-h-full p-5 shadow-2xl">
            <h1 className="text-2xl font-semibold text-center">Login</h1>
            <form onSubmit={onSubmit} className="m-2 flex flex-col gap-4 w-full ">
              <div className="flex flex-col gap-2 mx-5">
                <label htmlFor="email" className="font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" rounded-sm p-1 px-2 border border-black"
                  placeholder="example@company.com"
                  onChange={onChange}
                  value={formData.email}
                />
              </div>
              {page === "login" && (
                <div className="flex flex-col gap-2 relative mx-5">
                  <label htmlFor="password" className="font-medium">
                    Password:
                  </label>
                  <input
                    name="password"
                    id="password"
                    className="rounded-sm p-1 px-2 border border-black"
                    placeholder="**********"
                    type={password ? "text" : "password"}
                    onChange={onChange}
                    value={formData.password}
                  />
                  <div className="p-1 rounded-full  absolute top-12 right-2 transform -translate-y-1/2 cursor-pointer font">
                    {password ? (
                      <AiFillEye onClick={togglePassword} />
                    ) : (
                      <AiFillEyeInvisible onClick={togglePassword} />
                    )}
                  </div>
                </div>
              )}
              <div className="mx-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-gray-700 cursor-pointer"
                  >
                    Remember Me
                  </label>
                </div>

                <a
                  href="/setup/forgot-password"
                  className="text-blue-800 font-semibold hover:underline transition-all duration-300 ease-in-out hover:text-blue-600"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="flex justify-center gap-4 w-full">
                {page === "login" && (
                  <button
                    type="submit"
                    className="w-20 my-2 bg-black text-white p-1 rounded-md text-xl font-bold hover:bg-gray-300 "
                  >
                    Login
                  </button>
                )}
                {/* <p
                  onClick={() => setPage("sso")}
                  className="w-20 my-2 border-black border-2 p-1 cursor-pointer text-center rounded-md text-xl font-medium hover:bg-gray-300 "
                >
                  {page === "sso" ? "Submit" : "SSO"}
                </p> */}
              </div>
              {/* {page === "sso" && (
                <p
                  className="text-center cursor-pointer hover:text-blue-400"
                  onClick={() => setPage("login")}
                >
                  Login
                </p>
              )} */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
