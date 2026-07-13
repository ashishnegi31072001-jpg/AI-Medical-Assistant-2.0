const Chat = require("../models/Chat");
const { askAI } = require("../services/aiService");
const { getReportContext } = require("../services/ragService");

// ==========================================
// AI Chat
// ==========================================
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Save User Message
    await Chat.create({
      user: userId,
      sender: "user",
      message,
    });

    // ===============================
    // Get Uploaded Medical Reports
    // ===============================
    const context = await getReportContext(userId);

    // Debug (IMPORTANT)
    console.log("\n========== REPORT CONTEXT ==========");
    console.log(context);
    console.log("========== END CONTEXT ==========\n");

    // Ask AI
    const aiReply = await askAI(message, context);

    // Save AI Reply
    await Chat.create({
      user: userId,
      sender: "ai",
      message: aiReply,
    });

    return res.status(200).json({
      success: true,
      reply: aiReply,
    });

  } catch (error) {
    console.error("CHAT ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Chat History
// ==========================================
const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user.id,
    }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      chats,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// Clear Chat History
// ==========================================
const clearChatHistory = async (req, res) => {
  try {
    await Chat.deleteMany({
      user: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Chat history cleared successfully.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  chatWithAI,
  getChatHistory,
  clearChatHistory,
};