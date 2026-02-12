# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project is configured to deploy to GitHub Pages using GitHub Actions.

### Setting up GitHub Pages deployment

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Build and deployment**:
   - Source: Select "GitHub Actions"
4. Once you merge this PR to the main branch, the workflow will automatically build and deploy your site
5. Your site will be available at `https://abeno.me` (via your custom CNAME) or `https://[username].github.io`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Install dependencies
- Build the React app
- Deploy the `dist` folder to GitHub Pages

### Manual deployment (alternative)

Alternatively, you can use [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

The custom domain `abeno.me` is already configured via the `CNAME` file.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## SEO Optimization

This portfolio website is fully optimized for search engines with the following features:

### Meta Tags & Social Sharing
- Comprehensive meta tags including keywords, description, and author
- Open Graph tags for Facebook/LinkedIn previews
- Twitter Card tags for Twitter previews
- Geographic meta tags (Addis Ababa, Ethiopia)
- Dynamic page-specific meta tags using react-helmet-async

### Search Engine Optimization
- **Sitemap**: `public/sitemap.xml` - Lists all main pages for search engines
- **Robots.txt**: `public/robots.txt` - Configured to allow all crawlers
- **Canonical URLs**: Prevent duplicate content issues
- **Structured Data**: JSON-LD schemas for Person, Projects, and Blog posts
- **Keywords**: Optimized for "Abenezer Tilahun", "Software Engineer Ethiopia", "Addis Ababa Developer", etc.

### Dynamic SEO Components
Each page has custom SEO metadata:
- **Home**: Main landing page with comprehensive profile information
- **About**: Skills, experience, and education details
- **Portfolio**: Project showcase with individual project schemas
- **Blog**: Articles with BlogPosting schema markup
- **Contact**: Contact information and availability

### Social Media Preview Image
To complete the SEO setup, add an Open Graph image:
- Create a 1200x630px image at `public/og-image.png`
- See `OG-IMAGE-SETUP.md` for detailed instructions and tools

### Google Search Console Integration
After deployment, submit your sitemap to Google Search Console:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://abeno.me`
3. Submit sitemap: `https://abeno.me/sitemap.xml`
4. Monitor indexing status and search performance
