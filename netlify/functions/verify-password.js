// Netlify Function for secure password verification
// This runs on Netlify's servers, keeping the password completely secure

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: 'Method not allowed',
        message: 'Only POST requests are accepted'
      })
    };
  }

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // Parse the request body
    const { password } = JSON.parse(event.body);

    // Get the correct password from environment variable
    const correctPassword = process.env.RESUME_GENERATOR_PASSWORD;

    // Validate that environment variable is set
    if (!correctPassword) {
      console.error('RESUME_GENERATOR_PASSWORD environment variable not set');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: false,
          error: 'Server configuration error',
          message: 'Password verification service not properly configured'
        })
      };
    }

    // Validate input
    if (!password || typeof password !== 'string') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: false,
          error: 'Invalid input',
          message: 'Password is required'
        })
      };
    }

    // Verify password (simple string comparison)
    const isValid = password === correctPassword;

    // Log attempt (without exposing the password)
    console.log(`Password verification attempt: ${isValid ? 'SUCCESS' : 'FAILED'} from ${event.headers['x-forwarded-for'] || 'unknown IP'}`);

    if (isValid) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Password verified successfully'
        })
      };
    } else {
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: false,
          error: 'Authentication failed',
          message: 'Incorrect password'
        })
      };
    }

  } catch (error) {
    console.error('Error in password verification:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: false,
        error: 'Internal server error',
        message: 'An error occurred while verifying the password'
      })
    };
  }
};
