export const TOKEN_RATE = 4; // 1 token = 4 characters 
export const MESSAGE_LIMIT = 100; // Max per message 
export const GLOBAL_LIMIT = 1000; // Max global 

export const calculateTokens = (text: string): number => {
  return Math.ceil(text.length / TOKEN_RATE); // Round up to nearest integer 
};