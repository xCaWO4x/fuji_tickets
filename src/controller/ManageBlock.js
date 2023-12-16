import React, { useState, useContext, useEffect } from 'react';
import './CreateShow.css'; 
import '../boundary/venuePage.js'
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext, CurrentVenueIDContext, CurrentShowIDContext } from '../App';


const ManageBlock = () => {

    const { currentShowID, setCurrentShowID } = useContext(CurrentShowIDContext);
    const [blocks, setBlocks] = useState([]);
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

    useEffect(() => {
        const initializeData = async () => {
            try {
                await fetchBlocks();
                const availableSeats = await fetchAvailableSeats();
                if (availableSeats && availableSeats.length > 0) {
                    processBlockSeatsData(availableSeats);
                }
            } catch (error) {
                console.error("Error initializing block data:", error);
            }
        };
    
        initializeData();
    }, [currentShowID]);

    const fetchBlocks = async () => {
        const showID = currentShowID; // Assume currentShowID is obtained from context
        if (showID > 0) {
            try {
                const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/listBlocks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ showID })
                });
    
                const data = await response.json();
                if (data.statusCode === 200) {
                    setBlocks(data.data);
                } else {
                    console.error('Error fetching blocks:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

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
            console.log(answer)
            console.log(payload)
        } else {
            console.log(answer)
        }
        } 
        catch (error) {
        console.error('Error during authentication:', error);
        }
    };


    const fetchAvailableSeats = async () => {
        const showID = currentShowID; // Assume currentShowID is obtained from context
        if (showID > 0) {
            let payload = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ showID })
            };
    
            try {
                const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/showAvailableSeats', payload);
                const answer = await response.json();
                const status = answer["statusCode"]
    
                if (status === 200) {
                    return answer.seats;
                } else {
                    console.error('Error fetching available seats:', answer);
                    console.log(payload.body)
                    throw new Error(`API Error: ${answer.data}`); // Throw an error with a more descriptive message
                }
            } catch (error) {
                console.error('Error:', error); // Log the full error object
                console.log(payload.body)
                return []; // Return empty array in case of error
            }
        }
        return []; // Return empty array in case of error or invalid showID
    };
    


    const processBlockSeatsData = async (availableSeats) => { 
        const blocksData = await fetchBlocks();
    
        if (!Array.isArray(blocksData) || !Array.isArray(availableSeats)) {
            return;
        }
    
        const updatedBlocks = blocksData.map(block => {
            const seatsInBlock = availableSeats.filter(seat => {
                const startRow = block.startRow.charCodeAt(0);
                const endRow = block.endRow.charCodeAt(0);
                const seatRow = seat.row.charCodeAt(0);
    
                const rowMatch = seatRow >= startRow && seatRow <= endRow;
                const colMatch = seat.col >= parseInt(block.startCol) && seat.col <= parseInt(block.endCol);
                const sectionMatch = seat.section === block.startSection;
                
                return rowMatch && colMatch && sectionMatch;
            });
    
            const soldSeats = seatsInBlock.filter(seat => seat.purchased === 1);
            const remainingSeats = seatsInBlock.length - soldSeats.length;
    
            return {
                ...block,
                soldSeats: soldSeats.length,
                remainingSeats
            };
        });
    
        setBlocks(updatedBlocks);
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

        <div className="Blocks-list-section">
                <h3>Blocks List</h3>
                {blocks.length > 0 ? (
                    blocks.map(block => (
                        <div key={block.blockID} className="Block-info">
                            <div>Block Name: {block.name}</div>
                            <div>Price: {block.price}</div>
                            <div>Seats Sold: {block.soldSeats}</div>
                            <div>Seats Remaining: {block.remainingSeats}</div>
                            {/* Add more block details as needed */}
                        </div>
                    ))
                ) : (
                    <p>No blocks available or data is loading...</p>
                )}
            </div>
        </div>
    );
};

export default ManageBlock;