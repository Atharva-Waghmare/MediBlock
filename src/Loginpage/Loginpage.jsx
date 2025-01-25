import React from 'react';
import './Loginpage.css';
import { useState } from 'react';
import Patient from './Patient';
import Doctor from './Doctor';
import Navbar from '../Navbar/Navbar';

export default function Loginpage() {
    const [active, setActive] = useState("patient");
    return (
        <div>
            <Navbar/>
            <div class='btn2'>
                <button onClick={() => setActive('patient')} class="cursor-pointer transition-all bg-zinc-500 text-white px-6 py-2 rounded-lg
                    border-zinc-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Patient</button>
                <button onClick={() => setActive('doctor')} class="cursor-pointer transition-all bg-zinc-500 text-white px-6 py-2 rounded-lg
                    border-zinc-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Doctor</button>
            </div>
            {active === 'patient' && <Patient />}
            {active === 'doctor' && <Doctor />}
            <footer className='footer'>
                <h1>MediBlock</h1>
            </footer>
        </div>
        );
}
