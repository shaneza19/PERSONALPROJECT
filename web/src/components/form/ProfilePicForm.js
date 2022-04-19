import { React, useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../config/axios";
import profileImg from "../../assets/images/profileImg.png";
import { Modal } from "bootstrap";
import Spinner from "../utils/Spinner";

export default function ProfilePicForm() {
  const [imgInput, setImgInput] = useState(null);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const modalEl = useRef();
  const inputEl = useRef();

  const { user, updateUser } = useContext(AuthContext);

  const handleClickProfile = () => {
    const modalObj = new Modal(modalEl.current);
    setModal(modalObj);
    modalObj.show();
  };

  const handleClickUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profile_img", imgInput);

      const res = await axios.patch("/user/profile_img", formData);
      updateUser({ profile_img: res.data.profile_img });
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
      <div className="navbar-brand" role="button" onClick={handleClickProfile}>
        <p>แก้ไข</p>
      </div>
      <div className="modal" ref={modalEl}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile Picture</h5>
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
                      : user.profileImg ?? profileImg
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
                  แก้ไขรูปโปรไฟล์
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
