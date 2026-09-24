import assistantService from './assistantService';

export const chatbotService = {
  sendMessage: async (message, context = {}) => {
    return assistantService.processUserMessage(message, context);
  }
};

export default chatbotService;
