import React from "react";

export interface FormData {
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export interface AuthCtxType {
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFormData: () => void;
  verifyToken: () => void;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  logoutHandler: () => void;
  isTokenExp: () => void;
  showFeedback: boolean;
  setShowFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  feedMsg: string;
  setFeedMsg: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onShowForm: (login: boolean) => void;
}

// TEMPLATES

export const FormDataTemplate = {
  email: "",
  username: "",
  password: "",
  avatar: "",
};
