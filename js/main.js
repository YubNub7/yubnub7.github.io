/* main.js — WinUtils site interactions */

/* --- Mobile nav toggle --- */
const hamburger = document.querySelector('.nav__hamburger');
const navLinks  = document.querySelector('.nav__links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* --- Mark active nav link --- */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

/* --- FAQ accordion --- */
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq__item.open').forEach(i => i.classList.remove('open'));

    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* --- Download button click tracking (placeholder for analytics) ---
     Replace the console.log with your analytics event when ready.
     Example for Google Analytics 4:
       gtag('event', 'download', { app_name: appName });
*/
document.querySelectorAll('[data-download]').forEach(btn => {
  btn.addEventListener('click', () => {
    const appName = btn.dataset.download;
    console.log(`Download clicked: ${appName}`);
    // gtag('event', 'download', { app_name: appName });
  });
});

/* --- Tech news feed (homepage only) --- */
const NEWS_FEEDS = [
  { name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/',                               tag: 'Security' },
  { name: 'Bleeping Computer', url: 'https://www.bleepingcomputer.com/feed/',                          tag: 'Security' },
  { name: 'Ars Technica',      url: 'https://feeds.arstechnica.com/arstechnica/technology-lab',        tag: 'Tech'     }
];

async function loadNewsFeed() {
  const grid = document.getElementById('news-grid');
  if (!grid) return;

  const allItems = [];

  await Promise.allSettled(NEWS_FEEDS.map(async feed => {
    try {
      const proxy = `https://api.allorigins.win/get?disableCache=true&url=${encodeURIComponent(feed.url)}`;
      const res = await fetch(proxy);
      if (!res.ok) return;
      const { contents } = await res.json();
      const doc = new DOMParser().parseFromString(contents, 'text/xml');
      doc.querySelectorAll('item').forEach(item => {
        allItems.push({
          title:       item.querySelector('title')?.textContent || '',
          link:        item.querySelector('link')?.textContent || '',
          pubDate:     item.querySelector('pubDate')?.textContent || '',
          description: item.querySelector('description')?.textContent || '',
          feedName:    feed.name,
          tag:         feed.tag,
        });
      });
    } catch (_) {}
  }));

  allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  const top = allItems.slice(0, 6);

  if (top.length === 0) {
    grid.innerHTML = '<p class="news-empty">Unable to load news feed — please check back later.</p>';
    return;
  }

  grid.innerHTML = top.map(item => {
    const date     = new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const desc     = item.description.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().substring(0, 130);
    const tagClass = item.tag === 'Security' ? 'news-card__tag--security' : '';
    return `<article class="news-card">
        <span class="news-card__tag ${tagClass}">${item.tag}</span>
        <h4 class="news-card__title"><a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a></h4>
        <p class="news-card__desc">${desc}…</p>
        <div class="news-card__meta">
          <span class="news-card__source">${item.feedName}</span>
          <span class="news-card__date">${date}</span>
        </div>
      </article>`;
  }).join('');
}

loadNewsFeed();
