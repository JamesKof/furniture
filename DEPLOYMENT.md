# StatusGh Furniture - Deployment Guide for Vercel

## Environment Variables

Before deploying to Vercel, you need to set up the following environment variables in your Vercel project settings:

### Required Variables

1. **VITE_SUPABASE_URL**
   - Your Supabase project URL
   - Example: `https://your-project.supabase.co`
   - Find this in your Supabase project settings

2. **VITE_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Find this in your Supabase project settings under API

## Steps to Deploy on Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - Make sure to add them for all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

## Build Settings

The default Vercel settings should work:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Troubleshooting

### Blank Page Issue
If you see a blank page after deployment:
1. Check the browser console for errors (F12)
2. Verify environment variables are set correctly in Vercel
3. Check the Vercel deployment logs for build errors
4. Ensure your Supabase project is accessible (not paused)

### Database Connection Issues
- Verify your Supabase project is active
- Check that RLS policies allow public access to necessary tables
- Test your Supabase connection locally first

### Build Failures
- Make sure all dependencies are in `package.json`
- Check that TypeScript types are correct
- Review build logs in Vercel dashboard

## Post-Deployment

After successful deployment:
1. Test all pages and functionality
2. Check that authentication works
3. Verify product data loads correctly
4. Test cart and checkout functionality
5. Ensure WhatsApp links work correctly

## Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Verify all environment variables are set
4. Ensure Supabase database is properly configured
