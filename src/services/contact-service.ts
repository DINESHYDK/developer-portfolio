import type { ContactFormData } from "@/types";

/**
 * Contact Service — Web3Forms (https://web3forms.com)
 *
 * Free, no-backend form delivery: submissions arrive in your email inbox.
 * Requires VITE_WEB3FORMS_KEY in .env.local / Vercel env vars.
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const sendContactMessage = async (
  data: ContactFormData,
  botcheck = ""
): Promise<{ success: boolean; message: string }> => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

  if (!accessKey || accessKey === "REPLACE_WITH_YOUR_WEB3FORMS_KEY") {
    console.warn(
      "[Contact] VITE_WEB3FORMS_KEY is not configured — see TODO.md"
    );
    return {
      success: false,
      message: "Contact form is not configured yet. Please email me directly.",
    };
  }

  // Honeypot filled → bot. Pretend success so the bot learns nothing.
  if (botcheck) {
    return { success: true, message: "Message sent successfully!" };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio contact from ${data.name}`,
        from_name: "YDK Portfolio",
        name: data.name,
        email: data.email,
        message: data.message,
        botcheck,
      }),
    });

    const json = (await res.json()) as { success: boolean; message?: string };

    if (!res.ok || !json.success) {
      throw new Error(json.message ?? `HTTP ${res.status}`);
    }

    return { success: true, message: "Message sent successfully!" };
  } catch (err) {
    console.error("[Contact] Failed to send message:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again or email me directly.",
    };
  }
};
