import { Console } from "console";
import { I_Profile } from "../typescript/interfaces";
interface I_State {
  user: I_Profile;
  token: "";
}
const initState: I_State = {
  user: {
    imgUrl: "",
    firstName: "",
    lastName: "",
    residentState: "",
    address: "",
    phoneNumber: "",
    email: "",
    isVerified: false,
    bankDetails: {
      bankName: "",
      accountNumber: "",
    },
  },
  token: "",
};

export function reducer(state: I_State = initState, action: any) {
  switch (action.type) {
    case "LOG":
      console.log("a");
      return state;
    default:
      return state;
  }
}
