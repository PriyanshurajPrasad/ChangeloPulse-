const Update = require('../models/Update');
const chatbotKnowledge = require('../utils/chatbotKnowledge');
const { matchIntent } = require('../utils/intentMatcher');

/**
 * Service to process chatbot requests dynamically with application knowledge and real DB context
 */
const chatbotService = {
  /**
   * Process incoming chat message and return structured response
   */
  processMessage: async (userMessage, context = {}, user = null) => {
    const cleanMsg = (userMessage || '').trim();
    const lowerMsg = cleanMsg.toLowerCase();

    // 1. Check for deterministic FAQ / intent match & security boundary
    const intentMatch = matchIntent(cleanMsg, context);
    if (intentMatch) {
      return intentMatch;
    }

    // 2. Check if user is asking for real latest updates
    if (
      lowerMsg.includes('latest update') ||
      lowerMsg.includes('recent update') ||
      lowerMsg.includes('new updates') ||
      lowerMsg.includes('what are the latest') ||
      lowerMsg.includes('show updates')
    ) {
      try {
        const latestUpdates = await Update.find({ status: 'published' })
          .sort({ publishedAt: -1, createdAt: -1 })
          .limit(3)
          .select('title version category slug description publishedAt');

        if (latestUpdates && latestUpdates.length > 0) {
          let reply = `Here are the latest published product updates on **ChangelogPulse**: 🚀\n\n`;
          const actions = [];

          latestUpdates.forEach((up, idx) => {
            const catName = up.category ? up.category.toUpperCase() : 'UPDATE';
            reply += `${idx + 1}. **${up.title}** (\`v${up.version}\`) — *${catName}*\n   _${up.description.substring(0, 80)}..._\n\n`;
            actions.push({
              label: `View ${up.version}`,
              path: `/user/changelog/${up.slug}`
            });
          });

          actions.push({ label: 'All Updates', path: '/user/updates' });

          return {
            handled: true,
            message: reply,
            actions
          };
        }
      } catch (err) {
        console.error('Error fetching latest updates for chatbot:', err);
      }
    }

    // 3. Check if user is viewing a specific update detail page
    if (context.route && (context.route.startsWith('/user/changelog/') || context.route.startsWith('/changelog/'))) {
      const slug = context.route.split('changelog/')[1];
      if (slug && (lowerMsg.includes('explain') || lowerMsg.includes('mean') || lowerMsg.includes('this update'))) {
        try {
          const activeUpdate = await Update.findOne({ slug, status: 'published' });
          if (activeUpdate) {
            let explanation = `This release is titled **"${activeUpdate.title}"** (Version \`${activeUpdate.version}\`). 📄\n\n`;
            explanation += `**Summary**: ${activeUpdate.description}\n\n`;
            explanation += `**Category**: \`${activeUpdate.category.toUpperCase()}\`\n\n`;
            explanation += `Scroll down to the **Feedback** section on this page to share your thoughts with the team!`;

            return {
              handled: true,
              message: explanation,
              actions: [
                { label: 'Back to Updates', path: '/user/updates' },
                { label: 'Go to User Dashboard', path: '/user/dashboard' }
              ]
            };
          }
        } catch (err) {
          console.error('Error fetching contextual update for chatbot:', err);
        }
      }
    }

    // 4. Default Unknown Question Response (PART 10)
    return {
      handled: true,
      message:
        "I'm not completely sure about that yet. I can help you with the User Dashboard, Product Updates, Changelog, Feedback, Profile, and other available User Panel features.",
      actions: [
        { label: 'User Dashboard', path: '/user/dashboard' },
        { label: 'Product Updates', path: '/user/updates' },
        { label: 'My Feedback', path: '/user/feedback' }
      ]
    };
  }
};

module.exports = chatbotService;
