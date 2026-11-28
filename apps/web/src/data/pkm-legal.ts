/**
 * Privacy Policy and Terms & Conditions copy for /privacy and /terms.
 * Template wording for an Indian MEPF design consultancy. Have it reviewed
 * by a qualified lawyer before relying on it, and update LEGAL_UPDATED
 * whenever the text changes.
 */
import type { LegalSection } from "@/components/blocks/legal-content";

export const LEGAL_UPDATED = "28 November 2026";

export const LEGAL_CONTACT = {
  email: "info@pkmconsultants.in",
  address: [
    "Plot No. 34, Rayal Castle Phase 1",
    "Kolapancheri, Poonamallee Taluk",
    "Tiruvallur District, Chennai 600 072",
    "Tamil Nadu, India",
  ],
};

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    blocks: [
      {
        type: "p",
        text: 'PKM Consultants ("PKM", "we", "us") is an MEPF design consultancy based in Chennai, India. We design HVAC, plumbing and public health, electrical, fire protection and ELV systems for buildings.',
      },
      {
        type: "p",
        text: "This policy explains how we collect and use personal data when you visit this website, send us an enquiry or work with us on a project. For the purposes of the Digital Personal Data Protection Act, 2023, PKM is the Data Fiduciary for that data.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    blocks: [
      {
        type: "p",
        text: "We only collect what we need to respond to you and deliver our services:",
      },
      {
        type: "ul",
        items: [
          "Enquiry details you enter in our contact form: name, email address, phone number, company, the type of client you are, the services you are interested in and your project message.",
          "Correspondence you send us by email or phone, and the contact details in it.",
          "Project information shared during an engagement, such as architectural drawings, site details and the names and contact details of project team members.",
          "Basic technical data recorded by our hosting provider when you load a page, such as IP address, browser type, pages requested and the date and time of the request.",
        ],
      },
      {
        type: "p",
        text: "We do not knowingly collect sensitive personal data such as financial, health or biometric information through this website. Please do not send it to us.",
      },
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    blocks: [
      {
        type: "ul",
        items: [
          "To reply to your enquiry and discuss your project.",
          "To prepare proposals, fee quotations and agreements.",
          "To deliver our design, review and site support services, including coordinating with architects, contractors and approving authorities on your project.",
          "To keep proper business, accounting and professional records, and to meet our legal obligations.",
          "To keep this website secure and working properly.",
        ],
      },
      {
        type: "p",
        text: "We do not sell or rent your personal data, and we do not send marketing emails unless you have asked to receive them.",
      },
    ],
  },
  {
    id: "consent",
    title: "Consent and lawful use",
    blocks: [
      {
        type: "p",
        text: "When you submit an enquiry or share information with us, you consent to us using it for the purposes described above. Where you engage us for a project, we also process personal data to perform that engagement and to meet our legal obligations.",
      },
      {
        type: "p",
        text: "You can withdraw your consent at any time by writing to info@pkmconsultants.in. Withdrawal does not affect processing already carried out, or data we must keep by law.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        type: "p",
        text: "This website does not use advertising or analytics cookies, and we do not track you across other websites. Strictly necessary cookies may be set to keep the site secure and, for our own editors only, to preview content before it is published.",
      },
      {
        type: "p",
        text: "If we add analytics or other optional cookies in future, we will update this policy and ask for your consent where the law requires it.",
      },
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    blocks: [
      { type: "p", text: "We share personal data only where needed:" },
      {
        type: "ul",
        items: [
          "Service providers who host this website, manage our content and run our email, under obligations to keep the data confidential and secure.",
          "Your project team, such as the architect, structural consultant, contractors and approving authorities, when this is part of delivering the work you have asked us to do.",
          "Government bodies, courts or regulators when the law requires us to.",
        ],
      },
      {
        type: "p",
        text: "Some of our service providers may store or process data outside India. Where they do, we use providers that apply appropriate security measures, and we follow any restrictions notified by the Government of India.",
      },
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    blocks: [
      {
        type: "p",
        text: "Enquiries that do not lead to an engagement are kept for up to 24 months and then deleted. Project records, including correspondence and design documents, are kept for as long as needed for the project and to meet our legal, tax and professional record-keeping obligations.",
      },
    ],
  },
  {
    id: "security",
    title: "How we protect it",
    blocks: [
      {
        type: "p",
        text: "We use reasonable technical and organisational safeguards, including access controls and encrypted connections (HTTPS), to protect personal data from loss, misuse and unauthorised access. No system is completely secure, so we cannot guarantee absolute security.",
      },
      {
        type: "p",
        text: "If a personal data breach occurs, we will notify affected people and the Data Protection Board of India as the law requires.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    blocks: [
      {
        type: "p",
        text: "Under the Digital Personal Data Protection Act, 2023 you have the right to:",
      },
      {
        type: "ul",
        items: [
          "Ask for a summary of the personal data we hold about you and how we use it.",
          "Ask us to correct, complete or update inaccurate personal data.",
          "Ask us to erase personal data we no longer need to keep.",
          "Withdraw consent you have given.",
          "Have a grievance addressed, and nominate another person to exercise these rights for you.",
        ],
      },
      {
        type: "p",
        text: "To use any of these rights, email info@pkmconsultants.in. We may need to confirm your identity before acting on a request.",
      },
    ],
  },
  {
    id: "grievances",
    title: "Grievances",
    blocks: [
      {
        type: "p",
        text: 'If you have a concern about how we handle your personal data, write to our Grievance Officer at info@pkmconsultants.in with the subject "Privacy grievance". We will acknowledge it and respond within the time required by law.',
      },
      {
        type: "p",
        text: "If you are not satisfied with our response, you may complain to the Data Protection Board of India.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    blocks: [
      {
        type: "p",
        text: "Our services are for businesses and building owners. This website is not directed at children under 18, and we do not knowingly collect their personal data.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    blocks: [
      {
        type: "p",
        text: "We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated at the top.",
      },
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    blocks: [
      {
        type: "p",
        text: "These terms apply to your use of the PKM Consultants website. By using the site you agree to them. If you do not agree, please do not use the site.",
      },
      {
        type: "p",
        text: "These terms cover the website only. Our design, review and site support services are provided under a separate written proposal or agreement, described below.",
      },
    ],
  },
  {
    id: "using-the-site",
    title: "Using the website",
    blocks: [
      {
        type: "p",
        text: "You may browse, read and share links to this website for lawful purposes. You must not:",
      },
      {
        type: "ul",
        items: [
          "Use the site in a way that breaks any law or infringes anyone's rights.",
          "Try to gain unauthorised access to the site, its servers or any connected system.",
          "Introduce viruses or other harmful code, or disrupt the site's operation.",
          "Copy large parts of the site, or collect its content by automated means, without our written permission.",
        ],
      },
    ],
  },
  {
    id: "not-professional-advice",
    title: "Information, not design advice",
    blocks: [
      {
        type: "p",
        text: "The content on this website, including service descriptions, articles and references to codes and standards, is general information. It is not engineering advice for any particular building and must not be used as a substitute for a project-specific design by qualified engineers.",
      },
      {
        type: "p",
        text: "Codes, standards and authority requirements change and vary between locations. Always confirm the current requirements for your project before relying on any information here.",
      },
    ],
  },
  {
    id: "engagements",
    title: "Enquiries and engagements",
    blocks: [
      {
        type: "p",
        text: "Sending an enquiry through the website does not create a client relationship or any obligation on either side. We are only engaged once a written proposal or agreement has been accepted by both parties.",
      },
      {
        type: "p",
        text: "The scope, deliverables, fees, timelines and liability for any project are set out in that proposal or agreement. If it conflicts with these terms, the proposal or agreement takes precedence for that project.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    blocks: [
      {
        type: "p",
        text: "All content on this website, including text, graphics, photographs, drawings, logos and layout, is owned by PKM Consultants or used with permission, and is protected by copyright and other laws. You may not reproduce it for commercial use without our written permission.",
      },
      {
        type: "p",
        text: "Unless a project agreement says otherwise, copyright in the drawings, calculations and other design documents we prepare remains with PKM Consultants. Our client receives a licence to use them for the specific project they were prepared for.",
      },
    ],
  },
  {
    id: "third-party-links",
    title: "Links to other websites",
    blocks: [
      {
        type: "p",
        text: "This website may link to other websites, such as social media or standards bodies. We do not control those sites and are not responsible for their content, availability or privacy practices.",
      },
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    blocks: [
      {
        type: "p",
        text: 'We work to keep the website accurate and available, but it is provided "as is". We do not guarantee that it will always be complete, current, uninterrupted or free from errors or viruses.',
      },
      {
        type: "p",
        text: "Project images and descriptions illustrate our experience. Where a project was delivered with partners or as a design review, the description reflects our role in it.",
      },
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    blocks: [
      {
        type: "p",
        text: "To the extent permitted by law, PKM Consultants is not liable for any loss or damage arising from your use of, or reliance on, this website or its content, including indirect or consequential loss, loss of profit or loss of data.",
      },
      {
        type: "p",
        text: "Nothing in these terms excludes or limits any liability that cannot be excluded or limited under Indian law.",
      },
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    blocks: [
      {
        type: "p",
        text: "You agree to compensate PKM Consultants for any loss or claim arising from your misuse of this website or your breach of these terms.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    blocks: [
      {
        type: "p",
        text: "How we collect and use personal data is explained in our Privacy Policy, which forms part of these terms.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    blocks: [
      {
        type: "p",
        text: "These terms are governed by the laws of India, including the Information Technology Act, 2000. Any dispute about them is subject to the exclusive jurisdiction of the courts at Chennai, Tamil Nadu.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    blocks: [
      {
        type: "p",
        text: "We may update these terms from time to time. The latest version will always be on this page, and continuing to use the site after a change means you accept the updated terms.",
      },
    ],
  },
];
