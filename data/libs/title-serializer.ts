interface DeserializedTitle {
  title: string;
  checked: boolean;
  detail: string;
}

export const titleDeserializer = (title: string): DeserializedTitle => {
  return JSON.parse(title);
};

export const titleSerializer = ({ title, checked, detail }: DeserializedTitle): string => {
  return JSON.stringify({ title, checked, detail });
};
