import React, { useState, useContext} from 'react';
import './CreateShow.css'; 
import '../boundary/venuePage.js'
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext, CurrentVenueIDContext, CurrentShowIDContext } from '../App';


const ManageBlock = () => {

    const { currentShowID, setCurrentShowID } = useContext(CurrentShowIDContext);

    const [blockDetails, setBlockDetails] = useState({
        name: '',
        price: '',
        startRow: '',
        startCol: '',
        endRow: '',
        endCol: '',
        startSection: '',
        endSection: ''
    });

    const handleBlockDetailChange = (type, value) => {
        setBlockDetails(prevDetails => ({
        ...prevDetails,
        [type]: value
        }));
    };

    const createBlock = async () => {
        
        let payload = {
            method: 'POST',
            mode: 'cors', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...blockDetails,
                showID: currentShowID
            })
        }
        try {
        
        //console.log(payload)
        const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/createBlock', payload);
        const answer = await response.json();
        const status = answer["statusCode"]
        const responseBody = answer["data"]

        if (status === 400) {
            console.error(responseBody)
            console.log(payload)
        } else {
            console.log(answer)
        }
        } 
        catch (error) {
        console.error('Error during authentication:', error);
        }
    };

    return (
        <div className="Block-creation-section">
        <h3>Create Block</h3>
        <input
            type="text"
            placeholder="Block Name"
            value={blockDetails.name}
            onChange={(e) => handleBlockDetailChange('name', e.target.value)}
            className="Block-input"
        />
        <input
            type="number"
            placeholder="Price"
            value={blockDetails.price}
            onChange={(e) => handleBlockDetailChange('price', e.target.value)}
            className="Block-input"
        />
        <input
            type="text"
            placeholder="Start Row (e.g., A)"
            value={blockDetails.startRow}
            onChange={(e) => handleBlockDetailChange('startRow', e.target.value)}
            className="Block-input"
        />
        <input
            type="number"
            placeholder="Start Column (e.g., 1)"
            value={blockDetails.startCol}
            onChange={(e) => handleBlockDetailChange('startCol', e.target.value)}
            className="Block-input"
        />
        <input
            type="text"
            placeholder="End Row (e.g., A)"
            value={blockDetails.endRow}
            onChange={(e) => handleBlockDetailChange('endRow', e.target.value)}
            className="Block-input"
        />
        <input
            type="number"
            placeholder="End Column (e.g., 1)"
            value={blockDetails.endCol}
            onChange={(e) => handleBlockDetailChange('endCol', e.target.value)}
            className="Block-input"
        />
        <input
            type="text"
            placeholder="Start Section (e.g., left)"
            value={blockDetails.startSection}
            onChange={(e) => handleBlockDetailChange('startSection', e.target.value)}
            className="Block-input"
        />
        <input
            type="text"
            placeholder="End Section (e.g., left)"
            value={blockDetails.endSection}
            onChange={(e) => handleBlockDetailChange('endSection', e.target.value)}
            className="Block-input"
        />
        <button className="Create-block-button" onClick={createBlock}>Create Block</button>
        </div>
    );
}

export default ManageBlock;