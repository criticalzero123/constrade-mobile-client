import { MD3Colors } from "react-native-paper";

var passwordValidator = require("password-validator");
var schema = new passwordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(50) // Maximum length 50
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(); // Must have digits

// This check if the words is available in the list.
// return 4 => strong password
// return 3 => medium password
// return 2 => medium password
// return 1 => weak password
// return 0 => weak password
export const passwordMeterChecker = (password) => {
  const list = schema.validate(password, { list: true });

  let _meter = 4;

  const stringlist = list.toLocaleString();
  if (stringlist.includes("uppercase")) _meter--;
  if (stringlist.includes("min")) _meter--;
  if (stringlist.includes("lowercase")) _meter--;
  if (stringlist.includes("digits")) _meter--;

  switch (_meter) {
    case 0:
      return 0;
    case 1:
      return 0.3;
    case 2:
    case 3:
      return 0.6;
    case 4:
      return 1;
  }
};

export const passwordMeterColor = (value) => {
  if (value === 0) return "#808080";
  if (value === 0.3) return "#D91616";
  if (value === 0.6) return "#FFA500";
  if (value === 1) return "#13872C";
};

export const passwordMeterWord = (value) => {
  if (value === 0) return "";
  if (value === 0.3) return "Weak password";
  if (value === 0.6) return "Fair password";
  if (value === 1) return "Strong password";
};

export default schema;
