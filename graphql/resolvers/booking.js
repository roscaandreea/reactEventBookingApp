const Booking = require('../../models/booking');
const Event = require('../../models/event');
const {transformBooking,transformEvent} = require('./mergeData');


module.exports = {
    bookings: async (args,req) =>{
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
        try{
            const bookings = await Booking.find({user: req.userId});
            return bookings.map(booking =>{
                return transformBooking(booking);
            });
        }
        catch(err){
            console.log(err);
            throw err;
        }
    },
    bookEvent: async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
        const fetchedEvent = await Event.findOne({_id: args.eventId});
        const booking = new Booking({       
            user: req.userId,
            event: fetchedEvent
        });
        const resultBooking = await booking.save();
        return transformBooking(resultBooking);
    },
    cancelBooking : async (args,req) => {
        if(!req.isAuth){
            throw new Error("Unauthenticated");
        }
        try{
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event =transformEvent(booking.event);
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        } catch(err){
            console.log(err);
            throw err;
        }
    }
};