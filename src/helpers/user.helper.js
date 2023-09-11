export const createAlterQueryObj = (userID1, userID2) => [
  { senderId: userID1, receiverId: userID2 },
  { senderId: userID2, receiverId: userID1 },
];
