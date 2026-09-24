import API from './api';
import { updateService } from './updateService';
import { userAssistantKnowledge } from '../data/userAssistantKnowledge';

/**
 * Service providing smart, context-aware AI assistant responses for the User Panel.
 */
export const assistantService = {
  /**
   * Process a user prompt with active route context & optional user info
   */
  processUserMessage: async (userMessage, context = {}) => {
    const rawMsg = (userMessage || '').trim();
    if (!rawMsg) {
      return {
        success: true,
        data: {
          message: "Please enter a question or select one of the suggested options!",
          actions: []
        }
      };
    }

    const lowerMsg = rawMsg.toLowerCase();

    // 1. STRICT SECURITY BOUNDARY — Detect any admin-related requests
    const isAdminQuery = userAssistantKnowledge.adminKeywords.some((keyword) =>
      lowerMsg.includes(keyword)
    );

    if (isAdminQuery) {
      return {
        success: true,
        data: {
          message: userAssistantKnowledge.adminRefusalMessage,
          actions: [
            { label: 'Go to User Dashboard →', path: '/user/dashboard' },
            { label: 'Browse Product Updates →', path: '/user/updates' }
          ]
        }
      };
    }

    // 2. Navigation Assistant intent ("take me to...", "open...")
    if (lowerMsg.includes('take me to') || lowerMsg.includes('open') || lowerMsg.includes('go to')) {
      if (lowerMsg.includes('dashboard')) {
        return {
          success: true,
          data: {
            message: "Sure! Opening the User Dashboard.",
            actions: [{ label: 'Open Dashboard →', path: '/user/dashboard' }],
            autoNavigate: '/user/dashboard'
          }
        };
      }
      if (lowerMsg.includes('updates') || lowerMsg.includes('product updates')) {
        return {
          success: true,
          data: {
            message: "Sure! Opening Product Updates.",
            actions: [{ label: 'Open Product Updates →', path: '/user/updates' }],
            autoNavigate: '/user/updates'
          }
        };
      }
      if (lowerMsg.includes('changelog')) {
        return {
          success: true,
          data: {
            message: "Sure! Opening the Changelog Feed.",
            actions: [{ label: 'Open Changelog →', path: '/user/changelog' }],
            autoNavigate: '/user/changelog'
          }
        };
      }
      if (lowerMsg.includes('feedback')) {
        return {
          success: true,
          data: {
            message: "Sure! Opening My Feedback.",
            actions: [{ label: 'Open My Feedback →', path: '/user/feedback' }],
            autoNavigate: '/user/feedback'
          }
        };
      }
      if (lowerMsg.includes('profile')) {
        return {
          success: true,
          data: {
            message: "Sure! Opening Profile Settings.",
            actions: [{ label: 'Open Profile →', path: '/user/profile' }],
            autoNavigate: '/user/profile'
          }
        };
      }
    }

    // 3. Real Data Check — Latest Updates Query
    if (
      lowerMsg.includes('latest update') ||
      lowerMsg.includes('recent update') ||
      lowerMsg.includes('new updates') ||
      lowerMsg.includes('what are the latest') ||
      lowerMsg.includes('show updates')
    ) {
      try {
        const res = await updateService.getPublishedUpdates({ page: 1, limit: 3 });
        if (res.success && res.data && res.data.length > 0) {
          let reply = `Here are the latest published product updates on **ChangelogPulse**: 🚀\n\n`;
          const actions = [];
          res.data.slice(0, 3).forEach((up, idx) => {
            const cat = up.category ? up.category.toUpperCase() : 'UPDATE';
            reply += `${idx + 1}. **${up.title}** (\`v${up.version}\`) — *${cat}*\n   _${up.description.substring(0, 80)}..._\n\n`;
            actions.push({
              label: `View ${up.version}`,
              path: `/user/changelog/${up.slug || up._id}`
            });
          });
          actions.push({ label: 'All Product Updates →', path: '/user/updates' });

          return {
            success: true,
            data: {
              message: reply,
              actions
            }
          };
        }
      } catch (err) {
        console.warn('Real data fetch for updates failed, using fallback:', err);
      }
    }

    // 4. Context-Aware Page Queries ("What can I do here?", "Explain this page")
    const isPageQuery =
      lowerMsg.includes('this page') ||
      lowerMsg.includes('what can i do here') ||
      lowerMsg.includes('explain this section') ||
      lowerMsg.includes('is page pe kya kar sakta hu') ||
      lowerMsg.includes('what is this page');

    if (isPageQuery && context.route) {
      if (context.route.startsWith('/user/changelog/') || context.route.startsWith('/changelog/')) {
        return {
          success: true,
          data: {
            message: `You are currently viewing an **Update Detail Page**! 📝\n\nHere you can read full release notes for this specific update, view tags, and submit your feedback to the team using the Feedback section below.`,
            actions: [
              { label: 'Back to Product Updates →', path: '/user/updates' },
              { label: 'My Feedback History →', path: '/user/feedback' }
            ]
          }
        };
      }
      if (context.route === '/user/dashboard') {
        return {
          success: true,
          data: {
            message: `The **User Dashboard** is your main workspace. From here you can explore the latest product updates, read changelog entries, submit feedback, and manage your account.`,
            actions: [
              { label: 'View Product Updates →', path: '/user/updates' },
              { label: 'My Feedback →', path: '/user/feedback' }
            ]
          }
        };
      }
      if (context.route === '/user/updates') {
        return {
          success: true,
          data: {
            message: `You are on the **Product Updates** page! 📄\n\nHere you can search all product releases, filter by category badges (*Feature*, *Bug Fix*, *Improvement*), and click any card to read full release notes.`,
            actions: [{ label: 'Go to User Dashboard →', path: '/user/dashboard' }]
          }
        };
      }
      if (context.route === '/user/changelog') {
        return {
          success: true,
          data: {
            message: `You are viewing the **Changelog Feed**! 🚀\n\nThis is a chronological timeline of all published software releases and improvements.`,
            actions: [{ label: 'Go to User Dashboard →', path: '/user/dashboard' }]
          }
        };
      }
      if (context.route === '/user/feedback') {
        return {
          success: true,
          data: {
            message: `You are on **My Feedback & History**! 💬\n\nHere you can view all feedback messages you've submitted on product updates and read official responses from the ChangelogPulse team.`,
            actions: [{ label: 'Browse Updates to Submit Feedback →', path: '/user/updates' }]
          }
        };
      }
      if (context.route === '/user/profile') {
        return {
          success: true,
          data: {
            message: `You are on **Profile Settings**! ⚙️\n\nHere you can edit your display name, profile avatar image URL, email address, and update your account password.`,
            actions: [{ label: 'Go to User Dashboard →', path: '/user/dashboard' }]
          }
        };
      }
    }

    // 5. Try Backend Assistant API first
    try {
      const response = await API.post('/chatbot/message', {
        message: rawMsg,
        context
      });
      if (response.data && response.data.success && response.data.data) {
        return response.data;
      }
    } catch (err) {
      console.warn('Backend chatbot API call failed, evaluating local knowledge base:', err?.message);
    }

    // 6. Local FAQ Intent Matching (Offline / Knowledge Base Fallback)
    for (const item of userAssistantKnowledge.faq) {
      const isMatch = item.patterns.some((pat) => lowerMsg.includes(pat));
      if (isMatch) {
        return {
          success: true,
          data: {
            message: item.response,
            actions: item.actions || []
          }
        };
      }
    }

    // 7. Unknown Questions Fallback (PART 10)
    return {
      success: true,
      data: {
        message:
          "I'm not completely sure about that yet. I can help you with the User Dashboard, Product Updates, Changelog, Feedback, Profile, and other available User Panel features.",
        actions: [
          { label: 'User Dashboard →', path: '/user/dashboard' },
          { label: 'Product Updates →', path: '/user/updates' },
          { label: 'My Feedback →', path: '/user/feedback' }
        ]
      }
    };
  }
};

export default assistantService;
