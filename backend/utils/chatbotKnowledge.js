/**
 * Structured Knowledge Base for ChangelogPulse Product Assistant
 * Contains authoritative application information used for intent matching and responses.
 */
const chatbotKnowledge = {
  product: {
    name: 'ChangelogPulse',
    tagline: 'Changelog & Product Updates Platform',
    description:
      'ChangelogPulse is a modern SaaS platform designed to help product teams publish, manage, and distribute release notes, feature updates, bug fixes, and announcements via a user dashboard, public feed, and embeddable widget.',
    targetAudience: 'Software product teams, SaaS users, developers, and platform members.'
  },

  routes: [
    {
      path: '/user/dashboard',
      name: 'User Dashboard',
      description: 'The User Dashboard is your main workspace. From here you can explore the latest product updates, read changelog entries, submit feedback, and manage your account.'
    },
    {
      path: '/user/updates',
      name: 'Product Updates',
      description: 'The Product Updates page allows you to browse all product releases, search by keyword, filter by category (Feature, Bug Fix, Improvement, Announcement, Release), and open detailed release notes.'
    },
    {
      path: '/user/changelog',
      name: 'Changelog Feed',
      description: 'The Changelog Feed provides a chronological stream of all published release notes, version history, and product changes.'
    },
    {
      path: '/user/changelog/:slug',
      name: 'Update Detail Page',
      description: 'Structured documentation-style view for a specific product update, including summary, version, category, published date, tags, detailed content, and the interactive Feedback section.'
    },
    {
      path: '/user/feedback',
      name: 'My Feedback',
      description: 'Track all product feedback you have submitted and read official team responses.'
    },
    {
      path: '/user/profile',
      name: 'Profile & Security Settings',
      description: 'Account settings page where users can update their full name, avatar image URL, email address, and change account password.'
    }
  ],

  faq: [
    {
      intent: 'dashboard_help',
      patterns: ['how do i use the dashboard', 'what is the dashboard', 'explain dashboard', 'what can i do on the dashboard', 'dashboard features'],
      response:
        'The **User Dashboard** is your main workspace. From here you can explore the latest product updates, read changelog entries, submit feedback, track your feedback history, and manage your account.',
      actions: [
        { label: 'Open Dashboard', path: '/user/dashboard' },
        { label: 'View Product Updates', path: '/user/updates' }
      ]
    },
    {
      intent: 'find_updates',
      patterns: ['how do i find product updates', 'where are product updates', 'browse updates', 'find updates', 'see new features', 'show recent updates'],
      response:
        'Product Updates shows the latest changes made to the product.\n\nTo find updates:\n1. Click **Product Updates** in the top menu.\n2. Use the search bar to search by title or keyword.\n3. Filter by category badges (*Feature*, *Bug Fix*, *Improvement*, *Announcement*).\n4. Click any update card to read full release notes.',
      actions: [
        { label: 'View Product Updates', path: '/user/updates' },
        { label: 'Open Changelog Feed', path: '/user/changelog' }
      ]
    },
    {
      intent: 'read_changelog',
      patterns: ['how do i read a changelog', 'what is a changelog', 'read changelog', 'open release notes', 'version history'],
      response:
        'A **Changelog** is a public history of all software releases and improvements.\n\nTo read a changelog:\n1. Go to **Changelog Feed** or **Product Updates**.\n2. Click on the title of any release note.\n3. Read the summary, version badge, category, publication date, and detailed content.',
      actions: [{ label: 'Open Changelog Feed', path: '/user/changelog' }]
    },
    {
      intent: 'submit_feedback',
      patterns: ['how do i submit feedback', 'give feedback', 'submit feedback', 'send feedback', 'report issue', 'where is feedback'],
      response:
        '### Submit Feedback\n\nYou can send feedback directly from an update.\n\n1. Open any **Product Update** details page.\n2. Scroll down to the **Feedback** section.\n3. Select your rating (*Very Helpful*, *Helpful*, *Not Helpful*).\n4. Enter your feedback message and click **Submit Feedback**.\n\nYour feedback will be sent to the product administrators.',
      actions: [
        { label: 'My Feedback History', path: '/user/feedback' },
        { label: 'Browse Updates', path: '/user/updates' }
      ]
    },
    {
      intent: 'manage_profile',
      patterns: ['how do i manage my profile', 'edit profile', 'change name', 'change email', 'change avatar', 'change password', 'profile settings'],
      response:
        'To update your profile information or change your password:\n1. Click **Profile** in the top navigation bar.\n2. Enter your new name, avatar image URL, email, or password.\n3. Click **Save Changes**.',
      actions: [{ label: 'Edit Profile Settings', path: '/user/profile' }]
    },
    {
      intent: 'user_panel_overview',
      patterns: ['what can i do in the user panel', 'what is user panel', 'user panel features', 'explain user panel'],
      response:
        'In your **User Panel**, you can:\n- Explore the latest published product releases and changelogs.\n- Search and filter updates by category.\n- Submit feedback and track responses from the product team under **My Feedback**.\n- Manage your account profile, avatar, and password.\n- Use this **Product Assistant** whenever you need guidance!',
      actions: [
        { label: 'Open Dashboard', path: '/user/dashboard' },
        { label: 'Browse Updates', path: '/user/updates' }
      ]
    },
    {
      intent: 'logout_help',
      patterns: ['how do i logout', 'log out', 'sign out', 'exit account'],
      response:
        'To log out, open your account menu in the top navigation bar and select **Sign Out**. You will be redirected to the login page and your protected User Panel content will no longer be accessible until you authenticate again.',
      actions: [{ label: 'Go to Profile', path: '/user/profile' }]
    }
  ]
};

module.exports = chatbotKnowledge;
