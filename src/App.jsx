import React, { useEffect, useMemo, useRef, useState } from 'react';
import toolSourceCode from './App.jsx?raw';
import './App.css';

export default function App() {
  const roadmapStorageKey = 'lovable_lite_roadmap';
  const apiKeyStorageKey = 'deepseek_api_key';
  const emptyRoadmapText = 'Your roadmap will appear here...';

  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [projectName, setProjectName] = useState('GeneratedApp');
  const [appType, setAppType] = useState('Landing page');
  const [goal, setGoal] = useState('Create new app');
  const [designStyle, setDesignStyle] = useState('Premium SaaS');
  const [templateRecipe, setTemplateRecipe] = useState('None / custom');
  const [qualityLevel, setQualityLevel] = useState('Premium');
  const [pageFeeling, setPageFeeling] = useState('Safe and professional');
  const [websiteDepth, setWebsiteDepth] = useState('Long landing page');
  const [editSection, setEditSection] = useState('Whole app');
  const [generatedCode, setGeneratedCode] = useState('// Your generated code will appear here...');
  const [roadmap, setRoadmap] = useState(() => {
    try {
      return localStorage.getItem(roadmapStorageKey) || emptyRoadmapText;
    } catch (error) {
      return emptyRoadmapText;
    }
  });
  const [isPlanning, setIsPlanning] = useState(false);
  const [roadmapCopied, setRoadmapCopied] = useState(false);
  const [selectedRoadmapStep, setSelectedRoadmapStep] = useState('1');
  const [isBuildingStep, setIsBuildingStep] = useState(false);
  const [reviewText, setReviewText] = useState('Your review will appear here...');
  const [isReviewing, setIsReviewing] = useState(false);
  const standardTestPrompt = 'Create a premium website for an exclusive business development consultant';
  const [isGenerating, setIsGenerating] = useState(false);
  const [buildRecoveryMessage, setBuildRecoveryMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [suggestedPromptCopied, setSuggestedPromptCopied] = useState(false);
  const [status, setStatus] = useState('Ready');
  const [activeView, setActiveView] = useState('code');
  const previewFrameRef = useRef(null);
  const [versionHistory, setVersionHistory] = useState([]);
  const [checkpoint, setCheckpoint] = useState(null);

  useEffect(() => {
    try {
      const savedApiKey = localStorage.getItem(apiKeyStorageKey);
      const savedProjectName = localStorage.getItem('lovable_lite_project_name');
      const savedTemplateRecipe = localStorage.getItem('lovable_lite_template_recipe');
      const savedQualityLevel = localStorage.getItem('lovable_lite_quality_level');
      const savedPageFeeling = localStorage.getItem('lovable_lite_page_feeling');
      const savedWebsiteDepth = localStorage.getItem('lovable_lite_website_depth');
      const savedEditSection = localStorage.getItem('lovable_lite_edit_section');

      if (savedApiKey) setApiKey(savedApiKey);
      if (savedProjectName) setProjectName(savedProjectName);
      if (savedTemplateRecipe) setTemplateRecipe(savedTemplateRecipe);
      if (savedQualityLevel) setQualityLevel(savedQualityLevel);
      if (savedPageFeeling) setPageFeeling(savedPageFeeling);
      if (savedWebsiteDepth) setWebsiteDepth(savedWebsiteDepth);
      if (savedEditSection) setEditSection(savedEditSection);
    } catch (error) {
      // Local browser storage is optional. The app should keep working if storage is blocked.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(roadmapStorageKey, roadmap);
    } catch (error) {
      // Roadmap persistence is optional. The app should keep working if storage is blocked.
    }
  }, [roadmap]);

  useEffect(() => {
    try {
      if (apiKey) {
        localStorage.setItem(apiKeyStorageKey, apiKey);
      }
    } catch (error) {
      // API key persistence is optional. The app should keep working if storage is blocked.
    }
  }, [apiKey]);

  const getAppTypeInstruction = () => {
    const instructions = {
      'Landing page':
        'Create a polished landing page with hero, problem, solution, benefits, social proof, CTA, and footer.',
      Dashboard:
        'Create a polished dashboard with KPI cards, chart areas, tables, filters, navigation, and clear data hierarchy.',
      Form:
        'Create a premium form experience with grouped inputs, clear labels, helpful feedback, and strong submit flow.',
      Calculator:
        'Create a polished calculator app with clear inputs, result area, helpful states, and mobile-friendly controls.',
      'CRM view':
        'Create a CRM-style interface with customers, statuses, filters, business cards/tables, and professional layout.',
      Portfolio:
        'Create a portfolio with hero, projects, skills, about, credibility, and contact CTA.',
      'SaaS app':
        'Create a SaaS-style product app with navigation, clear product value, polished UI, and practical user flow.'
    };

    return instructions[appType] || instructions['Landing page'];
  };

  const getGoalInstruction = () => {
    const instructions = {
      'Create new app':
        'Create a new complete app or page based on the user request. Make it practical, polished, and usable immediately.',
      'Improve current design':
        'Improve the current design while keeping the same content, features, and app logic. Make it more premium and visually stronger.',
      'Add a section':
        'Add the requested section while keeping the current design style and all existing functionality.',
      'Change colors/style':
        'Update visual style, colors, spacing, typography, and polish while keeping functionality unchanged.',
      'Fix a problem':
        'Fix the described problem with minimal changes. Keep the rest of the app unchanged.'
    };

    return instructions[goal] || instructions['Create new app'];
  };

  const getDesignStyleInstruction = () => {
    const instructions = {
      'Premium SaaS':
        'Use a premium SaaS look: crisp layout, strong hero, elegant cards, subtle gradients, clean typography, clear CTAs, high trust, and polished spacing.',
      'Mobile app':
        'Use a native mobile app look: phone-like layout, large touch targets, bottom actions, app-style header, rounded cards, smooth visual hierarchy, and compact flows.',
      'Luxury landing page':
        'Use a luxury landing page look: refined typography, elegant spacing, minimal premium visuals, warm or dark neutral palette, and high-end brand feeling.',
      'Startup dark mode':
        'Use a modern startup dark mode look: dark background, glowing accents, gradient sections, bold hero, polished cards, and strong product-led CTA structure.',
      'Clean consultant site':
        'Use a clean professional consultant website look: trustworthy layout, calm colors, credibility sections, service blocks, process section, and clear contact CTA.',
      'Food app':
        'Use a premium food app look: warm cream background, soft red/orange accents, appetizing imagery, rounded food cards, large touch-friendly actions, and emotional food-focused copy.',
      'Dashboard pro':
        'Use a professional dashboard look: sidebar or topbar, KPI cards, chart placeholders, tables, filters, clean spacing, and business-grade visual hierarchy.',
      Marketplace:
        'Use a marketplace look: search/filter feel, product or service cards, trust signals, category sections, clear actions, and polished browsing experience.'
    };

    return instructions[designStyle] || instructions['Premium SaaS'];
  };

  const getTemplateRecipeInstruction = () => {
    const instructions = {
      'None / custom':
        'No specific template recipe selected. Follow the user request closely while still creating a complete, polished, practical result.',
      'SaaS landing page':
        'Use a SaaS landing page recipe: hero with clear value proposition, pain/problem section, product solution, feature cards, how it works, pricing or plan preview, testimonials, FAQ, final CTA, and footer.',
      'Consultant website':
        'Use a consultant website recipe: credible hero, who it helps, services, process, proof/results, about section, testimonials or case-study feel, contact CTA, and footer.',
      'Restaurant website':
        'Use a restaurant website recipe: appetizing hero, menu highlights, atmosphere/story, booking or order CTA, opening hours, location, reviews, gallery-like visual sections, and footer.',
      'Mobile app':
        'Use a mobile app recipe: app-like shell, clear starting screen, primary user flow, cards or list view, large touch-friendly actions, feedback states, empty state, result or completion screen, and polished mobile-first layout.',
      Dashboard:
        'Use a dashboard recipe: topbar or sidebar, KPI cards, charts or chart placeholders, recent activity, data table, filters, clean spacing, status indicators, and business-grade hierarchy.',
      'Booking app':
        'Use a booking app recipe: service selection, date/time section, availability cards, customer details form, confirmation summary, clear CTA, empty/loading states, and polished trust-building layout.',
      Marketplace:
        'Use a marketplace recipe: strong search/filter entry point, categories, item cards, trust signals, featured items, comparison/browsing flow, clear item actions, and polished browsing experience.',
      Portfolio:
        'Use a portfolio recipe: strong personal hero, selected projects, skills, work process, credibility, about section, contact CTA, and footer.'
    };

    return instructions[templateRecipe] || instructions['None / custom'];
  };

  const getQualityLevelInstruction = () => {
    const instructions = {
      Standard:
        'Create a clean, practical, modern result. Keep it simple, usable, responsive, and visually pleasant without overcomplicating the layout.',
      Premium:
        'Create a premium result with a strong hero, at least one real public image URL preferably from Unsplash, realistic imagery or image-like panels, refined typography, confident whitespace, clear CTAs, trust elements, validator-detectable image code such as img, backgroundImage, image, photo, visual, figure, or editorial, and a polished agency-level visual system.',
      Luxury:
        'Create a luxury editorial result with cinematic composition, at least one real public image URL preferably from Unsplash, large image-led sections, refined typography, asymmetry, restrained color, strong brand story, premium whitespace, fewer but stronger sections, curated image choices, validator-detectable image code such as img, backgroundImage, image, photo, visual, figure, or editorial, and an exclusive high-end feeling.',
      Enterprise:
        'Create an enterprise-grade premium result with executive-level credibility, strong information hierarchy, mature visual language, context-correct imagery, at least one real public image URL preferably from Unsplash, trust elements, scalable business structure, polished dashboards or sections where relevant, validator-detectable image code such as img, backgroundImage, image, photo, visual, figure, or editorial, and serious professional design.'
    };

    return instructions[qualityLevel] || instructions.Premium;
  };

  const getPageFeelingInstruction = () => {
    const instructions = {
      'Safe and professional':
        'Use a safe, polished, trustworthy direction. Make the result feel serious, clear, credible, and professional. This is the best default for business websites.',
      'More wow':
        'Make the result more impressive and memorable. Use stronger hero composition, bigger visual moments, bolder typography, stronger contrast, and a more premium first impression while keeping it tasteful.',
      'More visual':
        'Use more images, larger visual sections, more atmosphere, and less text-heavy layout. Let photography, editorial panels, visual proof, and image-led storytelling carry more of the experience.',
      'More sales-focused':
        'Make the result more focused on conversion. Strengthen CTAs, benefits, proof, trust signals, customer outcomes, objections, and booking or purchase flow.',
      'More exclusive':
        'Make the result feel more high-end, luxury, editorial, and restrained. Use fewer but stronger sections, more whitespace, elegant typography, curated imagery, and a quieter premium tone.',
      'More compact':
        'Make the result more compact and practical. Reduce excessive vertical spacing, show more useful information earlier, keep the layout polished, and avoid unnecessary empty sections.'
    };

    return instructions[pageFeeling] || instructions['Safe and professional'];
  };

  const getWebsiteDepthInstruction = () => {
    const instructions = {
      'One-page website':
        'Create a simple one-page website. Keep all content on one page with clear sections and working scroll-style navigation when useful.',
      'Long landing page':
        'Create a long, polished landing page with several strong sections on one page. Use clear anchors, CTA flow, proof, services, process, and final contact area.',
      'Simple multi-page website':
        'Create a compact premium multi-page-feeling website inside one App.jsx file. Use internal React state: const [activePage, setActivePage] = React.useState("home"). Include Home, About, Services, and Contact. Use buttons with onClick={() => setActivePage("home")} style navigation. No React Router. No href-only navigation. Home should have a rich editorial hero with visible content in the first screen, a premium image or visual panel, proof, and CTA. Avoid huge empty dark hero space. Each page should feel designed, not like plain text.',
      'Full business website':
        'Create a compact premium full business website inside one App.jsx file. Use internal React state: const [activePage, setActivePage] = React.useState("home"). Include Home, About, Services, Cases, Resources, and Contact. Use buttons with onClick={() => setActivePage("home")} style navigation. No React Router. No href-only navigation. Home should have a rich editorial hero with visible content in the first screen, a premium image or visual panel, proof, and CTA. Avoid huge empty dark hero space. Each page should feel designed, not like plain text.'
    };

    return instructions[websiteDepth] || instructions['Long landing page'];
  };

  const getEditSectionInstruction = () => {
    const instructions = {
      'Whole app':
        'No section lock. Create or update the whole app/page normally, while preserving existing functionality when editing an existing app.',
      Hero:
        'Edit only the hero/opening section: headline, subcopy, hero CTA, hero image/visual panel, first-screen composition, and immediate proof. Keep all other sections and behavior unchanged.',
      Services:
        'Edit only the services/offer section: service names, descriptions, layout, service cards, proof around services, and related CTA. Keep other sections unchanged.',
      CTA:
        'Edit only CTA areas: primary CTA buttons, final CTA section, booking/contact callout, conversion copy, and action hierarchy. Keep other sections unchanged.',
      'Testimonials / proof':
        'Edit only testimonials, metrics, trust signals, case proof, quotes, client/result blocks, and credibility cues. Keep other sections unchanged.',
      About:
        'Edit only the About/Om section or About page: founder/company story, credibility, advisory positioning, image/visual, and supporting copy. Keep other sections unchanged.',
      Contact:
        'Edit only the Contact/Kontakt section or page: form, booking copy, contact CTA, contact visual, response promise, and contact details. Keep other sections unchanged.',
      Navigation:
        'Edit only navigation/header/footer navigation: labels, active states, spacing, mobile behavior, and page switching. Keep page content unchanged.',
      'Visual style only':
        'Edit visual style across the app: colors, typography, spacing, borders, shadows, hierarchy, and premium polish. Keep content, sections, data, and functionality unchanged.'
    };

    return instructions[editSection] || instructions['Whole app'];
  };

  const getSmartBriefInstruction = () => {
    return `Smart brief rules for non-technical users:
- Treat short, simple, or vague user prompts as normal.
- Expand the user's request into a complete product direction internally before writing code.
- Choose sensible sections, copy, layout, data, and visual direction automatically.
- Replace generic placeholder text with believable, specific, industry-aware content.
- Prefer concrete output over explanations. The final response must still be only App.jsx code.`;
  };

  const getQualityGateInstruction = () => {
    return `Internal quality gate before final answer:
Before returning App.jsx, silently review and improve the design.
1. The first screen has a strong visual opening.
2. The layout has clear hierarchy, premium spacing, and deliberate structure.
3. Copy is specific and commercially usable.
4. CTAs are clear and visible.
5. Trust elements, proof, metrics, testimonials, process, or credibility cues are included where relevant.
6. Visuals feel realistic and context-aware.
7. The design avoids emoji-led identity, weak three-column templates, cramped cards, and old corporate styling.
8. Mobile layout remains usable.
9. Existing functionality is preserved when editing.
10. The final code is complete, valid, and exports default function App.
11. For multi-page websites, navigation must actually switch pages with internal state.
12. For premium multi-page websites, the home hero should show headline, CTA, proof, and a visual panel high enough to be visible immediately.
13. About, Services, Cases, Resources, and Contact pages should each feel intentionally designed with their own sections, not like plain filler pages.
Do not print this checklist.`;
  };

  const getVisualQAInstruction = () => {
    return `Visual QA and image consistency rules:
- Use context-correct imagery.
- If exact identity is uncertain, use neutral brand, office, architecture, product, abstract editorial, or atmospheric imagery instead of a misleading headshot.
- Prefer high-quality realistic photography from stable public image URLs when images are useful.
- For Luxury and Enterprise, avoid repetitive equal-card grids as the dominant structure.
- Keep vertical spacing premium but controlled.
- Buttons, headings, and key content should remain comfortably visible in the first screen.
- Avoid blank, nearly empty, or overly tall heroes where the visitor has to scroll far before meaningful content appears.
- For contact pages, prefer executive meeting, boardroom, architecture, refined office, or abstract premium visuals.
- The final result should feel curated, not generic.`;
  };

  const getOutputProtectionInstruction = () => {
    return `Output protection rules:
- Return the entire App.jsx file.
- Never stop mid-style, mid-object, mid-string, or mid-JSX.
- If the answer would be long, return a complete shorter premium version instead of an unfinished file.
- Use inline styles only.
- Do not use external libraries.
- For Premium, Luxury, and Enterprise landing pages, include realistic image-led or editorial visual sections unless the user asks for no images.
- For Premium, Luxury, and Enterprise outputs, include at least one real public image URL, preferably a stable Unsplash URL, plus validator-detectable image-related code such as img, backgroundImage, image, photo, visual, figure, or editorial.
- For contact forms, place the success message as a clearly visible inline banner inside the contact form area, directly above the submit button, and keep the honest local-only wording that says the preview recorded the enquiry locally and no email was sent.
- Do not use href="#" for social links. If real URLs are not available, omit the social links or render them as non-clickable labels.
- Avoid fake names, fake client companies, unverifiable metrics, fake phone numbers, and fake emails unless they are clearly marked as illustrative/demo content.
- Do not use emoji icons as the main visual language for Premium, Luxury, or Enterprise.
- Avoid lorem ipsum, coming soon, under construction, and empty placeholder pages.
- If creating a consultant website, make it feel like a high-end advisory brand.
- For Simple multi-page website or Full business website, include activePage, setActivePage, working navigation buttons, and real content for every page.
- Do not use React Router.
- Do not use href-only navigation in multi-page mode.
- For premium multi-page mode, avoid a mostly empty hero. Prefer a compact editorial hero with visible text, CTA, proof, and visual card/image in the first screen.`;
  };

  const getGroundZeroScoringInstruction = () => {
    return `Ground Zero scoring rules:
Before returning code for Premium, Luxury, or Enterprise, silently score the result against the current Mini-Lovable v19 Ground Zero baseline.
The baseline is a dark premium consultant landing page with strong hero, polished typography, clear CTA, image-led editorial section, services, process, metrics/result cards, testimonial, and mature high-end tone.
The result must be equal to or better than that baseline.
Improve internally if:
- The first screen is only a plain gradient, centered text, and buttons.
- The hero is mostly empty vertical space.
- The page lacks a strong image-led editorial section.
- The page lacks a real public image URL or validator-detectable image-related code.
- The page lacks proof.
- The page feels like a basic three-column template.
- The page uses emoji icons as the main design system.
- The page has too little content depth.
Use this test prompt as calibration: "Create a premium website for an exclusive business development consultant".`;
  };

  const getContactFormSafetyInstruction = () => {
    return `Contact page and contact section rules:
- If the generated app includes a Contact page or Contact section, do not use placeholder text such as "form available upon request", "contact form available upon request", "available upon request", or "for now, please reach us directly".
- If a contact form is shown, it must render real visible fields.
- Minimum form fields: name, email, message.
- If the user asks for surname or last name, include that too.
- A visible submit button is required.
- If there is no backend integration, the form must prevent default submit behavior, use local React state, and show a visible local confirmation message after submit.
- Contact forms should make required fields obvious.
- Add clear labels and helpful placeholders for each field.
- If using required fields, make it clear what is missing before submitting.
- Prefer simple local validation state for name, email, and message instead of relying only on browser-native required behavior.
- If the user submits with missing fields, show a visible message such as: "Please fill in name, email, and message before submitting."
- The validation message should appear near the form, not only as a browser tooltip.
- After a successful local submit, replace the form or show a visible confirmation directly above or below it.
- Place the confirmation where the form was or directly above or below it so the user can see it immediately.
- After successful local submit, the user must get immediate visible feedback.
- Prefer a visible confirmation banner directly above the form submit area or at the top of the contact form panel.
- For local-only contact forms, do not replace the entire form with only a separate thank-you block as the main confirmation pattern.
- Prefer keeping the form area visible and showing a clear inline success banner inside the form.
- The success banner must appear directly above the submit button or at the top of the form panel.
- The success banner must be controlled by local state such as submitStatus, formStatus, successMessage, or submitted.
- The banner text must be honest, for example: "Thank you. This demo preview has recorded your enquiry locally. No email was sent."
- The success banner should be rendered as a clearly visible inline banner inside the form area, directly above the submit button, not hidden in a separate section.
- Avoid wording that implies real delivery: "I will respond within 24 hours", "We have received your email", "Your message has been sent" unless real backend integration exists.
- A valid preview contact form should preferably keep name/email/message fields visible, show missing-field errors near the form, show success banner near the submit button, and not claim real email delivery.
- The confirmation must be visible without the user needing to scroll manually.
- Do not hide the confirmation in a clipped, fixed, absolute, or collapsed layout.
- Keep the confirmation in the same visible area as the submit button.
- If replacing the entire form with a thank-you block, ensure the thank-you block appears in the same visible area and is visually prominent.
- For long contact forms, either show a persistent success banner near the submit button or use a React ref and scrollIntoView after submit so the confirmation is brought into view.
- Do not rely on a subtle text change only.
- Confirmation should use clear styling: border, background, spacing, and a success headline.
- Local preview confirmation must still be honest and must not claim real email delivery.
- Users should never feel that clicking submit did nothing.
- Contact forms must be fully visible and usable in the preview iframe.
- Avoid layouts where the contact form is placed in a narrow right column that can be clipped.
- For contact pages, prefer a responsive layout using flexWrap, grid with minmax, or a single-column layout on narrow screens.
- The form container should use width: "100%" and a sensible maxWidth.
- Inputs, textareas, and submit buttons should use boxSizing: "border-box" and width: "100%".
- Avoid horizontal overflow on contact pages.
- Confirmation after submit must appear in the same visible area where the form was, not off-screen.
- If using a two-column contact layout, ensure it wraps or stacks cleanly in narrow preview widths.
- The submit button must remain visible without requiring horizontal scrolling.
- Do not claim that a message was sent to a server unless real backend integration exists.
- If using a local confirmation only, phrase it honestly, for example: "Thank you. Your enquiry has been prepared for review.", "Thank you. This demo form stores your message locally only.", or "Thank you. Your request has been noted in this preview." Do not say: "Your message has been sent.", "Email sent successfully.", or "We have received your email." unless there is real backend integration.`;
  };

  const getContactFormCodeRecipeInstruction = () => {
    return `Contact form implementation recipe:
If the generated app includes any Contact page or Contact section with a form, this recipe is mandatory.
When generating a local-only contact form, use this structure or an equivalent pattern:

1. Define top-level state inside App with the exact state names:
const [contactForm, setContactForm] = React.useState({ name: '', email: '', message: '' });
const [contactError, setContactError] = React.useState('');
const [contactSuccessMessage, setContactSuccessMessage] = React.useState('');

2. Use a submit handler with the exact handler name:
const handleContactSubmit = (event) => {
  event.preventDefault();

  if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
    setContactError('Please fill in name, email, and message before submitting.');
    setContactSuccessMessage('');
    return;
  }

  setContactError('');
  setContactSuccessMessage('Thank you. This demo preview recorded your enquiry locally. No email was sent.');
};

3. Keep the form visible after submit.

4. Render the success message as an inline banner inside the form area, directly above the submit button:
{contactSuccessMessage && (
  <div role="status" aria-live="polite" style={{ ... }}>
    {contactSuccessMessage}
  </div>
)}

5. Place the success banner inside the <form>, directly above the submit button.
6. Make the success banner clearly visible with honest local-only wording: the preview recorded the enquiry locally and no email was sent.
7. Keep the form fields visible after submit.
8. Do not replace the whole form with only a thank-you block.
9. Do not use only submitted ? (...) : (...) to replace the whole form.
10. Do not use vague variable names such as submitted only, unless contactSuccessMessage also exists.
11. The generated code must include the literal string contactSuccessMessage.
12. Do not say the message was sent.
13. Do not promise a real response.
14. Do not use backend words unless backend integration exists.
15. Inputs and textarea must stay controlled and remain editable after submit.
16. Keep the confirmation in the same visible area as the submit button and do not place it inside a clipped, fixed, absolute, hidden, or collapsed container.
17. If the contact form is long, use scrollIntoView or equivalent so the visible confirmation is brought into view immediately after submit.
18. This pattern should pass the contact form confirmation validator.`;
  };

  const getReactRuntimeSafetyInstruction = () => {
    return `React runtime safety rules:
- Do not call React hooks inside nested render helper functions such as renderContact, renderHome, renderPage, or inside conditional rendering functions.
- Hooks such as useState, useEffect, useMemo, and useRef must be called only at the top level of the App component or inside proper child components.
- If a generated app needs contact form state, define the state at the top level of App, or create a proper child component such as ContactPage.
- Do not define page components inside App() and render them as JSX tags if they contain forms, inputs, local interaction, or controlled fields.
- Avoid this pattern inside App():
  const ContactPage = () => (...)
  ...
  {activePage === "contact" && <ContactPage />}
- This can remount the page on every parent render and cause input fields to lose focus after each typed character.
- For pages inside a single App.jsx, prefer stable render helper functions called directly:
  const renderContact = () => (...)
  ...
  {activePage === "contact" && renderContact()}
- Or define child components outside App() if separate components are needed.
- Controlled input fields must keep focus while typing.
- If a generated form loses focus after each character, the structure is wrong.
- Form fields must remain focusable and visible while typing; avoid layout or remount patterns that hide, clip, or reset inputs.
- Avoid patterns like:
  const renderContact = () => {
    const [formData, setFormData] = React.useState(...)
  }
- This can cause blank preview screens or hook order errors.`;
  };

  const validateGeneratedAppCode = (code) => {
    const trimmedCode = String(code || '').trim();

    if (!trimmedCode.includes('export default function App')) {
      return 'Generated code was rejected: missing export default function App.';
    }

    if (/```/.test(trimmedCode)) {
      return 'Generated code was rejected: markdown fences were included.';
    }

    if (/[#:'"{(,]\s*$/.test(trimmedCode)) {
      return 'DeepSeek returned incomplete code. Try Generate again, or choose Long landing page.';
    }

    let braceBalance = 0;
    let parenBalance = 0;
    let bracketBalance = 0;

    for (const char of trimmedCode) {
      if (char === '{') braceBalance += 1;
      if (char === '}') braceBalance -= 1;
      if (char === '(') parenBalance += 1;
      if (char === ')') parenBalance -= 1;
      if (char === '[') bracketBalance += 1;
      if (char === ']') bracketBalance -= 1;
    }

    if (braceBalance !== 0 || parenBalance !== 0 || bracketBalance !== 0) {
      return 'DeepSeek returned incomplete code. Try Generate again, or choose Long landing page.';
    }

    return '';
  };

  const validatePremiumVisualFloor = (code) => {
    const selectedQuality = String(qualityLevel || '').toLowerCase();
    const isHighQuality = ['premium', 'luxury', 'enterprise'].includes(selectedQuality);

    if (!isHighQuality) {
      return '';
    }

    const rawCode = String(code || '');
    const lowerCode = rawCode.toLowerCase();
    const likelyLandingOrBrandSite =
      appType === 'Landing page' ||
      templateRecipe === 'Consultant website' ||
      templateRecipe === 'SaaS landing page' ||
      templateRecipe === 'Restaurant website' ||
      templateRecipe === 'Portfolio' ||
      designStyle === 'Luxury landing page' ||
      lowerCode.includes('hero');

    if (!likelyLandingOrBrandSite) {
      return '';
    }

    const imageUrlMatches = rawCode.match(/https:\/\/[^'"`\s)]+(?:unsplash|images|photo|jpg|jpeg|png|webp)[^'"`\s)]*/gi) || [];
    const emojiMatches = rawCode.match(/[\u{1F300}-\u{1FAFF}]/gu) || [];

    if (/lorem ipsum|coming soon|under construction/i.test(rawCode)) {
      return 'Generated design was rejected: unfinished placeholder text was found.';
    }

    if (emojiMatches.length > 2) {
      return 'Generated design was rejected: too many emoji icons for a premium/luxury result.';
    }

    const hasHero = /hero/i.test(rawCode);
    const hasCta = /cta|button|contact|book|demo|schedule|start|book a call/i.test(rawCode);
    const hasProof = /testimonial|quote|client|result|metric|stat|trust|proof|case|recommend|growth|\d+\+|\d+%/i.test(rawCode);
    const hasProcess = /process|step|how it works|how we work|workflow|method/i.test(rawCode);
    const hasServices = /services|offer|what i do|what i do|features|solutions|service/i.test(rawCode);
    const hasEditorialImage = imageUrlMatches.length >= 1 && /image|photo|visual|backgroundImage|img|figure|editorial|portrait|atmospheric/i.test(rawCode);
    const hasStrongImageDepth = imageUrlMatches.length >= 2;
    const hasPremiumTone = /premium|luxury|executive|strategic|exclusive|business development|advisor|consulting|brand|positioning|transformation|growth/i.test(rawCode);
    const hasDarkOrEditorialMood = /#0|#1|black|dark|rgba\(0|linear-gradient|radial-gradient|editorial|cinematic/i.test(rawCode);
    const hasLargeTypeOrHeroSizing = /clamp\(|fontSize:\s*['"]?(5|6|7|8)\d|fontSize:\s*['"]?clamp/i.test(rawCode);
    const repeatedGridSignals = (lowerCode.match(/repeat\(auto-fit|repeat\(3|gridtemplatecolumns/g) || []).length;

    let score = 0;
    if (hasHero) score += 1;
    if (hasCta) score += 1;
    if (hasProof) score += 1;
    if (hasProcess) score += 1;
    if (hasServices) score += 1;
    if (hasEditorialImage) score += 1;
    if (hasStrongImageDepth) score += 1;
    if (hasPremiumTone) score += 1;
    if (hasDarkOrEditorialMood) score += 1;
    if (hasLargeTypeOrHeroSizing) score += 1;
    if (repeatedGridSignals > 4 && selectedQuality === 'luxury') score -= 1;

    if (imageUrlMatches.length < 1) {
      return 'Generated design was rejected: Premium/Luxury/Enterprise pages need at least one real public image URL and a realistic image-led or editorial section with image-related code such as img, backgroundImage, photo, visual, figure, or editorial.';
    }

    if (score < 7) {
      return `Generated design was rejected: visual floor score ${score}/10 is below the Ground Zero baseline.`;
    }

    return '';
  };

  const isPremiumImageLedProblem = (problem) => {
    return /realistic image-led|image-led|editorial section|real public image URL/i.test(String(problem || ''));
  };

  const isInitialGeneratedCode = (code) => {
    const value = String(code || '').trim();

    return (
      !value ||
      value.startsWith('// Your generated code') ||
      value.startsWith('// Code panel cleared') ||
      value.startsWith('// Memory cleared')
    );
  };

  const validateWebsiteDepthOutput = (code) => {
    const isSimpleMultiPage = websiteDepth === 'Simple multi-page website';
    const isFullBusinessWebsite = websiteDepth === 'Full business website';

    if (!isSimpleMultiPage && !isFullBusinessWebsite) {
      return '';
    }

    const rawCode = String(code || '');
    const lowerCode = rawCode.toLowerCase();

    const hasPageState =
      /activePage/i.test(rawCode) &&
      /setActivePage/.test(rawCode) &&
      /\b(useState|React\.useState)\s*\(/.test(rawCode);

    const hasClickableNavigation =
      /onClick/i.test(rawCode) &&
      /setActivePage/i.test(rawCode);

    const hasHrefOnlyNavigation =
      /href=["']#/.test(rawCode) &&
      !/setActivePage/i.test(rawCode);

    const hasAny = (words) => words.some((word) => lowerCode.includes(word));

    const requiredSimplePages = [
      ['home', 'start'],
      ['about', 'about us'],
      ['services', 'service', 'offerings', 'solutions'],
      ['contact', 'book', 'schedule']
    ];

    const requiredFullPages = [
      ...requiredSimplePages,
      ['case', 'cases', 'case studies', 'results'],
      ['resources', 'insights', 'articles']
    ];

    const requiredPageGroups = isFullBusinessWebsite ? requiredFullPages : requiredSimplePages;
    const missingPageGroup = requiredPageGroups.find((pageGroup) => !hasAny(pageGroup));

    if (!hasPageState) {
      return 'This became a one-page site. Multi-page requires activePage and setActivePage.';
    }

    if (!hasClickableNavigation || hasHrefOnlyNavigation) {
      return 'Multi-page navigation is not working. It must use buttons with setActivePage.';
    }

    if (missingPageGroup) {
      return 'Multi-page output is missing one or more required pages.';
    }

    if (/empty page|coming soon|under construction|todo page|lorem ipsum/i.test(rawCode)) {
      return 'Multi-page pages need real content, not empty pages.';
    }

    return '';
  };

  const validateMultiPagePremiumFloor = (code) => {
    const selectedQuality = String(qualityLevel || '').toLowerCase();
    const isHighQuality = ['premium', 'luxury', 'enterprise'].includes(selectedQuality);
    const isMultiPage =
      websiteDepth === 'Simple multi-page website' ||
      websiteDepth === 'Full business website';

    if (!isHighQuality || !isMultiPage) {
      return '';
    }

    const rawCode = String(code || '');
    const lowerCode = rawCode.toLowerCase();

    if (/lorem ipsum|coming soon|under construction|empty page/i.test(rawCode)) {
      return 'Multi-page premium contains unfinished content.';
    }

    if (!/contact|book|schedule|call|booking|meeting/.test(lowerCode)) {
      return 'Multi-page premium needs a clear contact or booking path.';
    }

    return '';
  };

  const validateContactFormConfirmationUx = (code) => {
    const rawCode = String(code || '');
    const lowerCode = rawCode.toLowerCase();

    const hasContactForm =
      /<form/i.test(rawCode) &&
      /onSubmit/i.test(rawCode) &&
      /(name|email|message)/i.test(rawCode);

    if (!hasContactForm) {
      return '';
    }

    const formBlockMatch = rawCode.match(/<form[\s\S]*?<\/form>/i);
    const formBlock = formBlockMatch ? formBlockMatch[0] : '';
    const hasContactSuccessMessageInForm = /contactSuccessMessage/i.test(formBlock);
    const hasInlineStatusInForm = /role=["']status["']|aria-live=["']polite["']/i.test(formBlock);

    if (!hasContactSuccessMessageInForm || !hasInlineStatusInForm) {
      return 'Contact form confirmation must be inside the form: render contactSuccessMessage as an inline role="status" banner directly above the submit button inside <form>.';
    }

    const hasLocalSubmitState =
      /setSubmitted\s*\(\s*true\s*\)/i.test(rawCode) ||
      /setFormSubmitted\s*\(\s*true\s*\)/i.test(rawCode) ||
      /setSuccess\s*\(\s*true\s*\)/i.test(rawCode) ||
      /setIsSubmitted\s*\(\s*true\s*\)/i.test(rawCode) ||
      /setContactSuccessMessage\s*\(/i.test(rawCode);

    const hasVisibleSuccessLanguage =
      /thank you|thanks|success|submitted|prepared for review|noted in this preview|demo form|no email was sent|message will not be sent/i.test(rawCode);

    const hasInlineSuccessBanner =
      /successMessage|submitStatus|formStatus|successBanner|confirmationBanner/i.test(rawCode) ||
      /aria-live=["']polite["']|role=["']status["']|role=["']alert["']/i.test(rawCode) ||
      /(successMessage|submitStatus|formStatus|successBanner|confirmationBanner)[\s\S]{0,200}(thank you|thanks|success|prepared for review|noted in this preview|demo preview|no email was sent|message will not be sent)/i.test(rawCode);

    const hasHiddenContactConfirmationLayout =
      /contactSuccessMessage[\s\S]{0,260}(display:\s*['"]none['"]|visibility:\s*['"]hidden['"]|opacity:\s*0|position:\s*['"](absolute|fixed)['"]|overflow:\s*['"]hidden['"])/i.test(formBlock) ||
      /(display:\s*['"]none['"]|visibility:\s*['"]hidden['"]|opacity:\s*0|position:\s*['"](absolute|fixed)['"]|overflow:\s*['"]hidden['"])[\s\S]{0,260}contactSuccessMessage/i.test(formBlock);

    const hasBackendIntegration = /fetch\s*\(|axios|formspree|emailjs|supabase|firebase/i.test(rawCode);
    const hasMisleadingResponsePromise =
      /we review every inquiry|we will invite|we will respond|i will respond|i will be in touch|we have received|message has been sent|request an introductory meeting|submit inquiry|begin the conversation|confidential introductory conversation/i.test(rawCode);

    if (!hasLocalSubmitState || !hasVisibleSuccessLanguage) {
      return 'Contact form confirmation is too weak: generated contact forms must use contactForm, contactError, contactSuccessMessage, handleContactSubmit, and an inline role="status" banner that says no email was sent.';
    }

    if (!hasInlineSuccessBanner) {
      return 'Contact form confirmation is not visible enough: use an inline success banner inside the form area, preferably above the submit button, and keep the message honest that no email was sent.';
    }

    if (hasHiddenContactConfirmationLayout) {
      return 'Contact form confirmation is not visible enough: keep the success banner in the same visible area as the submit button and avoid clipped, fixed, absolute, hidden, or collapsed layout around the confirmation.';
    }

    if (hasMisleadingResponsePromise && !hasBackendIntegration) {
      return 'Contact form copy is misleading: local-only forms must not imply real delivery or a real response unless backend integration exists.';
    }

    return '';
  };

  const getValidationProblems = ({
    codeProblem,
    visualProblem,
    depthProblem,
    multiPagePremiumProblem,
    contactConfirmationProblem
  }) => {
    return [
      codeProblem,
      visualProblem,
      depthProblem,
      multiPagePremiumProblem,
      contactConfirmationProblem
    ].filter(Boolean);
  };

  const formatValidationProblems = (problems) => {
    if (!problems || problems.length === 0) return '';
    if (problems.length === 1) return problems[0];

    return `Generated code was rejected for ${problems.length} reasons:\n\n${problems
      .map((problem, index) => `${index + 1}. ${problem}`)
      .join('\n')}`;
  };

  const cleanGeneratedCode = (code) => {
    return String(code || '')
      .replace(/```jsx/g, '')
      .replace(/```javascript/g, '')
      .replace(/```js/g, '')
      .replace(/```react/g, '')
      .replace(/```/g, '')
      .trim();
  };

  const ensureReactImport = (code) => {
    const trimmedCode = String(code || '').trim();
    const hookNames = ['useState', 'useEffect', 'useMemo', 'useRef'];

    const bareHooks = hookNames.filter((hookName) => {
      const bareHookPattern = new RegExp(`(^|[^.\\w])${hookName}\\s*\\(`);
      return bareHookPattern.test(trimmedCode);
    });

    const uniqueBareHooks = [...new Set(bareHooks)];
    const hasAnyReactImport = /import\s+.*from\s+['"]react['"];?/.test(trimmedCode);
    const needsReactDefault =
      trimmedCode.includes('React.useState') ||
      trimmedCode.includes('React.useEffect') ||
      trimmedCode.includes('React.useMemo') ||
      trimmedCode.includes('React.useRef');

    if (hasAnyReactImport) {
      if (uniqueBareHooks.length === 0) {
        return trimmedCode;
      }

      const defaultAndNamedImportPattern = /import\s+React\s*,\s*\{([^}]*)\}\s+from\s+['"]react['"];?/;
      const defaultAndNamedMatch = trimmedCode.match(defaultAndNamedImportPattern);

      if (defaultAndNamedMatch) {
        const existingHooks = defaultAndNamedMatch[1]
          .split(',')
          .map((hookName) => hookName.trim())
          .filter(Boolean);
        const mergedHooks = [...new Set([...existingHooks, ...uniqueBareHooks])];

        return trimmedCode.replace(
          defaultAndNamedImportPattern,
          `import React, { ${mergedHooks.join(', ')} } from 'react';`
        );
      }

      const defaultOnlyImportPattern = /import\s+React\s+from\s+['"]react['"];?/;

      if (defaultOnlyImportPattern.test(trimmedCode)) {
        return trimmedCode.replace(
          defaultOnlyImportPattern,
          `import React, { ${uniqueBareHooks.join(', ')} } from 'react';`
        );
      }

      const namedOnlyImportPattern = /import\s+\{([^}]*)\}\s+from\s+['"]react['"];?/;
      const namedOnlyMatch = trimmedCode.match(namedOnlyImportPattern);

      if (namedOnlyMatch) {
        const existingHooks = namedOnlyMatch[1]
          .split(',')
          .map((hookName) => hookName.trim())
          .filter(Boolean);
        const mergedHooks = [...new Set([...existingHooks, ...uniqueBareHooks])];

        return trimmedCode.replace(
          namedOnlyImportPattern,
          `import React, { ${mergedHooks.join(', ')} } from 'react';`
        );
      }

      return trimmedCode;
    }

    if (uniqueBareHooks.length > 0) {
      return `import React, { ${uniqueBareHooks.join(', ')} } from 'react';\n\n${trimmedCode}`;
    }

    if (needsReactDefault) {
      return `import React from 'react';\n\n${trimmedCode}`;
    }

    return trimmedCode;
  };

  const shouldSaveVersion = (code) => {
    const trimmedCode = String(code || '').trim();

    return (
      trimmedCode &&
      !trimmedCode.startsWith('// Your generated code') &&
      !trimmedCode.startsWith('// Sending request') &&
      !trimmedCode.startsWith('// Code panel cleared') &&
      !trimmedCode.startsWith('// Memory cleared') &&
      !trimmedCode.startsWith('// Error') &&
      !trimmedCode.startsWith('// DeepSeek returned error') &&
      !trimmedCode.startsWith('// Network or app error')
    );
  };

  const hasRealGeneratedApp = (code) => {
    return shouldSaveVersion(code) && String(code || '').includes('export default function App');
  };

  const extractSuggestedPrompt = (reviewValue) => {
    const text = String(reviewValue || '');
    const match = text.match(/Suggested next prompt:\s*([\s\S]*)/i);

    if (!match) {
      return '';
    }

    return String(match[1] || '').trim();
  };

  const saveCurrentVersion = () => {
    if (!shouldSaveVersion(generatedCode)) {
      return;
    }

    const latestSavedVersion = versionHistory[versionHistory.length - 1];

    if (latestSavedVersion && latestSavedVersion.code === generatedCode) {
      return;
    }

    setVersionHistory([
      ...versionHistory,
      {
        code: generatedCode,
        chatHistory: chatHistory,
        appType: appType,
        goal: goal,
        designStyle: designStyle,
        templateRecipe: templateRecipe,
        qualityLevel: qualityLevel,
        pageFeeling: pageFeeling,
        websiteDepth: websiteDepth,
        editSection: editSection,
        projectName: projectName
      }
    ]);
  };

  const prepareCodeForPreview = (code) => {
    return String(code || '')
      .replace(/import\s+React[^;]*;?/g, '')
      .replace(/import\s+\{[^}]*\}\s+from\s+['"]react['"];?/g, '')
      .replace(/import\s+\*\s+as\s+React\s+from\s+['"]react['"];?/g, '')
      .replace(/export\s+default\s+function\s+App\s*\(/, 'function App(')
      .replace(/export\s+default\s+App\s*;?/g, '')
      .replace(/export\s+default\s+/g, '')
      .replace(/<\/script>/g, '<\\/script>')
      .trim();
  };

  const previewHtml = useMemo(() => {
    if (isGenerating) {
      return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generating preview</title>
    <style>
      * { box-sizing: border-box; }
      html, body, #root { margin: 0; min-height: 100%; width: 100%; }
      body {
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        color: #e5e7eb;
      }
      .loading-wrap {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
      }
      .loading-card {
        max-width: 420px;
        width: 100%;
        border-radius: 24px;
        padding: 28px;
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid rgba(148, 163, 184, 0.22);
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
        text-align: center;
      }
      .spinner {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        border: 4px solid rgba(255, 255, 255, 0.18);
        border-top-color: #60a5fa;
        margin: 0 auto 18px;
        animation: spin 1s linear infinite;
      }
      h1 {
        font-size: 22px;
        margin: 0 0 8px;
      }
      p {
        margin: 0;
        color: #cbd5e1;
        line-height: 1.5;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="loading-wrap">
      <div class="loading-card">
        <div class="spinner"></div>
        <h1>Generating your app...</h1>
        <p>Please wait while Mini-Lovable updates the preview.</p>
      </div>
    </div>
  </body>
</html>
      `;
    }

    const hasValidGeneratedApp =
      shouldSaveVersion(generatedCode) &&
      String(generatedCode || '').includes('export default function App');

    if (!hasValidGeneratedApp) {
      return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mini-Lovable ready</title>
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; width: 100%; }
      body {
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: radial-gradient(circle at top left, #172033, #05070a 58%);
        color: #e5e7eb;
      }
      .empty-wrap {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 32px;
      }
      .empty-card {
        max-width: 560px;
        width: 100%;
        border: 1px solid rgba(148, 163, 184, 0.24);
        background: rgba(15, 23, 42, 0.78);
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34);
        border-radius: 24px;
        padding: 32px;
      }
      .eyebrow {
        color: #93c5fd;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin-bottom: 12px;
      }
      h1 {
        font-size: clamp(28px, 5vw, 44px);
        line-height: 1.05;
        margin: 0 0 14px;
      }
      p {
        color: #cbd5e1;
        line-height: 1.6;
        margin: 0 0 18px;
      }
      .steps {
        display: grid;
        gap: 10px;
        margin-top: 22px;
      }
      .step {
        border: 1px solid rgba(148, 163, 184, 0.18);
        border-radius: 14px;
        padding: 12px 14px;
        color: #d1d5db;
        background: rgba(2, 6, 23, 0.38);
      }
    </style>
  </head>
  <body>
    <main class="empty-wrap">
      <section class="empty-card">
        <div class="eyebrow">Mini-Lovable is ready</div>
        <h1>No app generated yet</h1>
        <p>Use the prompt box on the left, or click the standard test prompt shortcut, then press Generate / Update.</p>
        <div class="steps">
          <div class="step">1. Choose app settings</div>
          <div class="step">2. Write or load a prompt</div>
          <div class="step">3. Click Generate / Update</div>
        </div>
      </section>
    </main>
  </body>
</html>
      `;
    }

    const previewCode = prepareCodeForPreview(generatedCode);

    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
      * { box-sizing: border-box; }
      html, body, #root { margin: 0; min-height: 100%; width: 100%; }
      body {
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: white;
      }
      .preview-error {
        font-family: monospace;
        color: #fed7aa;
        background: #431407;
        padding: 20px;
        min-height: 100vh;
        white-space: pre-wrap;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      try {
        const { useState, useEffect, useMemo, useRef } = React;

        ${previewCode}

        if (typeof App !== 'function') {
          throw new Error('Preview could not find a valid App function. The generated code must include: export default function App() { ... }');
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
      } catch (error) {
        document.getElementById('root').innerHTML =
          '<div class="preview-error">' +
          'Preview needs attention:\\n\\n' +
          error.message +
          '</div>';
      }
    </script>
  </body>
</html>
    `;
  }, [generatedCode, isGenerating]);

  const sanitizeFilenamePart = (value, fallback = 'GeneratedApp') => {
    const cleaned = String(value || '')
      .trim()
      .replace(/[^a-zA-Z0-9_-]+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    return cleaned || fallback;
  };

  const getTimestamp = () => {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');

    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
  };

  const getExportFilename = (fileType, extension) => {
    const safeProjectName = sanitizeFilenamePart(projectName);
    const safeFileType = sanitizeFilenamePart(fileType, 'Export');

    return `${safeProjectName}_${safeFileType}_${getTimestamp()}.${extension}`;
  };

  const downloadFile = (filename, content, type = 'text/plain') => {
    const file = new Blob([content], { type });
    const url = URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleBackupToolCode = () => {
    try {
      const filename = `LovableLite_ToolBackup_${getTimestamp()}.jsx`;
      downloadFile(filename, toolSourceCode, 'text/javascript');
      setStatus('Mini-Lovable Tool master backup downloaded');
    } catch (error) {
      setStatus('Error: Could not backup Mini-Lovable Tool');
      alert('Could not automatically backup Mini-Lovable. Open src/App.jsx, press Ctrl + A, Ctrl + C, paste into Notepad, and save as a .jsx file.');
    }
  };

  const handleDownloadToolTxt = () => {
    try {
      const filename = `MiniLovable_Source_${getTimestamp()}.txt`;
      downloadFile(filename, toolSourceCode, 'text/plain');
      setStatus('Mini-Lovable Tool source TXT downloaded');
    } catch (error) {
      setStatus('Error: Could not download Mini-Lovable Tool TXT');
      alert('Could not download Mini-Lovable as TXT.');
    }
  };

  const handleImportGeneratedApp = async (event) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      return;
    }

    try {
      const fileText = await file.text();
      const importedCode = cleanGeneratedCode(fileText);
      const importedName = file.name.replace(/\.(jsx|js|txt)$/i, '').replace(/_App_.*$/i, '').replace(/_v\d+.*$/i, '');

      if (!importedCode.includes('export default function App')) {
        setStatus('Error: imported file must contain export default function App');
        event.target.value = '';
        return;
      }

      if (shouldSaveVersion(generatedCode)) {
        saveCurrentVersion();
      }

      setGeneratedCode(importedCode);
      setProjectName(sanitizeFilenamePart(importedName, projectName));
      setChatHistory([
        ...chatHistory,
        {
          role: 'assistant',
          content: importedCode
        }
      ]);
      setStatus(`Imported generated app: ${file.name}`);
      setActiveView('preview');
      event.target.value = '';
    } catch (error) {
      setStatus('Error: could not import generated App.jsx');
      event.target.value = '';
    }
  };

  const createZipBlob = (files) => {
    const encoder = new TextEncoder();
    const fileRecords = [];
    const centralRecords = [];
    let offset = 0;

    const crcTable = (() => {
      const table = [];

      for (let n = 0; n < 256; n += 1) {
        let c = n;

        for (let k = 0; k < 8; k += 1) {
          c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        }

        table[n] = c >>> 0;
      }

      return table;
    })();

    const crc32 = (bytes) => {
      let crc = 0xffffffff;

      for (let i = 0; i < bytes.length; i += 1) {
        crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
      }

      return (crc ^ 0xffffffff) >>> 0;
    };

    const uint16 = (value) => {
      const buffer = new ArrayBuffer(2);
      new DataView(buffer).setUint16(0, value, true);
      return new Uint8Array(buffer);
    };

    const uint32 = (value) => {
      const buffer = new ArrayBuffer(4);
      new DataView(buffer).setUint32(0, value, true);
      return new Uint8Array(buffer);
    };

    files.forEach((file) => {
      const nameBytes = encoder.encode(file.name);
      const dataBytes = encoder.encode(file.content);
      const crc = crc32(dataBytes);

      const localHeader = new Uint8Array([
        ...uint32(0x04034b50),
        ...uint16(20),
        ...uint16(0),
        ...uint16(0),
        ...uint16(0),
        ...uint16(0),
        ...uint32(crc),
        ...uint32(dataBytes.length),
        ...uint32(dataBytes.length),
        ...uint16(nameBytes.length),
        ...uint16(0),
        ...nameBytes
      ]);

      const centralHeader = new Uint8Array([
        ...uint32(0x02014b50),
        ...uint16(20),
        ...uint16(20),
        ...uint16(0),
        ...uint16(0),
        ...uint16(0),
        ...uint16(0),
        ...uint32(crc),
        ...uint32(dataBytes.length),
        ...uint32(dataBytes.length),
        ...uint16(nameBytes.length),
        ...uint16(0),
        ...uint16(0),
        ...uint16(0),
        ...uint16(0),
        ...uint32(0),
        ...uint32(offset),
        ...nameBytes
      ]);

      fileRecords.push(localHeader, dataBytes);
      centralRecords.push(centralHeader);
      offset += localHeader.length + dataBytes.length;
    });

    const centralDirectorySize = centralRecords.reduce((sum, record) => sum + record.length, 0);
    const centralDirectoryOffset = offset;

    const endRecord = new Uint8Array([
      ...uint32(0x06054b50),
      ...uint16(0),
      ...uint16(0),
      ...uint16(files.length),
      ...uint16(files.length),
      ...uint32(centralDirectorySize),
      ...uint32(centralDirectoryOffset),
      ...uint16(0)
    ]);

    return new Blob([...fileRecords, ...centralRecords, endRecord], {
      type: 'application/zip'
    });
  };

  const downloadZip = (filename, files) => {
    const zipBlob = createZipBlob(files);
    const url = URL.createObjectURL(zipBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleUseStandardTestPrompt = () => {
    setProjectName('TestConsultant');
    localStorage.setItem('lovable_lite_project_name', 'TestConsultant');
    setAppType('Landing page');
    setDesignStyle('Luxury landing page');
    setTemplateRecipe('Consultant website');
    localStorage.setItem('lovable_lite_template_recipe', 'Consultant website');
    setQualityLevel('Luxury');
    localStorage.setItem('lovable_lite_quality_level', 'Luxury');
    setPageFeeling('More exclusive');
    localStorage.setItem('lovable_lite_page_feeling', 'More exclusive');
    setEditSection('Whole app');
    localStorage.setItem('lovable_lite_edit_section', 'Whole app');
    setPrompt(standardTestPrompt);
    setStatus(`Standard test prompt loaded. Website depth kept as: ${websiteDepth}`);
  };

  const repairContactFormWithDeepSeek = async ({ originalCode, originalPrompt, source }) => {
    const repairMessages = [
      {
        role: 'system',
        content: `You are a senior React developer repairing one App.jsx file.

Return only raw React code for one complete App.jsx file.
Do not use markdown, backticks, explanations, or comments before/after the code.
Keep the existing design, layout, copy, navigation, and all unrelated functionality unchanged.
Fix only the contact form confirmation UX.

Mandatory repair rules:
- If there is a contact form, it must use top-level state:
  const [contactForm, setContactForm] = React.useState({ name: '', email: '', message: '' });
  const [contactError, setContactError] = React.useState('');
  const [contactSuccessMessage, setContactSuccessMessage] = React.useState('');
- It must use this handler name:
  handleContactSubmit
- The form must use onSubmit={handleContactSubmit}
- On submit, call event.preventDefault()
- If name, email, or message is missing, set contactError to:
  Please fill in name, email, and message before submitting.
- On valid submit, set contactSuccessMessage exactly to:
  Thank you. This demo preview recorded your enquiry locally. No email was sent.
- Keep the form fields visible after submit.
- Render contactSuccessMessage as an inline banner inside the form, directly above the submit button.
- The success banner must be inside the <form>, directly above the submit button.
- Do not render the success banner above the <form>.
- Keep the success banner in the same visible area as the submit button and do not hide it in a clipped, fixed, absolute, hidden, or collapsed container.
- The banner must include:
  role="status"
  aria-live="polite"
- Do not replace the whole form with a thank-you screen.
- Do not claim email was sent.
- Do not promise a real response.
- Remove or rewrite copy that implies real follow-up.
- Replace "we will respond", "we will invite", "I will be in touch", "submit inquiry", and similar with local-only preview wording.
- Button text should be "Record enquiry locally".
- Contact text should say this is a demo/local preview, not a real inquiry workflow.
- Remove fake named testimonials and unverifiable statistics if present.
- Do not add backend integration.
- Do not use external libraries.
- Use inline styles only.
- Ensure the final code exports default function App.
- Ensure JSX syntax is valid.`
      },
      {
        role: 'user',
        content: `Original user prompt:
${originalPrompt || 'No active prompt.'}

Repair source:
${source}

Current generated App.jsx that failed contact form validation:
${originalCode}

Return the complete repaired App.jsx only.`
      }
    ];

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: repairMessages,
        max_tokens: 8192,
        temperature: 0.15
      })
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`DeepSeek repair returned ${response.status}: ${responseText}`);
    }

    const data = JSON.parse(responseText);

    if (!data.choices || data.choices.length === 0) {
      throw new Error('DeepSeek repair response did not contain code.');
    }

    return cleanGeneratedCode(data.choices[0].message.content);
  };

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      setStatus('Error: API key and prompt are required');
      alert('Please enter both your API key and a prompt.');
      return;
    }

    setIsGenerating(true);
    setStatus('Generating code...');
    setActiveView('preview');

    const newUserMessage = {
      role: 'user',
      content: prompt
    };

    const apiMessages = [
      {
        role: 'system',
        content:
          `You are a senior product designer and React frontend engineer.

Return only raw React code for one complete App.jsx file.
Do not use markdown, backticks, or explanations.
The code must define and export: export default function App() { ... }.
Do not import external libraries.
Use inline styles only.
If the user asks for changes, update the previous code and return the complete updated App.jsx code.

Important completion rule:
Return a complete, valid, shorter App.jsx rather than a long unfinished file.
Keep code compact enough to finish.

Design quality rules:
- Make every result look premium, modern, and intentional.
- Use strong visual hierarchy, polished spacing, clear CTAs, real-feeling copy, and useful structure.
- Avoid boring default white pages, cramped layouts, weak contrast, generic placeholder text, and emoji-led design.
- When building landing pages, include hero, services or benefits, proof, CTA, and footer unless the user asks otherwise.
- For premium websites, use mature visual language, realistic imagery, editorial layout, and high-end brand feeling.

Generated website/app copy must be in English by default. Do not write Swedish copy unless the user explicitly asks for Swedish. If the user prompt is Swedish but does not explicitly require Swedish output, translate the intent and generate the website/app in English.

User type:
The user is not a programmer. The generated app should feel practical and ready to use.
- For contact forms, successful submit must show a clearly visible confirmation banner or scroll the confirmation into view. Users should never feel that clicking submit did nothing.

Website depth rules:
- One-page website or Long landing page: keep content on one page with clear sections and working buttons.
- Simple multi-page website: use const [activePage, setActivePage] = React.useState("home"). Include Home, About, Services, and Contact.
- Full business website: use const [activePage, setActivePage] = React.useState("home"). Include Home, About, Services, Cases, Resources, and Contact.
- Multi-page navigation must use buttons with onClick={() => setActivePage("pageName")}.
- Do not use React Router.
- Do not use href-only navigation for multi-page mode.
- Every page must have real content, but keep each page concise.
- For multi-page mode, use one shared layout/nav and conditional rendering for page content.

Edit section rules:
- Selected edit target: ${editSection}
- Edit target instruction: ${getEditSectionInstruction()}
- If selected edit target is Whole app, update the whole app normally.
- If selected edit target is not Whole app and previous code exists in the conversation, change only that selected part.
- When editing one section, preserve every other page, section, layout, button, state variable, navigation handler, and data item unless the user explicitly asks otherwise.
- Still return the entire complete App.jsx file. Do not return only the changed section.
- If there is no previous generated app yet, treat the edit target as emphasis while still creating a complete app.

Premium multi-page design floor:
- Home should feel as premium as a strong long landing page, not like a sparse app shell.
- Home first screen should show meaningful content early: headline, subcopy, CTA, proof/metrics, and a visual panel or image.
- Avoid mostly empty black/dark hero screens.
- Prefer a split or layered editorial hero with a premium image, boardroom/architecture/office visual, or image-like panel.
- About, Services, and Contact should each feel like designed pages with layout, visual hierarchy, proof, CTA, and at least one visual or strong editorial panel where useful.
- Contact visuals should feel executive, premium, architectural, or advisory-related.
- Keep the code compact and complete.

${getSmartBriefInstruction()}

${getQualityGateInstruction()}

${getVisualQAInstruction()}

${getOutputProtectionInstruction()}

${getGroundZeroScoringInstruction()}

${getContactFormSafetyInstruction()}

${getContactFormCodeRecipeInstruction()}

${getReactRuntimeSafetyInstruction()}
- If you create a contact form, you must use the contact form recipe exactly, including contactForm, contactError, contactSuccessMessage, handleContactSubmit, role="status", aria-live="polite", and the exact "No email was sent" success wording.
- For multi-page apps inside one App.jsx, avoid nested page components rendered as <ContactPage /> from inside App. Use direct render helper functions or external child components so forms do not remount while typing.
- Contact pages must be responsive in the preview iframe. The form must not be clipped, horizontally hidden, or placed off-screen.

Preserve existing functionality rules:
- When modifying an existing app, do not rewrite unrelated code.
- Do not remove existing features, screens, buttons, data, flows, or working logic unless asked.
- Make the smallest safe change needed.
- Ensure all buttons still have working handlers.
- Ensure JSX syntax is valid.
- Return one complete corrected App.jsx file only.

Selected app type: ${appType}
App type instruction: ${getAppTypeInstruction()}

Selected goal: ${goal}
Goal instruction: ${getGoalInstruction()}

Selected design style: ${designStyle}
Design style instruction: ${getDesignStyleInstruction()}

Selected template recipe: ${templateRecipe}
Template recipe instruction: ${getTemplateRecipeInstruction()}

Selected quality level: ${qualityLevel}
Quality level instruction: ${getQualityLevelInstruction()}

Selected page feeling: ${pageFeeling}
Page feeling instruction: ${getPageFeelingInstruction()}

Selected website depth: ${websiteDepth}
Website depth instruction: ${getWebsiteDepthInstruction()}

Selected edit target: ${editSection}
Edit target instruction: ${getEditSectionInstruction()}

Ground Zero quality rule:
For Premium, Luxury, and Enterprise outputs, never return a design below the saved Mini-Lovable Ground Zero baseline. Include strong hero, refined typography, premium spacing, clear CTA, realistic imagery or image-like visual blocks, trust/proof, and mature brand feeling.`
      },
      ...chatHistory,
      newUserMessage
    ];

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: apiMessages,
          max_tokens: 8192,
          temperature: 0.5
        })
      });

      const responseText = await response.text();

      if (!response.ok) {
        setGeneratedCode(`// DeepSeek returned error ${response.status}:\n${responseText}`);
        setStatus(`Error: DeepSeek returned ${response.status}`);
        return;
      }

      const data = JSON.parse(responseText);

      if (data.choices && data.choices.length > 0) {
        const rawAiResponseCode = data.choices[0].message.content;
        const aiResponseCode = cleanGeneratedCode(rawAiResponseCode);
        const codeProblem = validateGeneratedAppCode(aiResponseCode);
        const visualProblem = validatePremiumVisualFloor(aiResponseCode);
        const depthProblem = validateWebsiteDepthOutput(aiResponseCode);
        const multiPagePremiumProblem = validateMultiPagePremiumFloor(aiResponseCode);
        const contactConfirmationProblem = validateContactFormConfirmationUx(aiResponseCode);
        const validationProblems = getValidationProblems({
          codeProblem,
          visualProblem,
          depthProblem,
          multiPagePremiumProblem,
          contactConfirmationProblem
        });
        const fullProblemMessage = formatValidationProblems(validationProblems);
        const isFirstGeneratedApp = isInitialGeneratedCode(generatedCode);
        const onlyImageEditorialProblem =
          validationProblems.length === 1 &&
          validationProblems[0] === visualProblem &&
          isPremiumImageLedProblem(visualProblem);
        const onlyContactConfirmationProblem =
          validationProblems.length === 1 && Boolean(contactConfirmationProblem);

        if (isFirstGeneratedApp && onlyImageEditorialProblem) {
          saveCurrentVersion();

          setGeneratedCode(aiResponseCode);
          setStatus('First version created. Visual quality should be improved next.');
          setActiveView('preview');

          setChatHistory([
            ...chatHistory,
            newUserMessage,
            {
              role: 'assistant',
              content: aiResponseCode
            }
          ]);

          setPrompt('');
          return;
        }

        if (onlyContactConfirmationProblem) {
          setStatus('Repairing contact form confirmation...');

          try {
            const repairedCode = await repairContactFormWithDeepSeek({
              originalCode: aiResponseCode,
              originalPrompt: prompt,
              source: 'Generate / Update'
            });
            const repairedCodeProblem = validateGeneratedAppCode(repairedCode);
            const repairedVisualProblem = validatePremiumVisualFloor(repairedCode);
            const repairedDepthProblem = validateWebsiteDepthOutput(repairedCode);
            const repairedMultiPagePremiumProblem = validateMultiPagePremiumFloor(repairedCode);
            const repairedContactConfirmationProblem = validateContactFormConfirmationUx(repairedCode);
            const repairedValidationProblems = getValidationProblems({
              codeProblem: repairedCodeProblem,
              visualProblem: repairedVisualProblem,
              depthProblem: repairedDepthProblem,
              multiPagePremiumProblem: repairedMultiPagePremiumProblem,
              contactConfirmationProblem: repairedContactConfirmationProblem
            });

            if (repairedValidationProblems.length === 0) {
              saveCurrentVersion();

              setGeneratedCode(repairedCode);
              setStatus('Success after contact form repair');
              setActiveView('preview');

              setChatHistory([
                ...chatHistory,
                newUserMessage,
                {
                  role: 'assistant',
                  content: repairedCode
                }
              ]);

              setPrompt('');
              return;
            }

            const repairedFullProblemMessage = formatValidationProblems(repairedValidationProblems);
            setStatus(repairedFullProblemMessage);
            setActiveView('roadmap');
            alert(`${repairedFullProblemMessage}\n\nContact form repair was attempted, but previous code was kept so the preview does not break.`);
            return;
          } catch (error) {
            setStatus('Contact form repair failed');
            setActiveView('roadmap');
            alert(`Contact form repair failed: ${error.message}`);
            return;
          }
        }

        if (validationProblems.length > 0) {
          if (codeProblem && codeProblem.includes('missing export default function App')) {
            const missingExportMessage =
              'DeepSeek did not return a complete App.jsx. Try Generate / Update first, or try Build Selected Step again.';
            setStatus(missingExportMessage);
            setActiveView('roadmap');
            alert(missingExportMessage);
            return;
          }

          if (visualProblem && visualProblem.includes('too many emoji icons')) {
            const emojiMessage =
              'DeepSeek returned a design with too many emojis for Premium/Luxury mode. Try Build Selected Step again, or switch Quality level to Standard.';
            setStatus(emojiMessage);
            setActiveView('roadmap');
            alert(emojiMessage);
            return;
          }

          if (
            validationProblems.length === 1 &&
            isPremiumImageLedProblem(visualProblem)
          ) {
            const imageProblemMessage =
              'DeepSeek returned a design without a strong image-led/editorial premium section. Add one real public image URL (preferably Unsplash) and image-related code such as img, backgroundImage, photo, visual, figure, or editorial, then try Build Selected Step again or switch Quality level to Standard.';
            setStatus(imageProblemMessage);
            setActiveView('roadmap');
            alert(imageProblemMessage);
            return;
          }

          if (depthProblem && depthProblem.includes('This became a one-page site. Multi-page requires activePage and setActivePage.')) {
            const multiPageModeMessage =
              'DeepSeek returned a one-page design even though multi-page mode is selected. You are still on Roadmap. Try Build / Improve Step again, or switch Website depth to Long landing page.';
            setStatus(multiPageModeMessage);
            setActiveView('roadmap');
            alert(multiPageModeMessage);
            return;
          }

          if (validationProblems.length === 1 && contactConfirmationProblem) {
            setStatus(contactConfirmationProblem);
            setActiveView('roadmap');
            alert(`${contactConfirmationProblem} Previous code was kept so the preview does not break.`);
            return;
          }

          const problem = fullProblemMessage;
          setStatus(problem);
          setActiveView('roadmap');
          alert(`${problem} Previous code was kept so the preview does not break.`);
          return;
        }

        saveCurrentVersion();

        setGeneratedCode(aiResponseCode);
        setStatus('Success');
        setActiveView('preview');

        setChatHistory([
          ...chatHistory,
          newUserMessage,
          {
            role: 'assistant',
            content: aiResponseCode
          }
        ]);

        setPrompt('');
      } else {
        setGeneratedCode('// Error: DeepSeek response did not contain valid code:\n' + JSON.stringify(data, null, 2));
        setStatus('Error: Invalid DeepSeek response');
      }
    } catch (error) {
      setGeneratedCode('// Network or app error:\n' + error.message);
      setStatus('Error: Network or app problem');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateRoadmap = async () => {
    if (!apiKey || !prompt) {
      setStatus('Error: API key and prompt are required for roadmap');
      alert('Please enter both your API key and a prompt before creating a roadmap.');
      return;
    }

    setIsPlanning(true);
    setStatus('Creating roadmap...');
    setActiveView('roadmap');
    setRoadmap('Creating roadmap...');

    const plannerMessages = [
      {
        role: 'system',
        content: `You are a Planner Agent for Mini-Lovable.

Create a roadmap only.
Do not write React code.
Do not return App.jsx.
Do not modify the existing app.
Roadmap text should be in English by default. Do not write Swedish unless the user explicitly asks for Swedish.
Write for a beginner / non-programmer.
Do not use emojis.
Avoid markdown clutter.
Do not use code fences.
Do not use tables.
Do not create long nested bullet lists.
Keep it clear, calm, practical, and short.

Use this exact structure:
Goal:
Recommended structure:
Key pages or sections:
Design direction:
Step-by-step build plan:
Acceptance checklist:

The step-by-step build plan should have 6 to 12 clear steps.`
      },
      {
        role: 'user',
        content: `User prompt:
${prompt}

Current Mini-Lovable settings:
- App type: ${appType}
- Design style: ${designStyle}
- Template recipe: ${templateRecipe}
- Quality level: ${qualityLevel}
- Page feeling: ${pageFeeling}
- Website depth: ${websiteDepth}
- Edit target: ${editSection}

Create a beginner-friendly roadmap for this request.
Keep it useful, specific, and easy to follow.
Do not include code.`
      }
    ];

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: plannerMessages,
          max_tokens: 1800,
          temperature: 0.35
        })
      });

      const responseText = await response.text();

      if (!response.ok) {
        setRoadmap(`DeepSeek returned error ${response.status}:\n${responseText}`);
        setStatus(`Error: DeepSeek returned ${response.status}`);
        return;
      }

      const data = JSON.parse(responseText);

      if (data.choices && data.choices.length > 0) {
        const plannerText = String(data.choices[0].message.content || '')
          .replace(/```/g, '')
          .trim();

        setRoadmap(plannerText || 'No roadmap was returned.');
        setStatus('Roadmap created');
        setActiveView('roadmap');
      } else {
        setRoadmap('Error: DeepSeek response did not contain a roadmap:\n' + JSON.stringify(data, null, 2));
        setStatus('Error: Invalid DeepSeek response');
      }
    } catch (error) {
      setRoadmap('Network or app error:\n' + error.message);
      setStatus('Error: Network or app problem');
    } finally {
      setIsPlanning(false);
    }
  };

  const handleBuildSelectedStep = async () => {
    const stepToBuild = String(selectedRoadmapStep || '').trim();
    const currentRoadmap = String(roadmap || '').trim();
    const hasExistingApp = hasRealGeneratedApp(generatedCode);
    const returnToRoadmapWithWarning = (
      statusMessage,
      alertMessage = statusMessage,
      recoveryMessage = 'Build paused for safety. This is not a crash. Review the warning, adjust the contact form copy so it clearly says the form is demo/local-only and does not imply real delivery, then try Build / Improve Step again.'
    ) => {
      setStatus(statusMessage);
      setBuildRecoveryMessage(recoveryMessage);
      setActiveView('roadmap');
      alert(alertMessage);
    };

    if (!apiKey) {
      setStatus('Error: API key is required for selected step');
      alert('Please enter your DeepSeek API key before building a roadmap step.');
      return;
    }

    if (!currentRoadmap || currentRoadmap === emptyRoadmapText || currentRoadmap === 'Creating roadmap...') {
      setStatus('Error: roadmap is required');
      alert('Create a roadmap first, then choose which step to build.');
      return;
    }

    if (!stepToBuild) {
      setStatus('Error: selected roadmap step is required');
      alert('Enter a roadmap step, for example: 1 or Hero section.');
      return;
    }

    setIsBuildingStep(true);
    setBuildRecoveryMessage('');
    setStatus(`Building step ${stepToBuild}... Stay on Roadmap while Mini-Lovable works.`);
    setActiveView('roadmap');

    const stepMessages = [
      {
        role: 'system',
        content: `Return one complete App.jsx file only.
The first non-whitespace text in your response must be:
import React
or:
export default function App()

Must include exactly:
export default function App()

Do not return explanations.
Do not return planning text.
Do not return comments before the code.
Do not return only a section.
Do not return only a component.
Do not return markdown.
Do not return code fences.
Do not return commentary before or after the code.
Do not say what you changed.
Do not include any text outside the App.jsx code.

You are a senior React frontend engineer and product designer for Mini-Lovable.

Build from one selected roadmap step.
Do not import external libraries.
Use inline styles only.
Do not return partial code.

Website depth rules (follow exactly):
- If Website depth is "Simple multi-page website", App.jsx must include internal React state:
  const [activePage, setActivePage] = useState("home")
  or React.useState("home")
- For "Simple multi-page website", include clickable navigation with onClick={() => setActivePage("home")} or equivalent.
- For "Simple multi-page website", include Home, About, Services, and Contact pages.
- For "Simple multi-page website", do not create a one-page-only layout.
- For all multi-page modes, do not use React Router.
- For all multi-page modes, do not use href-only navigation.
- If Website depth is "Full business website", include Home, About, Services, Cases, Resources, and Contact.
- For "Full business website", use activePage and setActivePage.
- For "Full business website", use clickable navigation.
- For "Full business website", do not use React Router.
- For "Full business website", do not use href-only navigation.

Do not use emojis anywhere in the generated App.jsx.
Do not use emoji icons.
Do not use emoji bullets.
Do not use unicode pictograms as icons.
For Premium, Luxury, and Enterprise, use text labels, numbers, subtle shapes, image panels, cards, lines, spacing, typography, or small geometric marks instead of emojis.
For Premium, Luxury, and Enterprise, include at least one realistic image-led or editorial visual section.
Use either a real Unsplash image URL or a strong image-like editorial panel.
Prefer executive office, architecture, boardroom, abstract premium interior, strategy workshop, or high-end consulting imagery for consultant websites.
The generated code should include image-related code such as backgroundImage, img, image panel, photo panel, or editorial visual block.
Do not use emojis as a substitute for visual design.
The generated code must pass the existing premium visual validator.

If an existing App.jsx is provided:
- Update only the selected roadmap step.
- Update the selected roadmap step in a visibly noticeable way.
- If the selected step already exists, improve that section clearly instead of returning nearly identical code.
- Preserve unrelated sections and functionality.
- Keep the app complete and working.
- Return the full updated App.jsx file.

If no existing App.jsx is provided:
- Create a complete App.jsx from the full roadmap and selected step.
- If Website depth is One-page website or Long landing page, create a one-page layout.
- If Website depth is Simple multi-page website, create a multi-page app with activePage and setActivePage.
- If Website depth is Full business website, create a multi-page app with activePage and setActivePage.
- Never create a one-page-only layout when the selected Website depth is Simple multi-page website or Full business website.

Generated website/app copy must be in English by default. Do not write Swedish copy unless the user explicitly asks for Swedish. If the user prompt is Swedish but does not explicitly require Swedish output, translate the intent and generate the website/app in English.
The user is not a programmer, so make the result practical and ready to paste into Bolt.
- For contact forms, successful submit must show a clearly visible confirmation banner or scroll the confirmation into view. Users should never feel that clicking submit did nothing.

${getContactFormSafetyInstruction()}

${getContactFormCodeRecipeInstruction()}

${getReactRuntimeSafetyInstruction()}
- If you create a contact form, you must use the contact form recipe exactly, including contactForm, contactError, contactSuccessMessage, handleContactSubmit, role="status", aria-live="polite", and the exact "No email was sent" success wording.
- For multi-page apps inside one App.jsx, avoid nested page components rendered as <ContactPage /> from inside App. Use direct render helper functions or external child components so forms do not remount while typing.
- Contact pages must be responsive in the preview iframe. The form must not be clipped, horizontally hidden, or placed off-screen.

Validation rules:
- JSX syntax must be valid.
- All referenced variables and handlers must exist.
- Navigation must work if multi-page mode is selected.
- Existing roadmap text must not appear as visible app content unless it belongs naturally in the generated page.`
      },
      {
        role: 'user',
        content: `Original user prompt:
${prompt || 'No separate user prompt is currently written.'}

Roadmap:
${currentRoadmap}

Selected roadmap step to build:
${stepToBuild}

Current Mini-Lovable settings:
- App type: ${appType}
- Goal: ${goal}
- Design style: ${designStyle}
- Template recipe: ${templateRecipe}
- Quality level: ${qualityLevel}
- Page feeling: ${pageFeeling}
- Website depth: ${websiteDepth}
- Edit target: ${editSection}

Existing generated App.jsx:
${hasExistingApp ? generatedCode : 'No existing generated app yet.'}

Task:
${hasExistingApp
  ? 'Update the existing App.jsx only for the selected roadmap step in a visibly noticeable way. If the selected step already exists, improve that section clearly instead of returning nearly identical code. Preserve unrelated sections and functionality, and return the complete updated App.jsx.'
  : 'Create a complete App.jsx from the full roadmap, with extra focus on the selected roadmap step. Follow the selected Website depth exactly. If multi-page is selected, use activePage and setActivePage. For Premium/Luxury/Enterprise, include at least one realistic image-led or editorial visual section. This is the first generated app. Create the full complete App.jsx now. Do not explain. Do not summarize. Return only the complete App.jsx code.'}`
      }
    ];

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: stepMessages,
          max_tokens: 8192,
          temperature: 0.2
        })
      });

      const responseText = await response.text();

      if (!response.ok) {
        returnToRoadmapWithWarning(
          `Build paused for safety: DeepSeek returned ${response.status}. This is not a crash. Previous code was kept. Adjust the contact-form copy, then try Build / Improve Step again.`,
          `DeepSeek returned error ${response.status}. Previous code was kept.\n\nBuild paused for safety. This is not a crash. Adjust the contact-form copy, then try Build / Improve Step again.`
        );
        return;
      }

      const data = JSON.parse(responseText);

      if (data.choices && data.choices.length > 0) {
        const rawAiResponseCode = data.choices[0].message.content;
        const aiResponseCode = cleanGeneratedCode(rawAiResponseCode);
        const codeProblem = validateGeneratedAppCode(aiResponseCode);
        const visualProblem = validatePremiumVisualFloor(aiResponseCode);
        const depthProblem = validateWebsiteDepthOutput(aiResponseCode);
        const multiPagePremiumProblem = validateMultiPagePremiumFloor(aiResponseCode);
        const contactConfirmationProblem = validateContactFormConfirmationUx(aiResponseCode);
        const validationProblems = getValidationProblems({
          codeProblem,
          visualProblem,
          depthProblem,
          multiPagePremiumProblem,
          contactConfirmationProblem
        });
        const fullProblemMessage = formatValidationProblems(validationProblems);
        const isFirstGeneratedApp = !hasExistingApp && isInitialGeneratedCode(generatedCode);
        const onlyImageEditorialProblem =
          validationProblems.length === 1 &&
          validationProblems[0] === visualProblem &&
          isPremiumImageLedProblem(visualProblem);
        const onlyContactConfirmationProblem =
          validationProblems.length === 1 && Boolean(contactConfirmationProblem);

        if (isFirstGeneratedApp && onlyImageEditorialProblem) {
          saveCurrentVersion();

          setGeneratedCode(aiResponseCode);
          setBuildRecoveryMessage('');
          setStatus(`Built first version from step ${stepToBuild}. Visual quality should be improved next.`);
          setActiveView('preview');

          setChatHistory([
            ...chatHistory,
            {
              role: 'user',
              content: `Build roadmap step: ${stepToBuild}`
            },
            {
              role: 'assistant',
              content: aiResponseCode
            }
          ]);

          return;
        }

        if (onlyContactConfirmationProblem) {
          setStatus('Repairing contact form confirmation...');

          try {
            const repairedCode = await repairContactFormWithDeepSeek({
              originalCode: aiResponseCode,
              originalPrompt: prompt || `Build roadmap step: ${stepToBuild}`,
              source: `Build / Improve Step ${stepToBuild}`
            });
            const repairedCodeProblem = validateGeneratedAppCode(repairedCode);
            const repairedVisualProblem = validatePremiumVisualFloor(repairedCode);
            const repairedDepthProblem = validateWebsiteDepthOutput(repairedCode);
            const repairedMultiPagePremiumProblem = validateMultiPagePremiumFloor(repairedCode);
            const repairedContactConfirmationProblem = validateContactFormConfirmationUx(repairedCode);
            const repairedValidationProblems = getValidationProblems({
              codeProblem: repairedCodeProblem,
              visualProblem: repairedVisualProblem,
              depthProblem: repairedDepthProblem,
              multiPagePremiumProblem: repairedMultiPagePremiumProblem,
              contactConfirmationProblem: repairedContactConfirmationProblem
            });

            if (repairedValidationProblems.length === 0) {
              saveCurrentVersion();

              setGeneratedCode(repairedCode);
              setBuildRecoveryMessage('');
              setStatus(`Built/improved step ${stepToBuild} after contact form repair. Check Preview.`);
              setActiveView('preview');

              setChatHistory([
                ...chatHistory,
                {
                  role: 'user',
                  content: `Build roadmap step: ${stepToBuild}`
                },
                {
                  role: 'assistant',
                  content: repairedCode
                }
              ]);

              return;
            }

            const repairedFullProblemMessage = formatValidationProblems(repairedValidationProblems);
            returnToRoadmapWithWarning(
              `${repairedFullProblemMessage} Build paused for safety. This is not a crash. Previous code was kept. Adjust the contact-form copy, then try Build / Improve Step again.`,
              `${repairedFullProblemMessage}\n\nContact form repair was attempted, but previous code was kept so the preview does not break.\n\nBuild paused for safety. This is not a crash. Adjust the contact-form copy, then try Build / Improve Step again.`,
              'Build paused for safety. The generated contact form may imply real message delivery. Mini-Lovable does not add backend form handling automatically. Adjust the form copy so it clearly says the form is demo/local-only and then try Build / Improve Step again.'
            );
            return;
          } catch (error) {
            returnToRoadmapWithWarning(
              'Build paused for safety: contact form repair failed. This is not a crash. Previous code was kept. Adjust the contact-form copy, then try Build / Improve Step again.',
              `Contact form repair failed: ${error.message}\n\nBuild paused for safety. This is not a crash. Previous code was kept. Adjust the contact-form copy, then try Build / Improve Step again.`,
              'Build paused for safety. The generated contact form may imply real message delivery. Mini-Lovable does not add backend form handling automatically. Adjust the form copy so it clearly says the form is demo/local-only and then try Build / Improve Step again.'
            );
            return;
          }
        }

        if (validationProblems.length > 0) {
          if (codeProblem && codeProblem.includes('missing export default function App')) {
            const missingExportMessage =
              'DeepSeek returned text or partial code instead of a complete App.jsx. You are still on Roadmap. Try Build / Improve Step again, or use Generate / Update for the first version.';
            returnToRoadmapWithWarning(missingExportMessage, missingExportMessage);
            return;
          }

          if (visualProblem && visualProblem.includes('too many emoji icons')) {
            const emojiMessage =
              'DeepSeek returned a design with too many emojis for Premium/Luxury mode. Try Build / Improve Step again, or switch Quality level to Standard.';
            returnToRoadmapWithWarning(emojiMessage, emojiMessage);
            return;
          }

          if (validationProblems.length === 1 && isPremiumImageLedProblem(visualProblem)) {
            const imageProblemMessage =
              'DeepSeek returned a design without a strong image-led/editorial premium section. Add one real public image URL (preferably Unsplash) and image-related code such as img, backgroundImage, photo, visual, figure, or editorial, then try Build / Improve Step again or switch Quality level to Standard.';
            returnToRoadmapWithWarning(imageProblemMessage, imageProblemMessage);
            return;
          }

          if (depthProblem && depthProblem.includes('This became a one-page site. Multi-page requires activePage and setActivePage.')) {
            const multiPageModeMessage =
              'DeepSeek returned a one-page design even though multi-page mode is selected. You are still on Roadmap. Try Build / Improve Step again, or switch Website depth to Long landing page.';
            returnToRoadmapWithWarning(multiPageModeMessage, multiPageModeMessage);
            return;
          }

          if (validationProblems.length === 1 && contactConfirmationProblem) {
            returnToRoadmapWithWarning(
              `${contactConfirmationProblem} Build paused for safety. This is not a crash. Previous code was kept. Adjust the contact-form copy, then try Build / Improve Step again.`,
              `${contactConfirmationProblem} Previous code was kept so the preview does not break.\n\nBuild paused for safety. This is not a crash. Adjust the contact-form copy, then try Build / Improve Step again.`,
              'Build paused for safety. The generated contact form may imply real message delivery. Mini-Lovable does not add backend form handling automatically. Adjust the form copy so it clearly says the form is demo/local-only and then try Build / Improve Step again.'
            );
            return;
          }

          const problem = fullProblemMessage;
          returnToRoadmapWithWarning(
            `${problem} Build paused for safety. This is not a crash. Previous code was kept. Adjust the contact-form copy, then try Build / Improve Step again.`,
            `${problem} Previous code was kept so the preview does not break.\n\nBuild paused for safety. This is not a crash. Adjust the contact-form copy, then try Build / Improve Step again.`
          );
          return;
        }

        saveCurrentVersion();

        setGeneratedCode(aiResponseCode);
        setBuildRecoveryMessage('');
        setStatus(`Built/improved step ${stepToBuild}. Check Preview.`);
        setActiveView('preview');

        setChatHistory([
          ...chatHistory,
          {
            role: 'user',
            content: `Build roadmap step: ${stepToBuild}`
          },
          {
            role: 'assistant',
            content: aiResponseCode
          }
        ]);
      } else {
        returnToRoadmapWithWarning(
          'Build paused for safety: DeepSeek response did not contain valid code. This is not a crash. Previous code was kept. Adjust the contact-form copy, then try Build / Improve Step again.',
          'DeepSeek response did not contain valid code. Previous code was kept.\n\nBuild paused for safety. This is not a crash. Adjust the contact-form copy, then try Build / Improve Step again.'
        );
      }
    } catch (error) {
      returnToRoadmapWithWarning(
        'Build paused for safety: network or app problem. This is not a crash. Adjust the contact-form copy, then try Build / Improve Step again.',
        `Network or app error: ${error.message}\n\nBuild paused for safety. This is not a crash. Adjust the contact-form copy, then try Build / Improve Step again.`
      );
    } finally {
      setIsBuildingStep(false);
    }
  };

  const handleReviewCurrentApp = async () => {
    if (!apiKey) {
      setStatus('Error: review failed');
      alert('Please enter your API key before reviewing.');
      return;
    }

    if (!hasRealGeneratedApp(generatedCode)) {
      setStatus('Error: review failed');
      alert('Generate or build an app before reviewing.');
      return;
    }

    setIsReviewing(true);
    setStatus('Reviewing generated app...');
    setActiveView('review');
    setReviewText('Reviewing generated app...');

    const reviewMessages = [
      {
        role: 'system',
        content: `You are a Reviewer Agent for Mini-Lovable.
Review the current generated App.jsx only.
The generated App.jsx is the website/app created by Mini-Lovable. It is not the Mini-Lovable Tool/master app.
Do not rewrite the code.
Do not return App.jsx.
Do not generate a new app.
Write for a beginner / non-programmer.
Write reviewer feedback in English by default. Do not write Swedish feedback unless the user explicitly asks for Swedish feedback.
Suggested next prompt must be in English by default.
Do not suggest translating the generated website to Swedish unless the user explicitly asks for Swedish output.
If the original user prompt is Swedish but does not explicitly require Swedish output, treat it as intent only and keep reviewer feedback and suggested prompts in English.
The suggested next prompt should be directly usable for Mini-Lovable and should preserve English website copy.
Be practical and direct.
Check common export risks before scoring:
- Unverifiable claims, fake testimonials, named clients, or statistics without evidence.
- Placeholder links such as href="#", empty links, or buttons that do not clearly work.
- Mailto contact forms that only prepare an email draft and do not send automatically.
- Missing labels or aria-labels on form fields and important controls.
- Clickable divs/spans where a button or link would be safer.
- Mobile navigation or header wrapping risks.
- External image dependency risk, including broken or misleading images.
- Whether the generated app is safe enough to export for manual review.
- Whether the generated app is being confused with the Mini-Lovable Tool/master app.
Contact form checks before scoring:
- Contact pages or sections that contain only placeholder form text.
- Contact pages that say a form is available but do not render fields.
- Contact forms without name, email, and message fields.
- Contact forms without a submit button.
- Contact forms that imply real sending without backend integration.
- Contact forms that do nothing on submit and show no local confirmation.
- Contact forms that lack labels or clear accessible field names.
- Contact form required fields should be clear to the user.
- If the form relies only on browser-native required validation and gives no visible app-level feedback, mention that under "What should improve".
- If clicking submit appears to do nothing because required fields are empty, flag it as a usability risk.
- A local-only form is acceptable for preview or export if it clearly shows a visible local confirmation and does not claim real email delivery.
- If a form says or implies real email delivery without backend integration, flag it as a risk.
- If form submit sets formSubmitted true and renders a thank-you/confirmation block, treat local confirmation as present.
- If setFormSubmitted(true) exists but the confirmation may not be visible after submit, flag it as a confirmation visibility issue.
- If confirmation exists in code but may not be visible due to layout, scroll position, or placement, flag it as a visibility issue, not missing logic.
- If the submit button exists but users may not notice confirmation, suggest making the confirmation more prominent and scrolling it into view only if feasible.
- Do not say "no confirmation appears" unless the code lacks confirmation or UI evidence shows none after a valid submit.
- If confirmation only replaces the form with a subtle thank-you block, mention it may be missed.
- Good forms show a visible success banner near the submit button or scroll the confirmation into view.
- A local-only contact form should show an inline success banner in the form area after submit.
- If the form only replaces the entire form with a thank-you block, mention that it may be missed in preview.
- If contact copy says "I will respond", "we will respond", or similar without backend integration, flag it as misleading.
- If this issue exists, score must not exceed 7/10.
- Suggested next prompt should ask for: "Add an inline success banner inside the contact form area, directly above the submit button, and use honest local-only wording that says no email was sent."
- A local-only contact form should show an inline success banner inside the form area after submit.
- If the form only replaces the entire form with a subtle thank-you block, mention that it may be missed in preview.
- If contact copy says "I will respond", "we will respond", or similar without backend integration, flag it as misleading.
- If this issue exists, score must not exceed 7/10.
- Suggested next prompt should ask for an inline success banner inside the contact form area, directly above the submit button, and honest local-only wording that says no email was sent.
- If a local-only contact form fails or is weak, recommend using the Mini-Lovable contact form recipe: top-level contactForm state, contactError, contactSuccessMessage, handleContactSubmit, inline role="status" banner above the submit button, and honest "No email was sent" wording.
- If a contact form fails the Mini-Lovable validator, recommend using the exact required names: contactForm, contactError, contactSuccessMessage, handleContactSubmit.
- Suggested next prompt should explicitly request the exact Mini-Lovable contact form recipe.
- If contact form UX is weak, Mini-Lovable may try one repair pass before rejecting, but exported apps should still be manually tested.
- Contact form is fully visible in the preview.
- Contact form is not clipped by a two-column layout or narrow right panel.
- Contact page does not require horizontal scrolling to use the form.
- Submit button is visible.
- Confirmation appears where the user can see it after submit.
- If the contact form is clipped, off-screen, or hard to use, score must not exceed 7/10.
- Page components defined inside App() and rendered as JSX tags, especially ContactPage, FormPage, HomePage, and ServicesPage.
- Controlled form inputs that may lose focus after every typed character because the page component remounts.
- If form fields lose focus after typing one character, flag this as a serious usability/runtime issue.
- Do not claim form state is inside renderContact/renderPage unless the code clearly shows useState or React.useState declared inside that render function or inside a nested page component.
- If formData, formSubmitted, and formError are declared at the top level of App, do not flag this as a remount/state-location issue.
- Direct render helper functions such as renderContact() are acceptable when hooks are not called inside them.
- Only flag remount/focus-loss risk when a nested component is defined inside App and rendered as JSX, or hooks/state are declared inside a nested render function, or observed behavior/code strongly suggests fields lose focus after each typed character.
- If controlled inputs work normally and state is top-level, treat that as acceptable.
- If confirmation is subtle or easy to miss, score must not exceed 8/10.
React/runtime checks before scoring:
- React hooks called inside nested render helper functions.
- Hooks called conditionally or inside functions that are only called for one active page.
- Missing referenced style objects, handlers, or variables.
- Blank preview risks from runtime errors.
- JSX that may compile but crash at runtime.
Reviewer scoring rules:
- If the generated app has a Contact page with only placeholder contact form text, score must not exceed 7/10.
- If the generated app misuses React hooks inside nested render functions, score must not exceed 6/10 and the issue must be listed as a Possible risk.
- If the preview is blank or likely to become blank from runtime errors, score must not exceed 5/10.
- If form fields lose focus after typing one character, score must not exceed 6/10.
- If the contact form is clipped, off-screen, or hard to use, score must not exceed 7/10.
Reviewer suggested next prompt rules:
- The suggested next prompt must directly fix the highest-risk issue.
- If hook misuse exists, the suggested prompt must explicitly say to move contact form state to the top level of App or into a proper child component.
- If a contact form is missing, the suggested prompt must request a real local contact form with name, email, message, submit button, and local confirmation.
- If nested page components cause remounts, the suggested prompt must say: Refactor nested page components inside App into direct render helper functions or stable components outside App so form fields keep focus while typing.
- If the contact form is clipped or off-screen, the suggested prompt must ask to make the contact page responsive, stack the form on narrow widths, and keep confirmation visible.
- If confirmation is subtle or easy to miss, the suggested prompt must ask for a visible confirmation banner or scrollIntoView behavior.
Keep the review output beginner-friendly and focused on what to fix next.

Return output in this exact format:
Quality score: X/10
What works:
What should improve:
Possible risks:
Suggested next prompt: [write one concise English prompt that preserves English website copy]`
      },
      {
        role: 'user',
        content: `Current user prompt:
${prompt || 'No active prompt text.'}

Current generated App.jsx:
${generatedCode}

Current Mini-Lovable settings:
- App type: ${appType}
- Goal: ${goal}
- Design style: ${designStyle}
- Template recipe: ${templateRecipe}
- Quality level: ${qualityLevel}
- Page feeling: ${pageFeeling}
- Website depth: ${websiteDepth}
- Edit target: ${editSection}`
      }
    ];

    try {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: reviewMessages,
          max_tokens: 1800,
          temperature: 0.2
        })
      });

      const responseText = await response.text();

      if (!response.ok) {
        setReviewText(`Review failed: DeepSeek returned error ${response.status}.`);
        setStatus('Error: review failed');
        setActiveView('review');
        return;
      }

      const data = JSON.parse(responseText);

      if (data.choices && data.choices.length > 0) {
        const result = String(data.choices[0].message.content || '').trim();
        setReviewText(result || 'Review failed: Empty review result.');
        setStatus('Generated app review complete');
        setActiveView('review');
      } else {
        setReviewText('Review failed: Invalid DeepSeek response.');
        setStatus('Error: review failed');
        setActiveView('review');
      }
    } catch (error) {
      setReviewText(`Review failed: ${error.message}`);
      setStatus('Error: review failed');
      setActiveView('review');
    } finally {
      setIsReviewing(false);
    }
  };

  const handleCopyRoadmap = async () => {
    const roadmapText = String(roadmap || '').trim();

    if (!roadmapText || roadmapText === emptyRoadmapText) {
      setStatus('No roadmap to copy');
      alert('Create a roadmap first.');
      return;
    }

    try {
      await navigator.clipboard.writeText(roadmapText);
      setRoadmapCopied(true);
      setStatus('Roadmap copied');

      setTimeout(() => {
        setRoadmapCopied(false);
      }, 1500);
    } catch (error) {
      setStatus('Error: Could not copy roadmap');
      alert('Could not copy the roadmap.');
    }
  };

  const handleClearRoadmap = () => {
    setRoadmap(emptyRoadmapText);

    try {
      localStorage.removeItem(roadmapStorageKey);
    } catch (error) {
      // Clearing localStorage is optional. The visible roadmap is still cleared.
    }

    setRoadmapCopied(false);
    setStatus('Roadmap cleared');
    setActiveView('roadmap');
  };

  const handleResetProject = () => {
    setChatHistory([]);
    setVersionHistory([]);
    setCheckpoint(null);
    setGeneratedCode('// Memory cleared. Start a new app.');
    setPrompt('');
    setStatus('Memory, versions, and checkpoint cleared');
    setActiveView('code');
  };

  const handleClearCode = () => {
    setGeneratedCode('// Code panel cleared. Memory is still active.');
    setStatus('Code cleared');
    setActiveView('code');
  };

  const handleUndoVersion = () => {
    if (versionHistory.length === 0) {
      setStatus('No previous version');
      return;
    }

    const previousVersion = versionHistory[versionHistory.length - 1];

    setGeneratedCode(previousVersion.code);
    setChatHistory(previousVersion.chatHistory);
    setAppType(previousVersion.appType || 'Landing page');
    setGoal(previousVersion.goal || 'Create new app');
    setDesignStyle(previousVersion.designStyle || 'Premium SaaS');
    setTemplateRecipe(previousVersion.templateRecipe || 'None / custom');
    setQualityLevel(previousVersion.qualityLevel || 'Premium');
    setPageFeeling(previousVersion.pageFeeling || 'Safe and professional');
    setWebsiteDepth(previousVersion.websiteDepth || 'Long landing page');
    setEditSection(previousVersion.editSection || 'Whole app');
    setProjectName(previousVersion.projectName || 'GeneratedApp');
    setVersionHistory(versionHistory.slice(0, -1));
    setStatus('Previous version restored');
    setActiveView('preview');
  };

  const handleSaveCheckpoint = () => {
    if (!shouldSaveVersion(generatedCode)) {
      setStatus('No valid app to checkpoint');
      return;
    }

    setCheckpoint({
      code: generatedCode,
      chatHistory: chatHistory,
      appType: appType,
      goal: goal,
      designStyle: designStyle,
      templateRecipe: templateRecipe,
      qualityLevel: qualityLevel,
      pageFeeling: pageFeeling,
      websiteDepth: websiteDepth,
      editSection: editSection,
      projectName: projectName,
      savedAt: new Date().toLocaleTimeString()
    });

    setStatus('Checkpoint saved - safe restore point created');
  };

  const handleRestoreCheckpoint = () => {
    if (!checkpoint) {
      setStatus('No checkpoint saved');
      return;
    }

    setGeneratedCode(checkpoint.code);
    setChatHistory(checkpoint.chatHistory);
    setAppType(checkpoint.appType || 'Landing page');
    setGoal(checkpoint.goal || 'Create new app');
    setDesignStyle(checkpoint.designStyle || 'Premium SaaS');
    setTemplateRecipe(checkpoint.templateRecipe || 'None / custom');
    setQualityLevel(checkpoint.qualityLevel || 'Premium');
    setPageFeeling(checkpoint.pageFeeling || 'Safe and professional');
    setWebsiteDepth(checkpoint.websiteDepth || 'Long landing page');
    setEditSection(checkpoint.editSection || 'Whole app');
    setProjectName(checkpoint.projectName || 'GeneratedApp');
    setStatus('Checkpoint restored');
    setActiveView('preview');
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(ensureReactImport(generatedCode));
      setCopied(true);
      setStatus('Generated app code copied');

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      setStatus('Error: Could not copy code');
      alert('Could not copy the code.');
    }
  };

  const handleDownloadCode = () => {
    const appCode = ensureReactImport(generatedCode);
    downloadFile(getExportFilename('App', 'jsx'), appCode, 'text/javascript');
    setStatus('Generated App.jsx downloaded');
  };

  const handleDownloadPreviewHtml = () => {
    downloadFile(getExportFilename('Preview', 'html'), previewHtml, 'text/html');
    setStatus('Generated app preview HTML downloaded');
  };

  const loadHtml2Canvas = () => {
    if (window.html2canvas) {
      return Promise.resolve(window.html2canvas);
    }

    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[data-mini-lovable-html2canvas="true"]');

      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(window.html2canvas));
        existingScript.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      script.async = true;
      script.dataset.miniLovableHtml2canvas = 'true';
      script.onload = () => resolve(window.html2canvas);
      script.onerror = () => reject(new Error('Could not load screenshot library'));
      document.body.appendChild(script);
    });
  };

  const waitForFrameLoad = (frame) => {
    return new Promise((resolve) => {
      const finish = () => setTimeout(resolve, 900);

      if (!frame) {
        resolve();
        return;
      }

      frame.onload = finish;

      setTimeout(resolve, 2500);
    });
  };

  const waitForImages = async (documentToCapture) => {
    const images = Array.from(documentToCapture.images || []);

    await Promise.all(
      images.map((image) => {
        if (image.complete) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          image.onload = resolve;
          image.onerror = resolve;
        });
      })
    );
  };

  const handleDownloadPreviewImage = async () => {
    try {
      setStatus('Preparing generated app full-page PNG...');

      const html2canvas = await loadHtml2Canvas();
      const captureWidth = 1440;
      const frame = document.createElement('iframe');

      frame.title = 'Mini-Lovable full-page PNG capture';
      frame.srcdoc = previewHtml;
      frame.style.position = 'fixed';
      frame.style.left = '-20000px';
      frame.style.top = '0';
      frame.style.width = `${captureWidth}px`;
      frame.style.height = '1000px';
      frame.style.border = '0';
      frame.style.opacity = '0';
      frame.style.pointerEvents = 'none';
      frame.style.backgroundColor = 'white';

      document.body.appendChild(frame);
      await waitForFrameLoad(frame);

      const documentToCapture = frame.contentDocument;

      if (!documentToCapture) {
        throw new Error('Preview document is not ready yet');
      }

      await waitForImages(documentToCapture);

      const body = documentToCapture.body;
      const html = documentToCapture.documentElement;
      const captureHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
        900
      );

      frame.style.height = `${captureHeight}px`;
      await new Promise((resolve) => setTimeout(resolve, 250));

      const canvas = await html2canvas(body, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: false,
        scale: 1,
        width: captureWidth,
        height: captureHeight,
        windowWidth: captureWidth,
        windowHeight: captureHeight,
        scrollX: 0,
        scrollY: 0
      });

      const imageUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = getExportFilename('FullPageDesktopPreview', 'png');
      link.click();

      document.body.removeChild(frame);
      setStatus('Generated app full-page PNG downloaded');
    } catch (error) {
      handleDownloadPreviewHtml();
      setStatus('Could not create PNG, downloaded preview HTML instead');
      alert('Could not create the full-page PNG in this browser. I downloaded the preview as an HTML file instead.');
    }
  };

  const handleDownloadZip = () => {
    const appCode = ensureReactImport(generatedCode);

    const mainJsx = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

    const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

    const packageJson = `{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vitejs/plugin-react": "latest",
    "vite": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {}
}
`;

    const readme = `# Generated App

This project was generated with Mini-Lovable.

## How to run on Windows

1. Extract the ZIP file.
2. Open the extracted folder in VS Code or upload it to Bolt/StackBlitz.
3. Install dependencies: npm install
4. Start the app: npm run dev

The generated app is stored in src/App.jsx.
`;

    downloadZip(getExportFilename('ProjectZip', 'zip'), [
      { name: 'generated-app/index.html', content: indexHtml },
      { name: 'generated-app/package.json', content: packageJson },
      { name: 'generated-app/README.md', content: readme },
      { name: 'generated-app/src/App.jsx', content: appCode },
      { name: 'generated-app/src/main.jsx', content: mainJsx }
    ]);

    setStatus('Generated app project ZIP downloaded');
  };

  const compactControlGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '8px 10px',
    marginTop: '8px'
  };

  const compactInputGroupStyle = {
    marginBottom: '6px'
  };

  const compactFieldStyle = {
    minHeight: '31px',
    padding: '5px 9px',
    fontSize: '12px'
  };

  const compactTopBarStyle = {
    display: 'grid',
    gridTemplateColumns: '1.1fr repeat(3, minmax(110px, 0.7fr))',
    gap: '8px',
    alignItems: 'stretch',
    marginBottom: '8px'
  };

  const compactInfoCardStyle = {
    border: '1px solid #1f2937',
    backgroundColor: '#0f172a',
    borderRadius: '8px',
    padding: '7px 9px',
    minHeight: '40px'
  };

  const compactInfoLabelStyle = {
    color: '#64748b',
    fontSize: '9px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '2px'
  };

  const compactInfoValueStyle = {
    color: '#d1d5db',
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: 1.2
  };

  const actionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(112px, 1fr))',
    gap: '7px'
  };

  const smallActionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(140px, 1fr))',
    gap: '7px',
    marginTop: '7px'
  };

  const actionButtonStyle = {
    minHeight: '34px',
    padding: '7px 9px',
    fontSize: '12px',
    marginTop: 0
  };

  const generatedAppActionButtonStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 10px',
    fontSize: '12px',
    cursor: 'pointer'
  };

  const miniLovableToolActionButtonStyle = {
    ...generatedAppActionButtonStyle,
    backgroundColor: '#7c3aed'
  };

  const hasUsableRoadmap =
    String(roadmap || '').trim() &&
    String(roadmap || '').trim() !== emptyRoadmapText &&
    String(roadmap || '').trim() !== 'Creating roadmap...';
  const normalizedSelectedRoadmapStep = String(selectedRoadmapStep || '').trim();
  const selectedRoadmapStepLabel = normalizedSelectedRoadmapStep || 'No step selected';
  const roadmapStepReadinessMessage = !hasUsableRoadmap
    ? 'Create roadmap first.'
    : normalizedSelectedRoadmapStep
      ? 'Ready to build this step.'
      : 'Select a roadmap step first.';

  return (
    <div className="app-container">
      <div
        className="left-panel"
        style={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          className="panel-content"
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingBottom: '12px'
          }}
        >
          <div style={compactTopBarStyle}>
            <div style={{ ...compactInfoCardStyle, backgroundColor: 'transparent', border: 'none', padding: 0 }}>
              <h1 className="title" style={{ marginBottom: '3px', fontSize: '26px' }}>Mini-Lovable</h1>
              <div style={{ color: '#93c5fd', fontSize: '11px', fontWeight: 600 }}>
                v52.16 · GitHub baseline verified
              </div>
              <div style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 600, marginTop: '2px' }}>
                GitHub baseline verified · Bolt preview synced
              </div>
              <div style={{ color: '#a7f3d0', fontSize: '10px', fontWeight: 600, marginTop: '2px' }}>
                Codex CLI workspace-write verified
              </div>
            </div>

            <div style={compactInfoCardStyle}>
              <div style={compactInfoLabelStyle}>Status</div>
              <div style={compactInfoValueStyle}>{status}</div>
            </div>

            <div style={compactInfoCardStyle}>
              <div style={compactInfoLabelStyle}>Versions</div>
              <div style={compactInfoValueStyle}>{versionHistory.length} saved</div>
            </div>

            <div style={compactInfoCardStyle}>
              <div style={compactInfoLabelStyle}>Checkpoint</div>
              <div style={compactInfoValueStyle}>{checkpoint ? checkpoint.savedAt : 'none'}</div>
            </div>
          </div>

          <div style={compactControlGridStyle}>
            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="api-key">DeepSeek API Key</label>
              <input
                id="api-key"
                type="password"
                className="input-field"
                style={compactFieldStyle}
                placeholder="sk-..."
                value={apiKey}
                onChange={(event) => {
                  const nextApiKey = event.target.value;
                  setApiKey(nextApiKey);
                  setStatus('API key saved locally');
                }}
              />
              <div style={{ color: '#94a3b8', fontSize: '10px', marginTop: '4px', lineHeight: 1.25 }}>
                Saved locally in this browser only.
              </div>
            </div>

            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="project-name">Project name</label>
              <input
                id="project-name"
                type="text"
                className="input-field"
                style={compactFieldStyle}
                placeholder="Example: DinnerMatch"
                value={projectName}
                onChange={(event) => {
                  setProjectName(event.target.value);
                  localStorage.setItem('lovable_lite_project_name', event.target.value);
                }}
              />
            </div>
          </div>

          <div style={compactControlGridStyle}>
            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="app-type">App type</label>
              <select
                id="app-type"
                className="input-field"
                style={compactFieldStyle}
                value={appType}
                onChange={(event) => setAppType(event.target.value)}
              >
                <option>Landing page</option>
                <option>Dashboard</option>
                <option>Form</option>
                <option>Calculator</option>
                <option>CRM view</option>
                <option>Portfolio</option>
                <option>SaaS app</option>
              </select>
            </div>

            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="goal">Goal</label>
              <select
                id="goal"
                className="input-field"
                style={compactFieldStyle}
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
              >
                <option>Create new app</option>
                <option>Improve current design</option>
                <option>Add a section</option>
                <option>Change colors/style</option>
                <option>Fix a problem</option>
              </select>
            </div>
          </div>

          <div style={compactControlGridStyle}>
            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="design-style">Design style</label>
              <select
                id="design-style"
                className="input-field"
                style={compactFieldStyle}
                value={designStyle}
                onChange={(event) => setDesignStyle(event.target.value)}
              >
                <option>Premium SaaS</option>
                <option>Mobile app</option>
                <option>Luxury landing page</option>
                <option>Startup dark mode</option>
                <option>Clean consultant site</option>
                <option>Food app</option>
                <option>Dashboard pro</option>
                <option>Marketplace</option>
              </select>
            </div>

            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="template-recipe">Template recipe</label>
              <select
                id="template-recipe"
                className="input-field"
                style={compactFieldStyle}
                value={templateRecipe}
                onChange={(event) => {
                  setTemplateRecipe(event.target.value);
                  localStorage.setItem('lovable_lite_template_recipe', event.target.value);
                }}
              >
                <option>None / custom</option>
                <option>SaaS landing page</option>
                <option>Consultant website</option>
                <option>Restaurant website</option>
                <option>Mobile app</option>
                <option>Dashboard</option>
                <option>Booking app</option>
                <option>Marketplace</option>
                <option>Portfolio</option>
              </select>
            </div>
          </div>

          <div style={compactControlGridStyle}>
            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="quality-level">Quality level</label>
              <select
                id="quality-level"
                className="input-field"
                style={compactFieldStyle}
                value={qualityLevel}
                onChange={(event) => {
                  setQualityLevel(event.target.value);
                  localStorage.setItem('lovable_lite_quality_level', event.target.value);
                }}
              >
                <option>Standard</option>
                <option>Premium</option>
                <option>Luxury</option>
                <option>Enterprise</option>
              </select>
            </div>

            <div className="input-group" style={compactInputGroupStyle}>
              <label>Ground Zero rule</label>
              <div
                style={{
                  minHeight: '31px',
                  padding: '6px 9px',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                  backgroundColor: '#111827',
                  color: '#d1d5db',
                  fontSize: '10px',
                  lineHeight: 1.25
                }}
              >
                v52.16: keeps v52.15 repair behavior and enforces contact success banner placement before accepting generated apps.
              </div>
            </div>
          </div>

          <div style={compactControlGridStyle}>
            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="page-feeling">Page feeling</label>
              <select
                id="page-feeling"
                className="input-field"
                style={compactFieldStyle}
                value={pageFeeling}
                onChange={(event) => {
                  setPageFeeling(event.target.value);
                  localStorage.setItem('lovable_lite_page_feeling', event.target.value);
                }}
              >
                <option>Safe and professional</option>
                <option>More wow</option>
                <option>More visual</option>
                <option>More sales-focused</option>
                <option>More exclusive</option>
                <option>More compact</option>
              </select>
            </div>

            <div className="input-group" style={compactInputGroupStyle}>
              <label>What this controls</label>
              <div
                style={{
                  minHeight: '31px',
                  padding: '6px 9px',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                  backgroundColor: '#111827',
                  color: '#d1d5db',
                  fontSize: '10px',
                  lineHeight: 1.25
                }}
              >
                Safer, bolder, more visual, more sales-focused, more exclusive, or more compact.
              </div>
            </div>
          </div>

          <div style={compactControlGridStyle}>
            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="website-depth">Website depth</label>
              <select
                id="website-depth"
                className="input-field"
                style={compactFieldStyle}
                value={websiteDepth}
                onChange={(event) => {
                  setWebsiteDepth(event.target.value);
                  localStorage.setItem('lovable_lite_website_depth', event.target.value);
                }}
              >
                <option>One-page website</option>
                <option>Long landing page</option>
                <option>Simple multi-page website</option>
                <option>Full business website</option>
              </select>
            </div>

            <div className="input-group" style={compactInputGroupStyle}>
              <label>What this controls</label>
              <div
                style={{
                  minHeight: '31px',
                  padding: '6px 9px',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                  backgroundColor: '#111827',
                  color: '#d1d5db',
                  fontSize: '10px',
                  lineHeight: 1.25
                }}
              >
                One long page or a small website with clickable pages.
              </div>
            </div>
          </div>

          <div style={compactControlGridStyle}>
            <div className="input-group" style={compactInputGroupStyle}>
              <label htmlFor="edit-section">Edit target</label>
              <select
                id="edit-section"
                className="input-field"
                style={compactFieldStyle}
                value={editSection}
                onChange={(event) => {
                  setEditSection(event.target.value);
                  localStorage.setItem('lovable_lite_edit_section', event.target.value);
                }}
              >
                <option>Whole app</option>
                <option>Hero</option>
                <option>Services</option>
                <option>CTA</option>
                <option>Testimonials / proof</option>
                <option>About</option>
                <option>Contact</option>
                <option>Navigation</option>
                <option>Visual style only</option>
              </select>
            </div>

            <div className="input-group" style={compactInputGroupStyle}>
              <label>What this controls</label>
              <div
                style={{
                  minHeight: '31px',
                  padding: '6px 9px',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                  backgroundColor: '#111827',
                  color: '#d1d5db',
                  fontSize: '10px',
                  lineHeight: 1.25
                }}
              >
                Choose Whole app or only the section you want Mini-Lovable to regenerate.
              </div>
            </div>
          </div>

          <div
            style={{
              border: '1px solid #334155',
              backgroundColor: '#0b1220',
              borderRadius: '10px',
              padding: '8px 10px',
              margin: '6px 0 8px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div style={{ color: '#bfdbfe', fontSize: '11px', fontWeight: 700, marginBottom: '3px' }}>
                Standard test prompt
              </div>
              <div style={{ color: '#94a3b8', fontSize: '10px', lineHeight: 1.35 }}>
                Create a premium website for an exclusive business development consultant
              </div>
            </div>
            <button
              onClick={handleUseStandardTestPrompt}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 10px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Use test prompt
            </button>
          </div>

          <div className="input-group" style={{ marginBottom: '6px' }}>
            <label htmlFor="prompt">
              Prompt ({chatHistory.filter((message) => message.role === 'user').length} changes in memory)
            </label>
            <div style={{ color: '#cbd5e1', fontSize: '11px', lineHeight: 1.35, marginBottom: '6px' }}>
              Mini-Lovable will turn your idea into a first premium website draft you can preview and improve.
            </div>
            <textarea
              id="prompt"
              className="textarea-field"
              placeholder="Example: make the selected section more premium..."
              rows="3"
              style={{
                minHeight: '74px',
                fontSize: '12px',
                padding: '9px'
              }}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
            <div style={{ color: '#94a3b8', fontSize: '11px', lineHeight: 1.35, marginTop: '6px' }}>
              Describe the app you want to build. Include the goal, target users, and any must-have features.
            </div>
            <div
              style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap',
                marginTop: '7px'
              }}
            >
              {[
                {
                  label: 'Premium consultant website',
                  prompt: 'Create a premium website for an exclusive business consultant.'
                },
                {
                  label: 'Local service business',
                  prompt: 'Create a polished website for a local service business.'
                },
                {
                  label: 'Product landing page',
                  prompt: 'Create a modern landing page for a new product.'
                }
              ].map(({ label, prompt: chipPrompt }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setPrompt(chipPrompt)}
                  style={{
                    border: '1px solid #334155',
                    borderRadius: '999px',
                    padding: '4px 8px',
                    color: '#cbd5e1',
                    backgroundColor: '#111827',
                    fontSize: '10px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    cursor: 'pointer',
                    appearance: 'none'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            flexShrink: 0,
            borderTop: '1px solid #1f2937',
            backgroundColor: '#05070a',
            padding: '8px 32px 10px',
            boxShadow: '0 -10px 24px rgba(0, 0, 0, 0.28)'
          }}
        >
          <div style={actionGridStyle}>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="generate-btn"
              style={{
                ...actionButtonStyle,
                backgroundColor: '#16a34a'
              }}
            >
              {isGenerating ? 'Generating...' : 'Generate / Update'}
            </button>

            <button
              onClick={handleCreateRoadmap}
              disabled={isPlanning}
              className="generate-btn"
              style={{
                ...actionButtonStyle,
                backgroundColor: isPlanning ? '#4b5563' : '#0ea5e9',
                opacity: isPlanning ? 0.8 : 1
              }}
            >
              {isPlanning ? 'Planning...' : 'Create Roadmap'}
            </button>

            <button
              onClick={handleUndoVersion}
              disabled={versionHistory.length === 0}
              className="generate-btn"
              style={{
                ...actionButtonStyle,
                backgroundColor: versionHistory.length === 0 ? '#4b5563' : '#7c3aed',
                opacity: versionHistory.length === 0 ? 0.7 : 1
              }}
            >
              Undo version
            </button>

            <button
              onClick={handleResetProject}
              className="generate-btn"
              style={{
                ...actionButtonStyle,
                backgroundColor: '#dc2626'
              }}
            >
              Clear memory
            </button>

            <button
              onClick={handleClearCode}
              className="generate-btn"
              style={{
                ...actionButtonStyle,
                backgroundColor: '#f97316'
              }}
            >
              Clear code
            </button>
          </div>

          <div style={smallActionGridStyle}>
            <button
              onClick={handleSaveCheckpoint}
              className="generate-btn"
              style={{
                ...actionButtonStyle,
                backgroundColor: checkpoint ? '#64748b' : '#0ea5e9'
              }}
            >
              {checkpoint ? 'Checkpoint saved' : 'Save checkpoint'}
            </button>

            <button
              onClick={handleRestoreCheckpoint}
              disabled={!checkpoint}
              className="generate-btn"
              style={{
                ...actionButtonStyle,
                backgroundColor: checkpoint ? '#6366f1' : '#4b5563',
                opacity: checkpoint ? 1 : 0.7
              }}
            >
              Restore checkpoint
            </button>
          </div>
        </div>
      </div>

      <div
        className="right-panel"
        style={{
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000'
        }}
      >
        <div
          style={{
            backgroundColor: '#1e1e1e',
            padding: '10px 15px',
            color: '#888',
            fontSize: '12px',
            borderBottom: '1px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveView('code')}
              style={{
                backgroundColor: activeView === 'code' ? '#2563eb' : '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Code
            </button>

            <button
              onClick={() => setActiveView('preview')}
              style={{
                backgroundColor: activeView === 'preview' ? '#2563eb' : '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Preview
            </button>

            <button
              onClick={() => setActiveView('roadmap')}
              style={{
                backgroundColor: activeView === 'roadmap' ? '#2563eb' : '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Roadmap
            </button>

            <button
              onClick={() => setActiveView('review')}
              style={{
                backgroundColor: activeView === 'review' ? '#2563eb' : '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Review Results
            </button>

            <span>
              {activeView === 'code'
                ? 'Generated app code'
                : activeView === 'roadmap'
                  ? 'Planner roadmap'
                  : activeView === 'review'
                    ? 'Generated app review'
                    : 'Generated app preview'}
            </span>
            <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 600, lineHeight: 1.2 }}>
              Run App Review = checks generated site | Review Results = shows feedback
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Generated App = created site | Tool = builder
            </span>
            <span style={{ color: '#bfdbfe', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Generated App actions
            </span>
            <button
              onClick={handleCopyCode}
              style={{
                ...generatedAppActionButtonStyle,
                backgroundColor: copied ? '#16a34a' : generatedAppActionButtonStyle.backgroundColor
              }}
            >
              {copied ? 'Copied!' : 'Copy App Code'}
            </button>

            <button
              onClick={handleDownloadCode}
              style={generatedAppActionButtonStyle}
            >
              Download Generated App.jsx
            </button>

            <button
              onClick={handleDownloadZip}
              style={generatedAppActionButtonStyle}
            >
              Export Generated ZIP
            </button>

            <button
              onClick={handleDownloadPreviewImage}
              style={generatedAppActionButtonStyle}
            >
              Download Generated PNG
            </button>

            <button
              onClick={handleDownloadPreviewHtml}
              style={generatedAppActionButtonStyle}
              title="Download the generated app preview as an HTML backup file"
            >
              Download Generated HTML
            </button>

            <label
              style={{
                ...generatedAppActionButtonStyle,
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Import Generated App
              <input
                type="file"
                accept=".jsx,.js,.txt"
                onChange={handleImportGeneratedApp}
                style={{ display: 'none' }}
              />
            </label>

            <button
              onClick={handleReviewCurrentApp}
              disabled={isReviewing}
              style={{
                ...generatedAppActionButtonStyle,
                backgroundColor: isReviewing ? '#4b5563' : generatedAppActionButtonStyle.backgroundColor,
                cursor: isReviewing ? 'not-allowed' : 'pointer',
                opacity: isReviewing ? 0.85 : 1
              }}
            >
              {isReviewing ? 'Reviewing...' : 'Run App Review'}
            </button>

            <span style={{ color: '#ddd6fe', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Tool backup actions
            </span>
            <button
              onClick={handleBackupToolCode}
              style={miniLovableToolActionButtonStyle}
            >
              Backup Tool App
            </button>

            <button
              onClick={handleDownloadToolTxt}
              style={miniLovableToolActionButtonStyle}
            >
              Download Tool Source TXT
            </button>
          </div>
        </div>

        {activeView === 'code' ? (
          <div style={{ padding: '20px', overflow: 'auto', flexGrow: 1 }}>
            <pre
              style={{
                color: '#4ade80',
                fontSize: '14px',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                margin: 0
              }}
            >
              {generatedCode}
            </pre>
          </div>
        ) : activeView === 'roadmap' ? (
          <div
            style={{
              padding: '22px',
              overflow: 'auto',
              flexGrow: 1,
              backgroundColor: '#05070a'
            }}
          >
            <div
              style={{
                maxWidth: '900px',
                border: '1px solid #1f2937',
                backgroundColor: '#0b1220',
                borderRadius: '12px',
                padding: '20px',
                color: '#e5e7eb',
                boxShadow: '0 18px 50px rgba(0, 0, 0, 0.22)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    color: '#93c5fd',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  Planner Agent Roadmap
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleCopyRoadmap}
                    style={{
                      backgroundColor: roadmapCopied ? '#16a34a' : '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {roadmapCopied ? 'Copied!' : 'Copy Roadmap'}
                  </button>

                  <button
                    onClick={handleClearRoadmap}
                    style={{
                      backgroundColor: '#374151',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Roadmap
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(190px, 1fr) auto',
                  gap: '10px',
                  alignItems: 'end',
                  marginBottom: '16px'
                }}
              >
                <div>
                  <label
                    htmlFor="selected-roadmap-step"
                    style={{
                      display: 'block',
                      color: '#93c5fd',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '6px'
                    }}
                  >
                    Step to build or improve
                  </label>
                  <input
                    id="selected-roadmap-step"
                    type="text"
                    value={selectedRoadmapStep}
                    onChange={(event) => setSelectedRoadmapStep(event.target.value)}
                    placeholder="Example: 1, 2, Hero, About, Services"
                    style={{
                      width: '100%',
                      minHeight: '34px',
                      padding: '7px 10px',
                      borderRadius: '7px',
                      border: '1px solid #374151',
                      backgroundColor: '#111827',
                      color: '#e5e7eb',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                  <div
                    style={{
                      marginTop: '6px',
                      color: '#94a3b8',
                      fontSize: '11px',
                      lineHeight: 1.35
                    }}
                  >
                    Tip: Step 1 creates the first complete version. Later steps improve selected parts.
                  </div>
                  <div
                    role="status"
                    aria-live="polite"
                    style={{
                      marginTop: '10px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #334155',
                      backgroundColor: '#0f172a',
                      color: '#cbd5e1',
                      fontSize: '11px',
                      lineHeight: 1.45
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '3px' }}>
                      Selected roadmap step: {selectedRoadmapStepLabel}
                    </div>
                    <div>
                      {roadmapStepReadinessMessage}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBuildSelectedStep}
                  disabled={isBuildingStep || isPlanning || !hasUsableRoadmap}
                  style={{
                    backgroundColor:
                      isBuildingStep || isPlanning || !hasUsableRoadmap ? '#4b5563' : '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '7px',
                    padding: '9px 12px',
                    minHeight: '34px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: isBuildingStep || isPlanning || !hasUsableRoadmap ? 'not-allowed' : 'pointer',
                    opacity: isBuildingStep || isPlanning || !hasUsableRoadmap ? 0.8 : 1,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isBuildingStep
                    ? 'Building...'
                    : isPlanning
                      ? 'Wait for roadmap...'
                      : !hasUsableRoadmap
                        ? 'Create roadmap first'
                        : 'Build / Improve Step'}
                </button>
              </div>

              {buildRecoveryMessage ? (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    marginTop: '12px',
                    border: '1px solid #7c3aed',
                    backgroundColor: '#141022',
                    color: '#e9d5ff',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    fontSize: '12px',
                    lineHeight: 1.45
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: '4px', color: '#f5d0fe' }}>
                    Build paused
                  </div>
                  <div>{buildRecoveryMessage}</div>
                </div>
              ) : null}

              <pre
                style={{
                  color: '#d1d5db',
                  fontSize: '14px',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  lineHeight: 1.65,
                  margin: 0
                }}
              >
                {roadmap}
              </pre>
            </div>
          </div>
        ) : activeView === 'review' ? (
          <div
            style={{
              padding: '22px',
              overflow: 'auto',
              flexGrow: 1,
              backgroundColor: '#05070a'
            }}
          >
            <div
              style={{
                maxWidth: '900px',
                border: '1px solid #1f2937',
                backgroundColor: '#0b1220',
                borderRadius: '12px',
                padding: '20px',
                color: '#e5e7eb',
                boxShadow: '0 18px 50px rgba(0, 0, 0, 0.22)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    color: '#93c5fd',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  Reviewer Agent Feedback
                </div>

                <button
                  onClick={async () => {
                    const suggestedPrompt = extractSuggestedPrompt(reviewText);

                    if (!suggestedPrompt) {
                      alert('No suggested prompt found yet.');
                      return;
                    }

                    setPrompt(suggestedPrompt);
                    setSuggestedPromptCopied(true);

                    setTimeout(() => {
                      setSuggestedPromptCopied(false);
                    }, 1500);

                    try {
                      await navigator.clipboard.writeText(suggestedPrompt);
                      setStatus('Suggested prompt copied and loaded into prompt field');
                    } catch (error) {
                      setStatus('Suggested prompt loaded into prompt field');
                    }
                  }}
                  style={{
                    backgroundColor: suggestedPromptCopied ? '#16a34a' : '#475569',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {suggestedPromptCopied ? 'Loaded!' : 'Copy Suggested Prompt'}
                </button>
              </div>
              <pre
                style={{
                  color: '#d1d5db',
                  fontSize: '14px',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  lineHeight: 1.65,
                  margin: 0
                }}
              >
                {reviewText}
              </pre>
            </div>
          </div>
        ) : (
          <iframe
            ref={previewFrameRef}
            title="Generated app preview"
            srcDoc={previewHtml}
            sandbox="allow-scripts allow-modals allow-same-origin"
            style={{
              flexGrow: 1,
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'white'
            }}
          />
        )}
      </div>
    </div>
  );
}
