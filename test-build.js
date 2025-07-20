#!/usr/bin/env node

// Test script to verify build process works locally
// Usage: RESUME_GENERATOR_PASSWORD="test123" node test-build.js

console.log('🧪 Testing build script locally...');

// Set test environment variable if not provided
if (!process.env.RESUME_GENERATOR_PASSWORD) {
    process.env.RESUME_GENERATOR_PASSWORD = 'TEST_PASSWORD_123';
    console.log('⚠️  Using test password since RESUME_GENERATOR_PASSWORD not set');
}

// Run the build script
try {
    require('./build-script.js');
    console.log('✅ Build script test completed successfully!');
} catch (error) {
    console.error('❌ Build script test failed:', error.message);
    process.exit(1);
}
