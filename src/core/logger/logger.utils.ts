import { UserMessageType, ValidMessage } from './logger.types';

/* ***** *****  Toast message  ***** ***** */

const hasUserMessage = (
  userMessage?: UserMessageType,
): userMessage is ValidMessage =>
  Boolean((<ValidMessage>userMessage).title) &&
  Boolean((<ValidMessage>userMessage).message);

export default hasUserMessage;
