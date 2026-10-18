import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_MENU_ITEMS, INITIAL_SETTINGS } from './src/data/initialData';
import { MenuItem, RestaurantSettings } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory data store with disk persistence fallback
const DATA_DIR = path.join(__dirname, '.data');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create data dir:', err);
  }
}

let currentMenu: MenuItem[] = [...INITIAL_MENU_ITEMS];
let currentSettings: RestaurantSettings = { ...INITIAL_SETTINGS };

// Load persistent data if exists
try {
  if (fs.existsSync(MENU_FILE)) {
    const raw = fs.readFileSync(MENU_FILE, 'utf-8');
    currentMenu = JSON.parse(raw);
  }
} catch (e) {
  console.log('Using default initial menu');
}

try {
  if (fs.existsSync(SETTINGS_FILE)) {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    currentSettings = JSON.parse(raw);
  }
} catch (e) {
  console.log('Using default initial settings');
}

function saveMenuToDisk() {
  try {
    fs.writeFileSync(MENU_FILE, JSON.stringify(currentMenu, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving menu to disk:', e);
  }
}

function saveSettingsToDisk() {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(currentSettings, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving settings to disk:', e);
  }
}

// API Routes
app.get('/api/menu', (_req: Request, res: Response) => {
  res.json({ success: true, menu: currentMenu });
});

app.post('/api/menu', (req: Request, res: Response) => {
  const { menu } = req.body;
  if (Array.isArray(menu)) {
    currentMenu = menu;
    saveMenuToDisk();
    return res.json({ success: true, message: 'Menu updated successfully', menu: currentMenu });
  }
  return res.status(400).json({ success: false, message: 'Invalid menu data provided' });
});

app.get('/api/settings', (_req: Request, res: Response) => {
  res.json({ success: true, settings: currentSettings });
});

app.post('/api/settings', (req: Request, res: Response) => {
  const { settings } = req.body;
  if (settings && typeof settings === 'object') {
    currentSettings = { ...currentSettings, ...settings };
    saveSettingsToDisk();
    return res.json({ success: true, message: 'Settings updated successfully', settings: currentSettings });
  }
  return res.status(400).json({ success: false, message: 'Invalid settings data provided' });
});

// TRK Smart Assistant Endpoint
app.post('/api/assistant/chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'A user message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Format real menu summary for the prompt to prevent hallucination
  const dailyMenuItems = currentMenu
    .filter((m) => m.isDailyMenu)
    .map((m) => `- ${m.name} (${m.urduName || ''}): ${m.isSoldOut ? 'SOLD OUT' : m.availableToday ? 'Available Today' : 'Not Available'}, Price: ${m.price ? `PKR ${m.price}` : 'Ask for Price'}. Portions: ${m.portions.map(p => `${p.label} (PKR ${p.price ?? 'TBD'})`).join(', ')}. Details: ${m.description}`)
    .join('\n');

  const onOrderItems = currentMenu
    .filter((m) => !m.isDailyMenu)
    .map((m) => `- [Category: ${m.category}] ${m.name}: ${m.price ? `Starts from PKR ${m.price}` : 'Ask for Price'}. Portions: ${m.portions.map(p => `${p.label}: ${p.price ? 'PKR ' + p.price : 'Ask for Price'}`).join(', ')}. Advance notice: ${m.minAdvanceNoticeHours || 4} hrs. Min order: ${m.minOrderQty || 'Half KG'}`)
    .join('\n');

  const systemInstruction = `You are "TRK Smart Assistant", the official friendly, professional AI sales and food ordering assistant for THE ROYAL KITCHEN (TRK).

Brand Guidelines:
- Brand Name: The Royal Kitchen (TRK)
- Tagline: "Ghar ka khana ghar tak."
- Location: Near Gulshan-e-Iqbal Block 6, Karachi, Pakistan.
- Coverage: Across Karachi. Delivery charges depend on the customer's specific area and are confirmed on WhatsApp.
- Payment Policy: ONLINE PAYMENT ONLY (Bank Transfer / Raast / JazzCash / Nayapay). Cash On Delivery (COD) is strictly NOT available.
- Business model: Homemade delivery service only. No dine-in. Customers place/finalize orders through WhatsApp.
- Special orders: Minimum special order quantity starts from Half KG where applicable. Advance notice required.

Tone and Persona:
- Warm, respectful, Pakistani hospitality, professional, helpful, conversational, NOT robotic.
- Support English, Roman Urdu, and Urdu. AUTOMATICALLY reply in the exact language the customer uses (e.g. if they write in Roman Urdu like "Aaj kya bana hai?", answer warmly in natural Roman Urdu like "Assalam-o-Alaikum! Aaj hamare pas taza paka hua Chicken Qorma aur Daal Chawal & Shami Platter dastyab hai!").
- Keep replies concise, appetizing, and practical (under 3-4 short paragraphs).

STRICT RULES:
1. NEVER invent food availability or menu items. ONLY refer to the actual dishes listed below.
2. NEVER invent prices for dishes where price is unconfirmed. If an item says "Ask for Price", tell them politely that the price will be confirmed by admin on WhatsApp.
3. NEVER promise delivery times without confirmation.
4. NEVER claim payment has been received or confirm an order yourself. Remind them to finalize via WhatsApp.
5. Patient Meals: Do not make medical claims or describe meals as medically approved. Remind them to provide doctor/dietitian recommendations.
6. If the customer asks how to order, clearly guide them to add dishes to cart or click "Order on WhatsApp" / contact ${currentSettings.whatsappNumber}.

CURRENT LIVE MENU DATA:
--- TODAY'S FRESH DAILY MENU ---
${dailyMenuItems || 'Daily menu is currently being updated. Contact on WhatsApp for today’s specials.'}

--- ON ORDER SPECIALS (BIRYANI, KARAHI, SAALAN, FAMILY) ---
${onOrderItems}

--- DELIVERY & RESTAURANT INFO ---
Operating Hours: ${currentSettings.businessHours}
Payment: ${currentSettings.paymentPolicy}
Karachi Coverage: All major areas (Gulshan, Jauhar, PECHS, Clifton, DHA, FB Area, North Nazimabad, etc.)`;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Intelligent fallback when API key is not yet set
    const lower = message.toLowerCase();
    let reply = `Assalam-o-Alaikum! Welcome to The Royal Kitchen (TRK) — "Ghar ka khana ghar tak."\n\n`;

    if (lower.includes('aaj') || lower.includes('menu') || lower.includes('today') || lower.includes('kya bana')) {
      const available = currentMenu.filter(m => m.isDailyMenu && !m.isSoldOut);
      reply += `Aaj ke Daily Fresh Menu mein hamare pas yeh lazeez ghar ke khaney tayyar hain:\n` +
        available.map(m => `• ${m.name}: PKR ${m.price || 'Ask for Price'}`).join('\n') +
        `\n\nAap website par "Add to Cart" karke direct WhatsApp par order forward kar sakte hain!`;
    } else if (lower.includes('biryani') || lower.includes('karahi') || lower.includes('special') || lower.includes('pulao')) {
      reply += `Hamare On-Order Specials mein Special Chicken Biryani (Half KG: PKR 1,300 / 1 KG: PKR 2,200), Aloo Biryani, Desi Chicken Karahi, aur Shahi Qorma advance order par tayyar kiye jatay hain (Minimum half KG se start). Aap kis dish mein interested hain?`;
    } else if (lower.includes('patient') || lower.includes('bimar') || lower.includes('diet') || lower.includes('sugar') || lower.includes('oil')) {
      reply += `Ji bilkul! Hamara "Patient Special Meals" section khas un afrad ke liye hai jin ko kam mirch, kam oil ya doctor ki hidayat ke mutabiq khana darkar ho. Aap inquiry submit karke WhatsApp par hum se rabta kar sakte hain.`;
    } else if (lower.includes('delivery') || lower.includes('charges') || lower.includes('area') || lower.includes('location')) {
      reply += `Hum Near Gulshan-e-Iqbal Block 6, Karachi se deliver karte hain across pure Karachi. Delivery charges aap ke specific area par depend karte hain aur WhatsApp order confirmation ke waqt confirm kiye jatay hain. Note: Hum sirf ONLINE PAYMENT accept karte hain (Cash on Delivery dastyab nahi hai).`;
    } else {
      reply += `Main aap ki food ordering mein madad ke liye hazir hoon. Aap aaj ka daily fresh menu dekhna chahte hain ya family/special dawat ke liye on-order dish prepare karwana chahte hain?`;
    }

    return res.json({
      success: true,
      reply,
      suggestedQuestions: [
        'Aaj kya bana hai?',
        'Chicken Biryani ki price kya hai?',
        'Patient special meals ka kya process hai?',
        'Delivery charges aur payment policy?'
      ]
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    // Format chat history if provided
    let conversationContext = '';
    if (Array.isArray(history) && history.length > 0) {
      conversationContext = history
        .slice(-6)
        .map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Customer' : 'TRK Assistant'}: ${h.text}`)
        .join('\n');
    }

    const promptText = `${conversationContext ? `Recent conversation:\n${conversationContext}\n\n` : ''}Customer: ${message}\n\nRespond as TRK Smart Assistant following all guidelines and language preferences:`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const reply = response.text || 'Assalam-o-Alaikum! Please check our Daily Menu or reach out directly to us on WhatsApp for quick confirmation.';

    return res.json({
      success: true,
      reply,
      suggestedQuestions: [
        'Today’s fresh daily menu',
        'Special Biryani & Karahi prices',
        'Order Patient Special meal',
        'Direct WhatsApp Support'
      ]
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    return res.json({
      success: true,
      reply: `Assalam-o-Alaikum! We are experiencing a brief connection delay with our AI service. Aap hamara live Daily Menu aur On-Order Specials page par browse kar sakte hain, ya WhatsApp par direct rabta karke foran order book karwa sakte hain!`,
      suggestedQuestions: [
        'Browse Daily Menu',
        'View Biryani & Karahi Specials',
        'WhatsApp Direct Inquiry'
      ]
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Royal Kitchen server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
