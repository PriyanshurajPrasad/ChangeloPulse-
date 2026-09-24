/**
 * Structured User Panel Knowledge Base for ChangelogPulse Product Assistant
 * Covers all features implemented in the User Panel.
 */

export const userAssistantKnowledge = {
  product: {
    name: 'ChangelogPulse',
    tagline: 'Changelog & Product Updates Platform',
    description:
      'ChangelogPulse is a SaaS platform designed to help product teams publish, manage, and explore release notes, feature updates, bug fixes, and announcements.',
    targetAudience: 'Product teams, SaaS users, developers, and platform members.'
  },

  routes: [
    {
      path: '/user/dashboard',
      name: 'User Dashboard',
      description:
        'The User Dashboard is your main workspace. From here you can explore the latest product updates, read changelog entries, submit feedback, track your feedback history, and manage your account settings.'
    },
    {
      path: '/user/updates',
      name: 'Product Updates',
      description:
        'The Product Updates page allows you to browse all product releases, search by keyword, filter by category (Feature, Bug Fix, Improvement, Announcement, Release), and open detailed release notes.'
    },
    {
      path: '/user/changelog',
      name: 'Changelog Feed',
      description:
        'The Changelog Feed provides a chronological stream of all published release notes, version history, and product changes.'
    },
    {
      path: '/user/changelog/:slug',
      name: 'Update Detail Page',
      description:
        'The Update Detail page displays full documentation for a specific product update, including summary, version, category, published date, tags, detailed content, and the interactive Feedback section.'
    },
    {
      path: '/user/feedback',
      name: 'My Feedback & History',
      description:
        'The My Feedback page lets you view all the product feedback you have submitted, track review status (Submitted, Reviewed, Resolved), and read official responses from the ChangelogPulse team.'
    },
    {
      path: '/user/profile',
      name: 'Profile Settings',
      description:
        'The Profile Settings page allows you to view and update your full name, profile avatar URL, email address, assigned user role, and account password.'
    }
  ],

  initialSuggestions: [
    'How do I use the dashboard?',
    'How do I find product updates?',
    'How do I read a changelog?',
    'How do I submit feedback?',
    'How do I manage my profile?',
    'What can I do in the User Panel?'
  ],

  quickActions: [
    { label: 'Dashboard', query: 'What can I do on the dashboard?', path: '/user/dashboard' },
    { label: 'Latest Updates', query: 'Show me the latest product updates', path: '/user/updates' },
    { label: 'Changelog', query: 'How do I browse the changelog?', path: '/user/changelog' },
    { label: 'Feedback', query: 'How do I submit feedback?', path: '/user/feedback' },
    { label: 'My Profile', query: 'How do I manage my profile?', path: '/user/profile' },
    { label: 'How it works?', query: 'What can I do in the User Panel?', path: null }
  ],

  adminRefusalMessage:
    "That functionality is restricted to authorized administrators. I can help you with the features available in your User Panel.",

  adminKeywords: [
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
  ],

  faq: [
    {
      id: 'dashboard_help',
      patterns: [
        'how do i use the dashboard',
        'what is the dashboard',
        'explain dashboard',
        'what can i do on the dashboard',
        'dashboard features'
      ],
      response:
        "The **User Dashboard** is your main workspace. From here you can explore the latest product updates, read changelog entries, submit feedback, track your feedback history, and manage your account.",
      actions: [
        { label: 'Open Dashboard →', path: '/user/dashboard' },
        { label: 'View Product Updates →', path: '/user/updates' }
      ]
    },
    {
      id: 'find_updates',
      patterns: [
        'how do i find product updates',
        'where are product updates',
        'browse updates',
        'find updates',
        'see new features',
        'show recent updates'
      ],
      response:
        "Product Updates shows the latest changes made to the product.\n\nTo find updates:\n1. Click **Product Updates** in the top menu.\n2. Use the search bar to search by title or keyword.\n3. Filter by category badges (*Feature*, *Bug Fix*, *Improvement*, *Announcement*).\n4. Click any update card to read full release notes.",
      actions: [
        { label: 'View Product Updates →', path: '/user/updates' },
        { label: 'Open Changelog Feed →', path: '/user/changelog' }
      ]
    },
    {
      id: 'read_changelog',
      patterns: [
        'how do i read a changelog',
        'what is a changelog',
        'read changelog',
        'open release notes',
        'version history'
      ],
      response:
        "A **Changelog** is a public history of all software releases and improvements.\n\nTo read a changelog:\n1. Go to **Changelog Feed** or **Product Updates**.\n2. Click on the title of any release note.\n3. Read the summary, version badge, category, publication date, and detailed content.",
      actions: [{ label: 'Open Changelog Feed →', path: '/user/changelog' }]
    },
    {
      id: 'submit_feedback',
      patterns: [
        'how do i submit feedback',
        'give feedback',
        'submit feedback',
        'send feedback',
        'report issue',
        'where is feedback'
      ],
      response:
        "### Submit Feedback\n\nYou can send feedback directly from an update.\n\n1. Open any **Product Update** details page.\n2. Scroll down to the **Feedback** section.\n3. Select your rating (*Very Helpful*, *Helpful*, *Not Helpful*).\n4. Enter your feedback message and click **Submit Feedback**.\n\nYour feedback will be sent to the product administrators. You can track all your submitted feedback under **My Feedback**.",
      actions: [
        { label: 'My Feedback History →', path: '/user/feedback' },
        { label: 'Browse Updates →', path: '/user/updates' }
      ]
    },
    {
      id: 'manage_profile',
      patterns: [
        'how do i manage my profile',
        'edit profile',
        'change name',
        'change email',
        'change avatar',
        'change password',
        'profile settings'
      ],
      response:
        "To manage your profile:\n1. Open your account menu or click **Profile** in the top navigation.\n2. You can update your display name, email, avatar image URL, and account password.\n3. Click **Save Changes** to update your account details.",
      actions: [{ label: 'Open Profile Settings →', path: '/user/profile' }]
    },
    {
      id: 'user_panel_overview',
      patterns: [
        'what can i do in the user panel',
        'what is user panel',
        'user panel features',
        'explain user panel',
        'how to use user panel'
      ],
      response:
        "In your **User Panel**, you can:\n- Explore the latest published product releases and changelogs.\n- Search and filter updates by category.\n- Submit feedback and track responses from the product team under **My Feedback**.\n- Manage your account profile, avatar, and password.\n- Use this **Product Assistant** whenever you need guidance!",
      actions: [
        { label: 'Open Dashboard →', path: '/user/dashboard' },
        { label: 'Browse Updates →', path: '/user/updates' }
      ]
    },
    {
      id: 'logout_help',
      patterns: [
        'how do i logout',
        'log out',
        'sign out',
        'exit account',
        'how to log out'
      ],
      response:
        "To log out, open your account menu in the top navigation bar and select **Sign Out** (or click the logout icon). You will be redirected to the login page and your protected User Panel content will no longer be accessible until you authenticate again.",
      actions: [{ label: 'Go to Profile →', path: '/user/profile' }]
    },
    {
      id: 'auth_help',
      patterns: [
        'how does authentication work',
        'user login',
        'user registration',
        'session security',
        'how to register'
      ],
      response:
        "ChangelogPulse uses secure authentication for the User Panel. Once registered and logged in, you receive protected access to your User Panel workspace, feedback history, and personalized settings.",
      actions: [{ label: 'View Profile →', path: '/user/profile' }]
    }
  ]
};

export default userAssistantKnowledge;
