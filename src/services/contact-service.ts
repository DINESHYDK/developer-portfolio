// API service wrappers directory
// Currently returns mock data, structured to easily swap to fetch() calls later

import type { ContactFormData } from "@/types";

/**
 * Simulates sending a contact form message.
 * TODO: Replace with actual API call to Express backend.
 */
export const sendContactMessage = async (
  _data: ContactFormData
): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock successful response
  return {
    success: true,
    message: "Message sent successfully!",
  };
};

