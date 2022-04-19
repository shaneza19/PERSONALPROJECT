import { React, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";
import itemImg from "../../assets/images/itemImg.jpg";
import { Modal } from "bootstrap";
import Spinner from "../utils/Spinner";
import { Button } from "antd";

export default function Image5Form() {
  
  let { id } = useParams();

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
      formData.append("image_5", imgInput);

      const res = await axios.patch(`/real_estate/${id}`, formData);
      modal.hide();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <Button type="default" onClick={handleClickProfile}>
        รูป5
      </Button>
      <div className="modal" ref={modalEl}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Image 5</h5>
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
                  แก้ไขรูป5
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
