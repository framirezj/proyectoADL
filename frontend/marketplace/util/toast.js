import { toast } from 'react-hot-toast';

// Configuración de estilos reutilizable
const toastStyles = {
  success: {
    style: {
      background: '#10b981',
      color: 'white',
      borderRadius: '8px',
      fontSize: '14px',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#10b981',
    },
  },
  error: {
    style: {
      background: '#ef4444',
      color: 'white',
      borderRadius: '8px',
      fontSize: '14px',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    iconTheme: {
      primary: 'white',
      secondary: '#ef4444',
    },
  },
  loading: {
    style: {
      background: '#3b82f6',
      color: 'white',
      borderRadius: '8px',
      fontSize: '14px',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
  },
};

// Funciones exportadas
export const showSuccess = (message, duration = 4000) => {
  toast.success(message, {
    ...toastStyles.success,
    duration,
  });
};

export const showError = (message, duration = 5000) => {
  toast.error(message, {
    ...toastStyles.error,
    duration,
  });
};

export const showLoading = (message) => {
  return toast.loading(message, {
    ...toastStyles.loading,
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Función específica para errores de paciente
export const showPatientError = (rut, message = 'Paciente no encontrado') => {
  showError(`❌ ${message}: ${rut}`);
};

// Función específica para éxito de paciente
export const showPatientSuccess = (patientName) => {
  showSuccess(`✅ Paciente ${patientName} encontrado`);
};