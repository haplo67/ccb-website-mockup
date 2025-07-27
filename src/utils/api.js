// src/utils/api.js

// Configuration API Nextcloud
const NEXTCLOUD_CONFIG = {
  baseUrl: process.env.VITE_NEXTCLOUD_URL || 'https://nextcloud.cycloclubbohars.org',
  username: process.env.VITE_NEXTCLOUD_USER || '',
  password: process.env.VITE_NEXTCLOUD_PASSWORD || '',
  // Pour la production, utiliser des tokens d'application plutôt que des mots de passe
};

// Headers d'authentification
const getAuthHeaders = () => {
  if (!NEXTCLOUD_CONFIG.username || !NEXTCLOUD_CONFIG.password) {
    console.warn('Nextcloud credentials not configured, using mock data');
    return {};
  }
  
  const credentials = btoa(`${NEXTCLOUD_CONFIG.username}:${NEXTCLOUD_CONFIG.password}`);
  return {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json',
  };
};

// Fonction générique pour les appels API
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${NEXTCLOUD_CONFIG.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// API Calendar (Agenda)
export const calendarAPI = {
  async getEvents() {
    try {
      const endpoint = '/remote.php/dav/calendars/ccb/personal/';
      const response = await apiCall(endpoint, {
        method: 'PROPFIND',
        headers: {
          'Depth': '1',
          'Content-Type': 'application/xml',
        },
        body: `<?xml version="1.0" encoding="utf-8" ?>
          <d:propfind xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
            <d:prop>
              <d:getetag />
              <c:calendar-data />
            </d:prop>
          </d:propfind>`
      });
      
      // Parser la réponse XML pour extraire les événements
      // En attendant, retourner des données mock
      return mockEvents();
    } catch (error) {
      console.error('Calendar API error:', error);
      return mockEvents();
    }
  }
};

// API Files (Circuits GPX)
export const filesAPI = {
  async getCircuits() {
    try {
      const endpoint = '/ocs/v2.php/apps/files/api/v1/list?path=/Circuits&format=json';
      const response = await apiCall(endpoint);
      
      // Traiter la liste des fichiers GPX
      return response.ocs?.data || mockCircuits();
    } catch (error) {
      console.error('Files API error:', error);
      return mockCircuits();
    }
  },

  async getGPXFile(filename) {
    try {
      const endpoint = `/remote.php/webdav/Circuits/${filename}`;
      return await apiCall(endpoint);
    } catch (error) {
      console.error('GPX file error:', error);
      return null;
    }
  },

  async getPhotos(year) {
    try {
      const endpoint = `/ocs/v2.php/apps/files/api/v1/list?path=/Photos/${year}&format=json`;
      const response = await apiCall(endpoint);
      
      return response.ocs?.data || [];
    } catch (error) {
      console.error('Photos API error:', error);
      return [];
    }
  }
};

// API Contacts (Trombinoscope)
export const contactsAPI = {
  async getMembers() {
    try {
      const endpoint = '/remote.php/dav/addressbooks/users/ccb/contacts/';
      const response = await apiCall(endpoint, {
        method: 'PROPFIND',
        headers: {
          'Depth': '1',
          'Content-Type': 'application/xml',
        }
      });
      
      // Parser les contacts
      return mockMembers();
    } catch (error) {
      console.error('Contacts API error:', error);
      return mockMembers();
    }
  }
};

// API Weather (intégration externe)
export const weatherAPI = {
  async getCurrentWeather() {
    try {
      // Utiliser OpenWeatherMap ou autre service
      const apiKey = process.env.VITE_WEATHER_API_KEY;
      if (!apiKey) {
        return mockWeather();
      }
      
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=Bohars,FR&appid=${apiKey}&units=metric&lang=fr`;
      const response = await fetch(endpoint);
      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        icon: getWeatherIcon(data.weather[0].id)
      };
    } catch (error) {
      console.error('Weather API error:', error);
      return mockWeather();
    }
  }
};

// Mock data pour le développement
const mockEvents = () => [
  {
    id: '1',
    title: 'Sortie découverte débutants',
    date: '2025-08-03',
    description: 'Circuit facile de 30km'
  }
];

const mockCircuits = () => [
  {
    name: 'abers.gpx',
    path: '/Circuits/abers.gpx',
    modified: '2025-07-01'
  }
];

const mockMembers = () => [
  {
    name: 'Jean Broudin',
    email: 'jean.broudin@example.com',
    phone: '02 98 00 00 00'
  }
];

const mockWeather = () => ({
  temperature: 22,
  condition: 'Partiellement nuageux',
  icon: '⛅'
});

const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) return '⛈️';
  if (weatherId >= 300 && weatherId < 500) return '🌦️';
  if (weatherId >= 500 && weatherId < 600) return '🌧️';
  if (weatherId >= 600 && weatherId < 700) return '🌨️';
  if (weatherId >= 700 && weatherId < 800) return '🌫️';
  if (weatherId === 800) return '☀️';
  if (weatherId > 800) return '⛅';
  return '🌤️';
};

// Fonction utilitaire pour tester la connexion Nextcloud
export const testNextcloudConnection = async () => {
  try {
    const response = await apiCall('/status.php');
    console.log('Nextcloud connection test:', response);
    return response.installed === true;
  } catch (error) {
    console.error('Nextcloud connection failed:', error);
    return false;
  }
};