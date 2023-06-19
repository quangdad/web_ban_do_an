import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddProducerModal,
  setAddProductModal,
} from "../../redux/reducers/modalReducer";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import moment from "moment";
import producerApi from "../../api/producerApi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FileBase64 from "react-file-base64";
import { LoadingButton } from "@mui/lab";
import Noti from "../common/Toast";
import productApi from "../../api/productApi";
import { productType } from "../../access/dataType/TypeProducts";
import { imageUpload } from "../common/uploadImage";
import { setLoadingR } from "../../redux/reducers/loadingReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function AddProductModal() {
  const [nameErr, setNameErr] = useState("");
  const [descErr, setDesErr] = useState("");
  const [countErr, setCountErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [hsxErr, setHsxErr] = useState("");
  const [hsdErr, setHsdErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState("");
  const [value, setValue] = useState(0);
  const [kieu, setKieu] = useState("");
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [producers, setProducers] = useState([]);

  const open = useSelector((state) => state.modal.product);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getType = () => {
      productType.map((e) => {
        if (e.type === kieu) {
          setTypes(e.data);
        }
      });
    };

    getType();
  }, [kieu]);

  React.useEffect(() => {
    const getProducts = async () => {
      const products = await productApi.getAllProducts();
      setProducts(products);
    };
    getProducts();

    const getProducrs = async () => {
      const producers = await producerApi.getAll();
      setProducers(producers);
    };
    getProducrs();
  }, []);

  const handleClose = () => {
    dispatch(setAddProductModal(false));
    setLoading(false);
  };

  const handleSelectImage = async (e) => {
    const img = await imageUpload(e.base64);
    setImage(img);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeKieu = (e) => {
    setKieu(e.target.value);
  };
  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      producerId: value,
      image,
      count: formData.get("count"),
      price: formData.get("price"),
      type: `${kieu}/${type}`,
      hsx: formData.get("hsx"),
      hsd: formData.get("hsd"),
    };
    let err = false;
    if (data.name === "") {
      setNameErr("Bạn chưa nhập tên");
      err = true;
    }
    if (data.description === "") {
      setNameErr("Hãy nhập thông tin sản phẩm");
      err = true;
    }
    if (Number(data.count) === 0) {
      setCountErr("Số lượng không hợp lệ");
      err = true;
    }
    if (Number(data.price) === 0) {
      setPriceErr("Giá tiền không hợp lệ");
      err = true;
    }
    if (data.image === "") {
      Noti("error", "Vui lòng chọn ảnh cho sản phẩm");
      err = true;
    }
    if (data.hsd === data.hsx) {
      setHsdErr("Hạn sử dụng không hợp lệ");
      err = true;
    }
    if (err) return;

    setNameErr("");
    setDesErr("");
    setHsdErr("");
    setImage("");
    setCountErr(0);
    setPriceErr(0);

    setLoading(true);

    try {
      const product = await productApi.create(data);
      await productApi.getAllProducts();
      Noti("success", "Đã thêm thành công ", product.name);
      setLoading(false);
      dispatch(setAddProductModal(false));
    } catch (error) {
      setLoading(false);
      Noti("error", error.data);
    }
  };

  const handleAddProducers = () => {
    dispatch(setLoadingR(true));
    dispatch(setAddProducerModal(true));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" fontWeight={600} variant="h5">
            Thêm sản phẩm mới
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            {image === "" ? (
              <Typography>Chọn 1 ảnh</Typography>
            ) : (
              <img
                src={image}
                alt="image"
                style={{
                  width: 400,
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              />
            )}
            <FileBase64 multiple={false} onDone={handleSelectImage} />
            <TextField
              label="Tên sản phẩm"
              margin="normal"
              name="name"
              error={nameErr !== ""}
              helperText={nameErr}
              fullWidth
              required
            />
            <TextField
              label="Thông tin sản phẩm"
              margin="normal"
              name="description"
              error={descErr !== ""}
              helperText={descErr}
              fullWidth
              required
            />
            <FormControl sx={{ width: "45%", mr: "5%" }} margin="normal">
              <InputLabel id="demo-simple-select-label">Kiểu</InputLabel>
              <Select value={kieu} label="Kiểu" onChange={handleChangeKieu}>
                {productType.map((e, i) => (
                  <MenuItem key={i} value={e.type}>
                    {e.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{ width: "45%", ml: "5%" }}
              margin="normal"
              error={type === ""}
            >
              <InputLabel id="demo-simple-select-label">Loại</InputLabel>
              <Select value={type} label="Loại" onChange={handleChangeType}>
                {types?.map((e, i) => (
                  <MenuItem key={i} value={e.type}>
                    {e.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <FormControl sx={{ width: "80%" }} margin="normal">
                <InputLabel id="demo-simple-select-label">
                  Nhà sản xuất
                </InputLabel>
                <Select
                  value={value}
                  label="Nhà sản xuất"
                  onChange={handleChange}
                >
                  {producers.map((producer, i) => (
                    <MenuItem key={producer._id} value={producer._id}>
                      {producer.fullname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                sx={{ width: "15%", fontWeight: "600" }}
                onClick={handleAddProducers}
              >
                ADD
              </Button>
            </Box>
            <TextField
              label="Số lượng"
              margin="normal"
              name="count"
              type="number"
              required
              error={countErr !== ""}
              helperText={countErr}
              sx={{ width: "45%", mr: "5%" }}
            />
            <TextField
              label="Giá"
              margin="normal"
              name="price"
              type={"number"}
              required
              error={priceErr !== ""}
              helperText={priceErr}
              sx={{ width: "45%", ml: "5%" }}
            />
            <TextField
              label="Ngày sản xuất"
              margin="normal"
              name="hsx"
              error={hsxErr !== ""}
              helperText={hsxErr}
              sx={{ width: "45%", mr: "5%" }}
              type={"date"}
              defaultValue={moment(new Date()).format("yyyy-MM-DD")}
            />
            <TextField
              label="Hạn sử dụng"
              margin="normal"
              name="hsd"
              type={"date"}
              error={hsdErr !== ""}
              defaultValue={moment(new Date()).format("yyyy-MM-DD")}
              sx={{ width: "45%", ml: "5%" }}
            />
            <Box>
              <LoadingButton
                sx={{ mt: 2 }}
                variant="contained"
                color="success"
                fullWidth
                type={"submit"}
                loading={loading}
              >
                Thêm
              </LoadingButton>
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="warning"
                fullWidth
                onClick={handleClose}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
