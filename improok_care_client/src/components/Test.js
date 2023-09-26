import React, { useEffect, useState } from 'react';

function Test() {
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
    }, []);

    return (
        <div>
            <label htmlFor="dateInput">Chọn ngày:</label>
            <input type="date" id="dateInput" min={minDate} />
        </div>
    );
}

export default Test;