import React from 'react';
import { Navigate } from 'react-router-dom';
import { getItemInLocalStorage } from '../utils/localStorage';
import toast from 'react-hot-toast';

const ProtectedAdminRoutes = ({children}) => {
    const token = getItemInLocalStorage('TOKEN') || null;
    const user = getItemInLocalStorage("USERTYPE")
    if (!token || user !== "pms_admin") {
      toast.error('Not Authorized', );
      return <Navigate to={'/mytickets'} />;
    }
  
    return <>{children}</>;
}

export default ProtectedAdminRoutes
