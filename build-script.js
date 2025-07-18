#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Starting Netlify build process...');

// Function to replace environment variables in a file
function replaceEnvVars(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace %%RESUME_GENERATOR_PASSWORD%% with actual environment variable
        if (content.includes('%%RESUME_GENERATOR_PASSWORD%%')) {
            const password = process.env.RESUME_GENERATOR_PASSWORD || 'ENVIRONMENT_VARIABLE_NOT_SET';
            content = content.replace(/%%RESUME_GENERATOR_PASSWORD%%/g, `"${password}"`);
            modified = true;
            console.log(`✅ Replaced RESUME_GENERATOR_PASSWORD in ${filePath}`);
        }

        // Add more environment variable replacements here if needed
        // Example: content = content.replace(/%%OTHER_VAR%%/g, process.env.OTHER_VAR || 'default');

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`💾 Updated ${filePath}`);
        }

        return modified;
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Main build process
function main() {
    console.log('🔍 Looking for files to process...');

    // Process resume-generator.html
    const resumeGeneratorPath = './resume-generator.html';
    if (fs.existsSync(resumeGeneratorPath)) {
        replaceEnvVars(resumeGeneratorPath);
    } else {
        console.log('⚠️  resume-generator.html not found');
    }

    // You can add more files to process here
    // replaceEnvVars('./other-file.html');

    console.log('✨ Build process completed!');
    
    // Verify environment variable was set
    if (!process.env.RESUME_GENERATOR_PASSWORD) {
        console.log('⚠️  WARNING: RESUME_GENERATOR_PASSWORD environment variable not set!');
        console.log('   Please set it in your Netlify dashboard under Site settings > Environment variables');
    } else {
        console.log('✅ RESUME_GENERATOR_PASSWORD environment variable found');
    }
}

// Run the build process
main();
