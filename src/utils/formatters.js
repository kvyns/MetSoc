export const formatTime = (timeString) => {
  if (!timeString) return '';
  
  // Handle formats like "9:00 AM - 10:00 AM" or "9:00-10:00"
  const parts = timeString.split('-').map(part => part.trim());
  
  if (parts.length !== 2) return timeString;

  // Format each time part
  const formattedParts = parts.map(time => {
    // Remove any existing AM/PM
    time = time.replace(/\s*(AM|PM)/i, '').trim();
    
    // Parse hours and minutes
    let [hours, minutes] = time.split(':').map(num => parseInt(num));
    
    // Convert to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    // Format with leading zeros and proper spacing
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  });

  return formattedParts.join(' - ');
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatEventDates = (startDate, endDate) => {
  if (!startDate) return '';

  const start = new Date(startDate);
  if (isNaN(start)) return startDate;

  if (!endDate) {
    return start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  const end = new Date(endDate);
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (sameMonth && sameYear) {
    return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
  } else if (sameYear) {
    return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()} - ${end.toLocaleDateString('en-US', { month: 'short' })} ${end.getDate()}, ${start.getFullYear()}`;
  } else {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }
};

export const formatRegistrationDeadline = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
