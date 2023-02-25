import { gql } from "apollo-angular";

export const POST_MESSAGE = gql`
mutation postMessage($channelId: String!, $text: String!, $userId: String!) {
  postMessage(channelId: $channelId, text: $text, userId: $userId) {
    messageId,
    text,
    datetime,
    userId
  }
}`;