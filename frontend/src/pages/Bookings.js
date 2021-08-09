import React, {Component} from 'react';
import AuthContext from '../context/auth_context';
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList/BookingList';
import BookingCharts from '../components/Bookings/BookingCharts/BookingCharts';
import BookingControls from '../components/Bookings/BookingControls/BookingControls';

class BookingsPage extends Component {

    state = {
		isLoading: false,
        bookings: [],
        outputType: 'list'
    };
    static contextType = AuthContext;
    componentDidMount(){
		this.fetchBooking();
    }
    fetchBooking = () => {
		this.setState({isLoading: true});
		const reqBody = {
          query: `
            query {
              bookings {
                _id
                createdAt
                event {
                	_id
                	title
                    date
                    price
                }
            }
           }
          `
        };

      fetch('http://localhost:8000/api', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json',
           'Authorization': 'Andreea ' + this.context.token
        }
      }).then(res => {
        if(res.status !==200){
          throw new Error('Failed');
        }
        return res.json();
      }).then(resData => {
        const bookings = resData.data.bookings;
        this.setState({bookings: bookings,isLoading: false});
        console.log(resData);

      }).catch(err =>{
        console.log(err);
        this.setState({isLoading: false});
      });
    };
    
    deleteBookingHandler = bookingId => {
        const reqBody = {
              query: `
                mutation cancelBooking($id: ID!) {
                  cancelBooking(bookingId: $id) {
                    _id
                    title
                }
               }
              `,
              variables: {
                  id: bookingId
              }
            };
    
          fetch('http://localhost:8000/api', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'andreea ' + this.context.token
            }
          }).then(res => {
            if(res.status !==200){
              throw new Error('Failed');
            }
            return res.json();
          }).then(resData => {
            this.setState(prevState => {
              const updatedBooking = prevState.bookings.filter(booking =>{
                return booking._id !== bookingId;
              });
              return {bookings: updatedBooking,isLoading: false};
            });
    
          }).catch(err =>{
            console.log(err);
            this.setState({isLoading: false});
          });
      };
      changeOutputTypeHandler = outputType => {
        if(outputType === 'list'){
            this.setState({outputType: 'list'});
        } else {
            this.setState({outputType: 'chart'});
        }
      };
    render(){
        let content = <Spinner />;
        if(!this.state.isLoading){
            content = (
                <React.Fragment>
                    <BookingControls 
                        activeOutputType={this.state.outputType}
                        onChange={this.changeOutputTypeHandler}
                    />
                    <div>
                        {this.state.outputType === 'list' ? ( 
                            <BookingList 
                                bookings={this.state.bookings}
                                onDelete={this.deleteBookingHandler} 
                            />) : (
                            <BookingCharts 
                                bookings={this.state.bookings} 
                            />) 
                        }
                    </div>
                </React.Fragment>
            );
        }
        return(
        <React.Fragment>
            {content}
        </React.Fragment>);
    }
};
export default BookingsPage;
