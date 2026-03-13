const axios = require('axios');

async function signup() {
  try {
    const res = await axios.post('http://localhost:3002/api/v1/auth/signup', {
      email: 'demo_user@novapayroll.com',
      password: 'password123',
      name: 'Demo Executive',
      orgName: 'Nova Premium Corp',
      phone: '9876543210',
      orgSize: '100-500',
      title: 'Finance Director'
    });
    console.log('Signup successful:', res.data);
  } catch (err) {
    if (err.response && err.response.status === 409) {
      console.log('User already exists, proceeding...');
    } else {
      console.error('Signup failed:', err.response ? err.response.data : err.message);
    }
  }
}

signup();
