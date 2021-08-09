import React from 'react';
import './EventItem.css';

const eventItem = props => (
    <li key={props.eventId} className="events_list_item">
    <div>
			<h1>{props.title}</h1>
			<h2>${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
		</div>
		<div>
			{props.userId === props.creatorId ?
			    (<React.Fragment>
					<p>You are the owner of this event.</p>
					<button className="btn btn_item">Delete Event</button>
				</React.Fragment>) : (
            <button className="btn" onClick={props.onDetail.bind(this,props.eventId)}>See more...</button>)}
			
		</div>
    </li>
);

export default eventItem;