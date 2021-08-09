import React from 'react';
import './BookingControls.css';

const bookingControls = props => {
    return(
        <div className="booking_control">
            <button className={props.activeOutputType === 'list' ? 'active' : ''} 
                    onClick={props.onChange.bind(this,'list')}>
                    List Of Bookings
            </button>
            <button className={props.activeOutputType === 'chart' ? 'active' : ''} 
                    onClick={props.onChange.bind(this,'chart')}>
                    Charts
            </button>
        </div>
    );
};

export default bookingControls;