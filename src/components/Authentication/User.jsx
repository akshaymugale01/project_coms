import React, { useEffect, useState } from "react";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Navbar from "../Navbar";
import { resetPassword } from "../../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setColor } from "../../features/theme/themeSlice";
import { useDispatch } from "react-redux";
import { colors } from "../../utils/colors";
import FontSizeSelector from "./FontSizeSelector";
import { BsFillBrushFill } from "react-icons/bs";
import Background from "../Background";

function User() {
  const [user, setUser] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [password, setPassword] = useState(false);
  const [showPassword, setShowPassWord] = useState(false);
  const dispatch = useDispatch();
  const handleColorChange = (color) => {
    dispatch(setColor(color));
  };
  const togglePassword = () => {
    setPassword(!password);
  };
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeTheme, setChangeTheme] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem("Name");
    const formattedUserName = userName ? userName.replace(/"/g, "") : "";
    const lastName = localStorage.getItem("LASTNAME");
    const formattedLastName = lastName ? lastName.replace(/"/g, "") : "";
    setUserLastName(formattedLastName);

    setUser(formattedUserName);
    console.log(formattedLastName);
  });

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      return toast.error("Password Must Contain Atleast 8 Characters ");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Password Doesn't Match");
    }
    try {
      await resetPassword({
        password: newPassword,
      });
      toast.success("Password reset Successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  const [feat, setFeat] = useState("");
 

  const getAllowedFeatures = () => {
    const storedFeatures = getItemInLocalStorage("FEATURES");
    if (storedFeatures) {
      setFeat(storedFeatures.map((feature) => feature.feature_name));
    }
  };
  useEffect(() => {
  
    getAllowedFeatures();
  }, []);

  document.title = `Profile - Vibe Connect`;
  return (
    <div className="flex">
      <div>
        <Navbar />
      </div>
      <div className=" flex justify-center w-full">
        <div className="flex flex-col justify-center  min-h-screen  mx-10 w-full">
          <div className="bg-gray-200 p-4 flex flex-col w-full">
            <p className="">
              <span className="font-medium">Name : </span>
              <span className="text-lg">
                {" "}
                {user} {userLastName}
              </span>
            </p>

            <div className="w-full max-w-md">
              <div className="mt-4">
                <button
                  onClick={() => setShowPassWord(!showPassword)}
                  className="w-full bg-green-500 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Change Password
                </button>
                {showPassword && (
                  <div className="mt-4">
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="password" className="font-medium">
                        Enter New Password:
                      </label>
                      <input
                        name="password"
                        id="password"
                        className="rounded-sm p-1 px-2 border border-black"
                        placeholder="********"
                        type={password ? "text" : "password"}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <div className="p-1 rounded-full absolute top-12 right-2 transform -translate-y-1/2 cursor-pointer font">
                        {password ? (
                          <AiFillEye onClick={togglePassword} />
                        ) : (
                          <AiFillEyeInvisible onClick={togglePassword} />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 gap-2 relative">
                      <label htmlFor="password" className="font-medium">
                        Confirm Password:
                      </label>
                      <input
                        name="confirmPassword"
                        id="confirmPassword"
                        className="rounded-sm p-1 px-2 border border-black"
                        placeholder="********"
                        type={"password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handlePasswordReset}
                      className="w-full bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                    >
                      Save Password
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="my-2">
            <button
              className="bg-red-400 px-3 rounded-md p-1 text-white flex gap-2 items-center"
              onClick={() => setChangeTheme(!changeTheme)}
            >
              <BsFillBrushFill size={20} />
              Personalization
            </button>
            {changeTheme && (
              <div className="">
                <h2 className="text-xl mb-4">Choose a theme color:</h2>
                <div className="flex  flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className="p-4  text-white m-1 shadow-custom-all-sides rounded-sm"
                      style={{ background: color.code }}
                      onClick={() => handleColorChange(color.code)}
                    ></button>
                  ))}
                </div>
                {/* <FontSizeSelector /> */}
                {feat.includes("project_task") && (  <Background />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
