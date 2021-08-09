import React from 'react';
import './BookingList.css';

const bookingList = props => (
	<ul className="booking_list">
		{props.bookings.map(booking => {
			return (<li key={booking._id} className="booking_list_item">
						<div className="bookings_item_data">{booking.event.title} - {' '}
					        {new Date(booking.createdAt).toLocaleDateString()}
					    </div>
				 
				        <div className="booking_item_actions">
				   	    	<button className="btn" onClick={props.onDelete.bind(this,booking._id)}>Cancel</button>
				        </div>
				   </li>);
		})}
	</ul>);

export default bookingList;