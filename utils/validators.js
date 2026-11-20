export const validateEmail = (email) => {
  if (!email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address (e.g., name@domain.com)';
  }
  return '';
};

export const validateLoginPassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return '';
};

export const validateFullName = (name) => {
  if (!name.trim()) {
    return 'Full name is required';
  }
  if (name.trim().length < 3) {
    return 'Name must be at least 3 characters';
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name.trim())) {
    return 'Name cannot contain numbers or special characters';
  }
  return '';
};

export const validateRegisterPassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};