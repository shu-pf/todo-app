interface DeserializedTitle {
  title: string;
  checked: boolean;
}

export const titleDeserializer = (title: string): DeserializedTitle => {
  return JSON.parse(title);
};

export const titleSerializer = ({ title, checked }: DeserializedTitle): string => {
  return JSON.stringify({ title, checked });
};
