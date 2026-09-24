const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Update = require('../models/Update');
const { createSlug } = require('../utils/slugify');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const sampleUpdates = [
  {
    title: 'Dark Mode Released',
    description: 'Enjoy a sleek dark theme across the entire application interface to reduce eye strain during night hours.',
    content: `## Dark Mode is Finally Here! 🌙\n\nWe are excited to announce full dark mode support across all screens. You can enable dark mode in your account settings or sync it with your system preferences.\n\n### What's Included:\n- Custom dark palette designed for low-light environments\n- System theme auto-detection\n- Instant toggle without page reload`,
    version: 'v2.1.0',
    category: 'feature',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    tags: ['dark-mode', 'ui', 'theme', 'accessibility'],
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'New AI Dashboard',
    description: 'Get automated insights and predictive analytics powered by machine learning algorithms.',
    content: `## AI-Powered Dashboard Analytics 🤖\n\nTake your data analysis to the next level with our brand-new AI insights engine.\n\n### Key Highlights:\n- Automated anomaly detection\n- Natural language querying\n- Personalized recommendations for performance optimization`,
    version: 'v2.2.0',
    category: 'release',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    tags: ['ai', 'analytics', 'dashboard', 'machine-learning'],
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Improved Global Search',
    description: 'Search speeds are now 4x faster with fuzzy search capabilities and filters.',
    content: `## Lightning Fast Search ⚡\n\nWe rewritten our search backend to deliver near-instant results as you type.\n\n### Enhancements:\n- Index-backed query optimization\n- Fuzzy matching for typo tolerance\n- Instant preview shortcuts`,
    version: 'v2.2.1',
    category: 'improvement',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    tags: ['search', 'performance', 'indexing'],
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Login Bug Fix & Session Resilience',
    description: 'Resolved an issue where users were occasionally logged out during active sessions on Safari browsers.',
    content: `## Fix for Cookie Expiry Bug 🐛\n\nFixed an intermittent bug affecting Safari users where authentication cookies were incorrectly dropped after 15 minutes of inactivity.\n\n### Details:\n- Updated cookie SameSite & Secure parameters\n- Added automatic token refresh handling`,
    version: 'v2.2.2',
    category: 'bug-fix',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    tags: ['bug-fix', 'auth', 'cookies', 'security'],
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Performance Improvements & Bundle Size Reduction',
    description: 'Reduced overall initial JavaScript bundle load size by 35% through dynamic code splitting.',
    content: `## 35% Faster Initial Page Loads 🚀\n\nWe optimized our frontend build pipelines to shrink bundle sizes drastically.\n\n### What We Did:\n- Implemented dynamic lazy loading for heavy chart libraries\n- Tree-shaken unused dependencies\n- Optimized asset caching headers`,
    version: 'v2.3.0',
    category: 'improvement',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tags: ['performance', 'optimization', 'speed'],
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'New Notification System',
    description: 'Real-time in-app notifications and customizable email alert preferences coming soon.',
    content: `## Real-Time Notification Center 🔔 (Draft)\n\nStay on top of updates with customizable push and email notifications.\n\n### Upcoming Features:\n- Granular event notification preferences\n- Slack & Discord webhook integrations`,
    version: 'v2.4.0-draft',
    category: 'feature',
    status: 'draft',
    coverImage: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=800&auto=format&fit=crop&q=80',
    tags: ['notifications', 'webhooks', 'draft'],
    publishedAt: null
  },
  {
    title: 'Mobile UI Improvements',
    description: 'Redesigned mobile touch navigation and responsive tables for smooth smartphone browsing.',
    content: `## Enhanced Mobile Experience 📱\n\nEvery screen has been optimized for one-handed mobile navigation.\n\n### Improvements:\n- Swipeable tables and card views\n- Larger touch targets for buttons\n- Native bottom navigation bar`,
    version: 'v2.3.1',
    category: 'improvement',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    tags: ['mobile', 'responsive', 'ui'],
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Analytics Dashboard Upgrades',
    description: 'Export report data in CSV, PDF, and JSON formats directly from the dashboard.',
    content: `## Data Export Center 📊\n\nYou requested it, and we built it! Export any report dataset with a single click.\n\n### Formats Supported:\n- CSV / Excel spreadsheets\n- High-resolution PDF reports\n- Raw JSON payloads`,
    version: 'v2.3.2',
    category: 'feature',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80',
    tags: ['analytics', 'export', 'pdf', 'csv'],
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    title: 'Legacy User Profile Deprecation',
    description: 'Archived legacy profile views in favor of the new unified settings page.',
    content: `## Legacy Profile Deprecation (Archived)\n\nThis update details the migration path from legacy profile v1 to profile v2.`,
    version: 'v1.9.0',
    category: 'announcement',
    status: 'archived',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    tags: ['archived', 'legacy', 'migration'],
    publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
  },
  {
    title: 'Security Improvements & Two-Factor Infrastructure',
    description: 'Upgraded password hashing configurations and added rate-limiting middleware across all API routes.',
    content: `## Infrastructure Security Upgrade 🔒\n\nWe have implemented enhanced security protection across our entire cloud API layer.\n\n### Highlights:\n- Upgraded bcrypt salt rounds\n- Automated IP rate limiting on authentication routes\n- Comprehensive HTTP security headers (Helmet)`,
    version: 'v2.3.3',
    category: 'announcement',
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    tags: ['security', 'announcement', 'rate-limit', 'helmet'],
    publishedAt: new Date()
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/changelog_db';
    console.log(`[Seed] Connecting to MongoDB: ${mongoUri}...`);
    
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });

    console.log('[Seed] Clearing existing Users, Updates, and Feedback collections...');
    const Feedback = require('../models/Feedback');
    await User.deleteMany({});
    await Update.deleteMany({});
    await Feedback.deleteMany({});

    console.log('[Seed] Hash server Admin Access Code securely...');
    const bcrypt = require('bcryptjs');
    const defaultCode = (process.env.ADMIN_ACCESS_CODE || 'A7K2').trim().toUpperCase();
    const salt = await bcrypt.genSalt(10);
    const codeHash = await bcrypt.hash(defaultCode, salt);

    console.log('[Seed] Creating system admin and demo user accounts...');
    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@changelogpulse.com',
      password: 'AdminSecurePassword@123',
      role: 'admin',
      adminAccessCodeHash: codeHash,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });

    const normalUser = await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'User@12345',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    });

    const secondUser = await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'User@12345',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    });

    console.log(`[Seed] Seeded accounts successfully:`);
    console.log(`  - Admin: Configured via secret 4-character code (Environment/Hashed)`);
    console.log(`  - User 1: user@example.com (Password hashed)`);
    console.log(`  - User 2: jane@example.com (Password hashed)`);

    console.log('[Seed] Creating product updates...');
    const updatesToInsert = sampleUpdates.map((up) => ({
      ...up,
      slug: createSlug(up.title),
      author: adminUser._id
    }));

    const insertedUpdates = await Update.insertMany(updatesToInsert);
    console.log(`[Seed] Successfully inserted ${insertedUpdates.length} product updates!`);

    console.log('[Seed] Creating sample user feedback...');
    const publishedUpdates = insertedUpdates.filter((u) => u.status === 'published');
    if (publishedUpdates.length >= 2) {
      await Feedback.create([
        {
          user: normalUser._id,
          update: publishedUpdates[0]._id,
          rating: 'very-helpful',
          message: 'The new Dark Mode feature looks fantastic! Reduces eye strain significantly when coding at night.',
          status: 'reviewed',
          adminReply: 'Thanks for the feedback! We are glad you love the dark mode theme.',
          reviewedBy: adminUser._id,
          reviewedAt: new Date()
        },
        {
          user: secondUser._id,
          update: publishedUpdates[0]._id,
          rating: 'helpful',
          message: 'Very clean UI, but could you also add an option to schedule automatic dark mode switching based on time?',
          status: 'new'
        },
        {
          user: normalUser._id,
          update: publishedUpdates[1]._id,
          rating: 'very-helpful',
          message: 'The AI dashboard insights helped us spot anomaly spikes in our server response times immediately.',
          status: 'resolved',
          adminReply: 'Awesome! We have additional ML predictive metrics releasing next sprint.',
          reviewedBy: adminUser._id,
          reviewedAt: new Date()
        }
      ]);
      console.log('[Seed] Sample user feedback created successfully!');
    }

    console.log('\n========================================');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('========================================\n');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error.message);
    process.exit(1);
  }
};

seedData();
