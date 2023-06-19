import { toast } from "react-toastify";

const Noti = (type, msg) => {
  toast(msg, {
    type: type,
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: true,
  });
};

export default Noti;
