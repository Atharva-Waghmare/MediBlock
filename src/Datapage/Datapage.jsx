import React from 'react';
import './Datapage.css'
import { useState } from 'react';
import uploadicon from '../assets/uploadicon.jpg'
import { useFileUpload, pinFileToIPFS } from "./ipfs.js";
import { ethers } from 'ethers';
import axios from 'axios';
import Navbar from '../Navbar/Navbar.js';
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("wallet_switchEthereumChain", [{ chainId: "0xAA36A7" }]);  // Sepolia chainId (hex)
const contractAddress = "0xf74521381cf4f0fe83b3216ccc0f77d41890429b"; //adress'o
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "uploader",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
            }
        ],
        "name": "FileUploaded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "fileHashes",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getFileHashes",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
            }
        ],
        "name": "uploadFile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const FileUploader = () => {
    const { file, handleFileChange } = useFileUpload();
    const [contract, setContract] = useState(null);
    const [ipfsLinks, setIpfsLinks] = useState([]);


    const handleUpload = async () => {
        if (file) {
            try {
                await provider.send("eth_requestAccounts", []);
                const accounts = await provider.listAccounts();
                const signer = provider.getSigner(accounts[0]);

                const ipfsHash = await pinFileToIPFS(file);
                const fileName = file.name; // Capture file name locally

                const contract = new ethers.Contract(contractAddress, abi, signer);
                await contract.uploadFile(ipfsHash);

                // Store filename with hash in local storage
                const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
                uploadedFiles.push({ name: fileName, hash: ipfsHash });
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

                console.log("Uploaded:", fileName, "IPFS Hash:", ipfsHash);
            } catch (error) {
                console.error("Error during upload:", error);
            }
        } else {
            console.log('No file selected');
        }
    };


    const fetchFromIPFS = async () => {
        try {
            const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

            const links = uploadedFiles.map(file => ({
                link: `https://gateway.pinata.cloud/ipfs/${file.hash}`,
                name: file.name
            }));

            setIpfsLinks(links);
        } catch (error) {
            console.error("Error fetching files from local storage:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="wrapper">
                <header>File Uploader/Fetcher</header>
                <div className='uploadbox'>
                    <img src={uploadicon} alt='upload'></img>
                    <input type="file" onChange={handleFileChange} className='selectfile' />
                    <div>
                        <button onClick={handleUpload} className='Backbotm' class="cursor-pointer transition-all bg-zinc-500 text-white px-6 py-2 rounded-lg
                        border-zinc-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                        Upload</button>
                    </div>
                </div>
            </div>
            <div className='fetchgang'> {/* fetchwalathing */}
                <h1>Document List</h1>
                <button onClick={fetchFromIPFS} className='Backbotm' class="cursor-pointer transition-all bg-zinc-500 text-white px-6 py-2 rounded-lg
                    border-zinc-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                    Fetch</button>
                <div>
                    <ul>
                        {ipfsLinks.map((file, index) => (
                            <li key={index}>
                                <a href={file.link} target="_blank" rel="noopener noreferrer" className="beach-button">
                                    <span className="button-content">{file.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <footer className='footer'>
                <h1>MediBlock</h1>
            </footer>
        </div>

    );
};

export default FileUploader;
