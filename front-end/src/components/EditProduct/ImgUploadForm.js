import React, { useState } from "react";
import axios from "axios";
import { cloudinary_url as url } from "../../utils/constants";

const ImgUploadForm = ({ newImgUrl, isLoading }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleDrop = (file) => {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qjuqdtyf");
    formData.append("timestamp", (Date.now() / 1000) | 0);
    isLoading();
    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    axios
      .post(url, formData, {
        headers: { "content-type": "multipart/form-data" },
      })

      .then((response) => {
        const data = response.data;
        const fileUrl = data.secure_url;
        newImgUrl(fileUrl);
        isLoading();
        return fileUrl;
      });
  };

  const types = ["image/png", "image/jpg", "image/jpeg"];
  // const types = ["image/png", "image/jpg", "image/jpeg", "audio/mpeg"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      handleDrop(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <form>
      <label htmlFor='files'>
        שינוי תמונה
        <input
          type='file'
          onChange={changeHandler}
          id='files'
          name='files'
          style={{ display: "none" }}
        />
      </label>
      <div className='output'>
        {error && <div className='error'>{error}</div>}
        {file && <div className=''>{file.name}</div>}
      </div>
    </form>
  );
};

export default ImgUploadForm;
