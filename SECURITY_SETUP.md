# Security Setup for Resume Generator

## 🔒 Important Security Notice

The resume generator contains password protection that requires proper setup to maintain security.

## 🚀 Netlify Deployment (Recommended)

### 1. Set Environment Variable in Netlify

1. **Go to your Netlify dashboard**
2. **Navigate to:** Site settings > Environment variables
3. **Add new variable:**
   - **Key:** `RESUME_GENERATOR_PASSWORD`
   - **Value:** `YourActualPasswordHere`
   - **Scopes:** Select "All scopes" or "Builds"

### 2. Deploy to Netlify

1. **Push your code to GitHub** (password is now secure!)
2. **Netlify will automatically:**
   - Run the build script
   - Replace `%%RESUME_GENERATOR_PASSWORD%%` with your actual password
   - Deploy the secure version

### 3. Verify Setup

- ✅ Environment variable set in Netlify dashboard
- ✅ Build logs show "✅ RESUME_GENERATOR_PASSWORD environment variable found"
- ✅ Resume generator works with your password
- ✅ No password visible in source code

## 🖥️ Local Development

### Option A: Use Environment Variable (Recommended)
```bash
# Set environment variable for local testing
export RESUME_GENERATOR_PASSWORD="YourPasswordHere"
node build-script.js
```

### Option B: Use Config File (Alternative)
1. **Copy the sample config file:**
   ```bash
   cp config.sample.js config.js
   ```

2. **Edit config.js with your actual password:**
   ```javascript
   window.RESUME_GENERATOR_PASSWORD = "YourActualPasswordHere";
   ```

3. **Include config.js in resume-generator.html:**
   ```html
   <script src="config.js"></script>
   ```

## 📁 Files Overview

### Netlify Deployment Files:
- `build-script.js` - Replaces environment variables during build
- `netlify.toml` - Netlify configuration with build command
- `resume-generator.html` - Contains `%%RESUME_GENERATOR_PASSWORD%%` placeholder

### Local Development Files:
- `config.sample.js` - Template file (safe to commit)
- `config.js` - Your actual config (optional, for local dev only)
- `.gitignore` - Prevents config.js from being committed

## 🔐 Security Best Practices

1. **Use Netlify environment variables** for production
2. **Use strong passwords** for the resume generator
3. **Never commit actual passwords** to version control
4. **Use HTTPS** when accessing the resume generator online
5. **Regularly rotate passwords** if needed

## 🔧 Troubleshooting

### Netlify Deployment Issues:
- **Build fails:** Check build logs in Netlify dashboard
- **Password not working:** Verify environment variable is set correctly
- **Shows "ENVIRONMENT_VARIABLE_NOT_SET":** Environment variable missing

### Local Development Issues:
- **Shows "CHANGE_ME_IN_NETLIFY":** Run build script or use config.js
- **Build script fails:** Ensure Node.js is installed

## 🚨 Emergency Password Reset

### For Netlify:
1. Go to Netlify dashboard > Site settings > Environment variables
2. Update `RESUME_GENERATOR_PASSWORD` value
3. Trigger a new deploy (or push a commit)

### For Local:
1. Update environment variable or config.js
2. Run build script again
