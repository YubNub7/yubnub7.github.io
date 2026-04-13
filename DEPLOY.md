# How to Deploy This Website (Free on GitHub Pages)

## Step 1 — Create a GitHub account
Go to https://github.com and sign up if you don't have an account.
Choose a username carefully — it becomes part of your site URL:
  https://YOUR-USERNAME.github.io

## Step 2 — Create a new repository
1. Click the + icon → New repository
2. Name it exactly:  YOUR-USERNAME.github.io
   (replace YOUR-USERNAME with your actual username)
3. Set it to Public
4. Do NOT add a README or .gitignore
5. Click Create repository

## Step 3 — Install Git (if not already installed)
Download from https://git-scm.com/download/win and install.

## Step 4 — Upload the website files
Open a terminal in C:\Users\hzati\Projects\Website\ and run:

  git init
  git add .
  git commit -m "Initial website launch"
  git branch -M main
  git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
  git push -u origin main

## Step 5 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click Settings → Pages
3. Under Source, select: Deploy from branch → main → / (root)
4. Click Save
5. Wait ~2 minutes, then visit https://YOUR-USERNAME.github.io

## Step 6 — Update the placeholder URLs in the HTML files
Search for "YOUR-USERNAME" in all .html files and replace with your GitHub username.
Then commit and push again:

  git add .
  git commit -m "Update GitHub username links"
  git push

## Step 7 — Upload the .exe files as GitHub Releases
1. Create two more repositories (or use one repo with two releases):
   - github.com/YOUR-USERNAME/file-deduplicator
   - github.com/YOUR-USERNAME/debloat-pro

2. In each repo, go to Releases → Create a new release
3. Tag: v1.0.0
4. Upload the .exe files from:
   - C:\Users\hzati\Projects\Deduplicator\dist\FileDeduplicator.exe
   - C:\Users\hzati\Projects\DeBloat\dist\DeBloatPro.exe

5. Update the download links in the HTML to match your actual release URLs.

## Step 8 — Add Google AdSense
1. Sign up at https://adsense.google.com
2. Add your site URL and wait for approval (typically 1-2 weeks)
3. Once approved, replace the commented-out AdSense script tags in each
   HTML file with the code Google provides
4. Create ad units in AdSense dashboard and paste the <ins> blocks
   where the "PASTE YOUR ADSENSE CODE HERE" comments are

## Custom Domain (Optional, ~$11/year)
1. Buy a domain at https://namecheap.com (e.g. winutilspro.com)
2. In GitHub Pages settings → Custom domain → enter your domain
3. In Namecheap DNS settings, add these CNAME/A records:
   A record:     @ → 185.199.108.153
   A record:     @ → 185.199.109.153
   A record:     @ → 185.199.110.153
   A record:     @ → 185.199.111.153
   CNAME record: www → YOUR-USERNAME.github.io
4. Tick "Enforce HTTPS" in GitHub Pages settings
