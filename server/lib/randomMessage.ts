export interface Message {
  id: number;
  postDate: Date;
  entrytext: string;
  moodId: number;
  userId: number;
}

const getRadomMessage = function (mood: number, messages: Message[]): Message {
  const messagesMood = messages.filter((message) => message.moodId === mood);
  console.log('messagesMood', messagesMood);

  const randomNumber = Math.floor(Math.random() * messagesMood.length);
  return messagesMood[randomNumber];
};

export default getRadomMessage;
