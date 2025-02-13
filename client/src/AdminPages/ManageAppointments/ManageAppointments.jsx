import React, { useEffect, useState } from 'react';
import Loader from '../../Components/Loader/Loader';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showReasonBox, setShowReasonBox] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    fetch('https://purple-scissors.onrender.com/appointment/allappointments')
      .then((response) => response.json())
      .then((data) => {
        const appointments = data.appointments || [];
        const sortedAppointments = appointments.sort((a, b) => {
          const dateA = new Date(a.Date);
          const dateB = new Date(b.Date);

          if (dateA.getTime() === dateB.getTime()) {
            const timeA = convertTo24HourFormat(a.Time);
            const timeB = convertTo24HourFormat(b.Time);
            return timeA - timeB;
          }

          return dateA.getTime() - dateB.getTime();
        });
        setAppointments(sortedAppointments);
      })
      .catch((error) => console.error('Error fetching appointments:', error));
  }, []);

  const convertTo24HourFormat = (time) => {
    const [timeString, modifier] = time.split(' ');
    let [hours, minutes] = timeString.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    return new Date(1970, 0, 1, hours, minutes).getTime();
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReasonBox(true);
  };

  const handleSubmitCancellation = async () => {
    if (!reason) {
      alert('Please enter a reason for cancellation');
      return;
    }

    try {
      const { Date, Time, _id } = selectedAppointment;

      const response = await fetch('https://purple-scissors.onrender.com/appointment/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointments: [{ Date, Time, Reason: reason }],
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setAppointments(appointments.filter((appt) => appt._id !== _id));
        setShowReasonBox(false);
        setReason('');
        alert('Appointment deleted successfully and email sent.');
      } else {
        alert(result.error || 'Failed to delete appointment.');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Error deleting appointment.');
    }
  };
  if(appointments.length===0){
    return <Loader/>;
  }else{
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-8">
      <h1 className="text-3xl font-bold text-center text-[#204E4A] mb-4 font-kugile">Manage Appointments</h1>
      <div className="space-y-8">
        {[...new Set(appointments.map((appt) => appt.Date))].map((date) => (
          <div key={date} className="bg-white shadow-lg rounded-lg p-3">
            <h2 className="text-xl font-semibold text-[#204E4A] mb-4 border-b border-gray-300 pb-2">
              {new Date(date).toDateString()}
            </h2>
            <ul className="space-y-4">
              {appointments
                .filter((appt) => appt.Date === date)
                .map((appt) => (
                  <li
                    key={appt._id}
                    className="flex flex-wrap items-center justify-between bg-gray-50 rounded-md shadow p-4 border-l-4 border-[#2FA79B] space-x-4"
                  >
                    {/* Avatar and Customer Details */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={appt.Email ? `https://static.vecteezy.com/system/resources/previews/007/455/740/non_2x/woman-face-portrait-in-minimalist-modern-style-continuous-one-line-drawing-with-abstract-shapes-illustration-for-design-cards-posters-vector.jpg` : 'https://via.placeholder.com/40'}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-lg text-gray-700">
                          <strong>Name:</strong> {appt.Name}
                        </p>
                        <p className="text-lg text-gray-700">
                          <strong>Time:</strong> {appt.Time}
                        </p>
                      </div>
                    </div>

                    {/* Services Display */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <strong className='text-md'>Services: </strong>
                      {appt.Services.map((service, index) => (
                        <span
                          key={index}
                          className="bg-[#2FA79B] text-white px-2 py-1 rounded-md text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteClick(appt)}
                      className="bg-[#E53E3E] text-white px-4 py-2 rounded-md shadow hover:bg-[#C53030] transition w-full sm:w-auto mt-4 sm:mt-0"
                    >
                      Cancel Appointment
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {showReasonBox && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold text-[#204E4A] mb-4">Enter Reason for Cancellation</h2>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowReasonBox(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCancellation}
                className="bg-[#2FA79B] text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
};

// Helper to generate Gravatar hash for email
const md5 = (email) => {
  return email.trim().toLowerCase();
};

export default ManageAppointments;
