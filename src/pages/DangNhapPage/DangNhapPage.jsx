import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormDangNhap from "./FormDangNhap/FormDangNhap";

export default function DangNhapPage() {
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  return (
    <div className="p-10 flex justify-center">
      <FormDangNhap />
    </div>
  );
}
