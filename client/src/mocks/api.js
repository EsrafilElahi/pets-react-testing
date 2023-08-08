// api.js (Mock API Module)
export const login = async (username, password) => {
  if (username === 'validUser' && password === 'validPassword') {
    return { token: 'mockedToken' };
  } else {
    throw new Error('Invalid credentials');
  }
};