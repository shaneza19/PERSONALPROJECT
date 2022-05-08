import { React, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../config/axios";

import { ErrorContext } from "../../contexts/ErrorContext";

import itemImg from "../../assets/images/itemImg.jpg";

import { Modal } from "bootstrap";
import Spinner from "../utils/Spinner";
import { Button } from "antd";

export default function Image1Form() {

  const { setError } = useContext(ErrorContext);
  
  let { id } = useParams();
  const navigate = useNavigate()

  const [imgInput, setImgInput] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const modalEl = useRef();
  const inputEl = useRef();

  const handleClickProfile = () => {
    const modalObj = new Modal(modalEl.current);
    setModal(modalObj);
    modalObj.show();
  };

  const handleClickUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image_1", imgInput);
      const res = await axios.patch(`/real_estate/${id}`, formData);
      modal.hide();
      navigate('/filter_item');
    } catch (err) {
      setError("");
      setError(err.response.data.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <Button type="default" onClick={handleClickProfile}>
        รูป1
      </Button>
      <div className="modal" ref={modalEl}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Image 1</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setImgInput(null)}
              />
            </div>
            <div className="modal-body">
              <div className="mt-4 mb-5 d-flex justify-content-center">
                <input
                  type="file"
                  className="d-none"
                  ref={inputEl}
                  onChange={(e) => {
                    if (e.target.files[0]) setImgInput(e.target.files[0]);
                  }}
                />
                <img
                  src={
                    imgInput
                      ? URL.createObjectURL(imgInput)
                      : itemImg ?? itemImg
                  }
                  width="200"
                  height="200"
                  alt="user"
                  role="button"
                  onClick={() => inputEl.current.click()}
                />
              </div>
              <div className="d-grid">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!imgInput}
                  onClick={handleClickUpdate}
                >
                  แก้ไขรูป1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
