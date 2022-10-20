export interface Message {
  id: number;
  postDate: Date;
  entrytext: string;
  mood: number;
  userId: number;
}

const getRadomMessage = function (mood: number, messages: Message[]): Message {
  console.log('start random mood', mood, 'messages', messages);
  const messagesMood = messages.filter((message) => message.mood === mood);

  const randomNumber = Math.floor(Math.random() * messagesMood.length);
  return messagesMood[randomNumber];
};

export default getRadomMessage;
