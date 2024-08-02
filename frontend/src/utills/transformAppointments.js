export function transformAppointmentsByDateAndStatus(appointments) {
  const appointmentsByDateAndStatus =
    organizeAppointmentsByDateAndStatus(appointments);

  // Transform the organized appointments into the desired format
  const transformedAppointments = [];

  Object.keys(appointmentsByDateAndStatus).forEach((date) => {
    const statusGroups = appointmentsByDateAndStatus[date];

    Object.keys(statusGroups).forEach((status) => {
      const appointmentsByStatus = statusGroups[status];

      transformedAppointments.push({
        day: appointmentsByStatus[0] ? appointmentsByStatus[0].date : "",
        bookings: appointmentsByStatus.length,
        date: parseInt(date, 10),
        status: status,
      });
    });
  });

  return transformedAppointments;
}
function organizeAppointmentsByDateAndStatus(appointments) {
  // Organize appointments by date and status
  const appointmentsByDateAndStatus = {};
  appointments.forEach((appointment) => {
    const dateKey = new Date(appointment.date).toDateString();
    const statusKey = appointment.status;

    if (!appointmentsByDateAndStatus[dateKey]) {
      appointmentsByDateAndStatus[dateKey] = {};
    }

    if (!appointmentsByDateAndStatus[dateKey][statusKey]) {
      appointmentsByDateAndStatus[dateKey][statusKey] = [];
    }

    appointmentsByDateAndStatus[dateKey][statusKey].push(appointment);
  });

  return appointmentsByDateAndStatus;
}
