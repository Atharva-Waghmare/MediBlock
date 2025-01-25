import React, { useState } from 'react';
import './Patient.css';
import upload from './upload.jpeg';

export default function Doctor() {
    const [image, setImage] = useState(upload); // Initial image

    // Handle image change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the new image as profile picture
            };
            reader.readAsDataURL(file); // Read the image file
        }
    };

    // Trigger file input click when button is clicked
    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div className='logincard'>
            <form className="form-control">
                <p className="title">Create Your Profile</p>
                <div className='profilepic'>
                    <img src={image} alt='Profile' id='pic' />
                    <button type="button" onClick={handleButtonClick} id='labelforpic'>
                        Update Image
                    </button>
                    <input
                        type='file'
                        accept='image/jpeg,image/png,image.jpg'
                        id='fileInput'
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>
                <div className="input-field">
                    <input required className="input" type="text" />
                    <label className="label">Enter Name</label>
                </div>
                <div className="input-field">
                    <input required className="input" type="number" />
                    <label className="label">Enter Age</label>
                </div>
                <div className="input-field">
                    <input required className="input" type="text" />
                    <label className="label">Enter Blood Group</label>
                </div>
                <button className="submit-btn">Create</button>
            </form>
        </div>
    );
}
