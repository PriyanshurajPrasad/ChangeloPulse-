const chatbotKnowledge = require('./chatbotKnowledge');

/**
 * Normalizes input string for pattern matching
 */
function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .trim();
}

/**
 * Matches user message against known FAQs, route context, and security boundaries
 */
function matchIntent(userMessage, context = {}) {
  const cleanMsg = normalizeText(userMessage);

  if (!cleanMsg) {
    return {
      handled: true,
      message: 'Please ask a question about how to use the website, view updates, or navigate your User Panel!',
      actions: [{ label: 'Go to User Dashboard', path: '/user/dashboard' }]
    };
  }

  const lowerMsg = (userMessage || '').toLowerCase();

  // 1. STRICT SECURITY BOUNDARY — Block all admin-related questions
  const adminKeywords = [
    'admin',
    'admin panel',
    'admin dashboard',
    'admin password',
    'admin secret',
    'admin code',
    'admin credentials',
    'admin url',
    'admin route',
    'create admin',
    'become admin',
    'modify update',
    'delete update',
    'publish update',
    'admin api',
    'mongodb',
    'database',
    'jwt',
    'env',
    'bypass auth'
  ];

  const isAdminQuery = adminKeywords.some((kw) => lowerMsg.includes(kw));

  if (isAdminQuery) {
    return {
      handled: true,
      message: "That functionality is restricted to authorized administrators. I can help you with the features available in your User Panel.",
      actions: [
        { label: 'Go to User Dashboard', path: '/user/dashboard' },
        { label: 'View Product Updates', path: '/user/updates' }
      ]
    };
  }

  // 2. Navigation Assistant intent ("take me to...", "open...")
  if (lowerMsg.includes('take me to') || lowerMsg.includes('open') || lowerMsg.includes('go to')) {
    if (lowerMsg.includes('dashboard')) {
      return {
        handled: true,
        message: "Sure! Opening the User Dashboard.",
        actions: [{ label: 'Open Dashboard', path: '/user/dashboard' }]
      };
    }
    if (lowerMsg.includes('updates') || lowerMsg.includes('product updates')) {
      return {
        handled: true,
        message: "Sure! Opening Product Updates.",
        actions: [{ label: 'Open Product Updates', path: '/user/updates' }]
      };
    }
    if (lowerMsg.includes('changelog')) {
      return {
        handled: true,
        message: "Sure! Opening the Changelog Feed.",
        actions: [{ label: 'Open Changelog', path: '/user/changelog' }]
      };
    }
    if (lowerMsg.includes('feedback')) {
      return {
        handled: true,
        message: "Sure! Opening My Feedback.",
        actions: [{ label: 'Open My Feedback', path: '/user/feedback' }]
      };
    }
    if (lowerMsg.includes('profile')) {
      return {
        handled: true,
        message: "Sure! Opening Profile Settings.",
        actions: [{ label: 'Open Profile', path: '/user/profile' }]
      };
    }
  }

  // 3. Route / Page specific explanation request ("what can i do here", "explain this page")
  const isPageQuery =
    lowerMsg.includes('this page') ||
    lowerMsg.includes('what can i do here') ||
    lowerMsg.includes('explain this section') ||
    lowerMsg.includes('is page pe kya kar sakta hu') ||
    lowerMsg.includes('what is this page');

  if (isPageQuery && context.route) {
    if (context.route.startsWith('/user/changelog/') || context.route.startsWith('/changelog/')) {
      return {
        handled: true,
        message: `You are currently viewing an **Update Detail Page**! 📝\n\nHere you can read full release notes for this specific update, view tags, and submit your feedback to the team using the Feedback section below.`,
        actions: [
          { label: 'Back to Product Updates', path: '/user/updates' },
          { label: 'My Feedback History', path: '/user/feedback' }
        ]
      };
    }

    if (context.route === '/user/dashboard') {
      return {
        handled: true,
        message: `The **User Dashboard** is your main workspace. From here you can explore the latest product updates, read changelog entries, submit feedback, track your feedback history, and manage your account.`,
        actions: [
          { label: 'View Product Updates', path: '/user/updates' },
          { label: 'My Feedback', path: '/user/feedback' }
        ]
      };
    }

    if (context.route === '/user/updates') {
      return {
        handled: true,
        message: `You are on **Product Updates**! 📄\n\nHere you can search product releases, filter by category badges (*Feature*, *Bug Fix*, *Improvement*), and click any card to read full release notes.`,
        actions: [{ label: 'Go to User Dashboard', path: '/user/dashboard' }]
      };
    }

    if (context.route === '/user/changelog') {
      return {
        handled: true,
        message: `You are viewing the **Changelog Feed**! 🚀\n\nThis is a chronological feed of all published software release notes and version changes.`,
        actions: [{ label: 'Go to User Dashboard', path: '/user/dashboard' }]
      };
    }

    if (context.route === '/user/feedback') {
      return {
        handled: true,
        message: `You are on **My Feedback & History**! 💬\n\nHere you can view all product feedback you have submitted and read responses from the ChangelogPulse team.`,
        actions: [{ label: 'Browse Updates to Submit Feedback', path: '/user/updates' }]
      };
    }

    if (context.route === '/user/profile') {
      return {
        handled: true,
        message: `You are on **Profile Settings**! ⚙️\n\nHere you can update your display name, email, avatar image URL, and account password.`,
        actions: [{ label: 'Go to User Dashboard', path: '/user/dashboard' }]
      };
    }
  }

  // 4. Match against structured FAQ knowledge base
  for (const item of chatbotKnowledge.faq) {
    const matched = item.patterns.some((pattern) => {
      const cleanPattern = normalizeText(pattern);
      return cleanMsg.includes(cleanPattern);
    });

    if (matched) {
      return {
        handled: true,
        message: item.response,
        actions: item.actions || []
      };
    }
  }

  return null;
}

module.exports = {
  matchIntent
};
