import apiClient from "./client";

const endpoint = "/auth";

// Sending phone number confirmation
const sendConfirmationCode = (phone: string) => {
  const data = { phone };
  return apiClient.get<{ to: string; channel: "sms" }>(endpoint, data);
};

// Verifying phone number
const verify = (phone: string, code: string) => {
  const data = { phone, code };
  return apiClient.get<{
    res: {
      createdOn: string;
      isApproved: boolean;
      phone: string;
    };
    authToken: string;
    isNew: boolean;
  }>(`${endpoint}/confirm`, data);
};

export default {
  sendConfirmationCode,
  verify,
};
