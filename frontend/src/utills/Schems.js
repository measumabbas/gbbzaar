export const emailPattern = {
  value: /^\S+@\S+\.\S+$/,
  message: "Not a valid email",
};

export const passwordPattern = {
  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  message: "Password too weak",
};

export const namePattern = {
  value: /^[a-zA-Z\s]+$/,
  message: "Not a valid Name",
};

export const userNamePattern = {
  value: /^[a-zA-Z][a-zA-Z0-9]*$/,
  message: "Not a valid username",
};
export const phonePattern = {
  value: /^[0-9]{6,20}$/,
  message: "Not a valid phone number",
};

export const nameMaxLength = {
  value:10,
  message:"Should not be more then 10 characters"
}

export const nameMinLength = {
  value:3,
  message:"Should not be less then 3 characters"
}