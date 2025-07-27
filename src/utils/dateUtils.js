// src/utils/dateUtils.js

export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString);
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('fr-FR', { ...defaultOptions, ...options });
};

export const formatDateShort = (dateString) => {
  return formatDate(dateString, { 
    day: 'numeric', 
    month: 'short' 
  });
};

export const formatDateWithWeekday = (dateString) => {
  return formatDate(dateString, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  
  return date.toDateString() === today.toDateString();
};

export const isUpcoming = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  
  return date >= today;
};

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Aujourd\'hui';
  if (diffDays === 1) return 'Demain';
  if (diffDays === -1) return 'Hier';
  if (diffDays > 1) return `Dans ${diffDays} jours`;
  if (diffDays < -1) return `Il y a ${Math.abs(diffDays)} jours`;
  
  return formatDateShort(dateString);
};

export const getSeason = (date = new Date()) => {
  const month = date.getMonth();
  
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

export const isWinterSchedule = (date = new Date()) => {
  const month = date.getMonth();
  return month >= 10 || month <= 2; // Nov, Dec, Jan, Feb, Mar
};

export const getNextSaturday = (from = new Date()) => {
  const date = new Date(from);
  const dayOfWeek = date.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
  
  if (daysUntilSaturday === 0) {
    // Si c'est déjà samedi, prendre le prochain
    date.setDate(date.getDate() + 7);
  } else {
    date.setDate(date.getDate() + daysUntilSaturday);
  }
  
  return date;
};

export const formatTimeFromDate = (date) => {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};