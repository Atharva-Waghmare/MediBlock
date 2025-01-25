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

    return (
        <div className='logincard'>
            <form className="form-control" action="">
                <p className="title">Create Your Profile</p>
                <div className='profilepic'>
                    <img src={image} alt='upload' id='pic' />
                    <label htmlFor='file' id='labelforpic'>Update Image</label>
                    <input
                        type='file'
                        accept='image/jpeg,image/png,image.jpg'
                        id='file'
                        onChange={handleImageChange} // Handle image selection
                    />
                </div>
                <div className="input-field">
                    <input required className="input" type="text" />
                    <label className="label" htmlFor="input">Enter Name</label>
                </div>
                <div className="input-field">
                    <input required className="input" type="password" />
                    <label className="label" htmlFor="input">Enter Age</label>
                </div>
                <div className="input-field">
                    <input required className="input" type="password" />
                    <label className="label" htmlFor="input">Enter Blood Group</label>
                </div>
                <button className="submit-btn">Create</button>
            </form>
        </div>
    );
}
