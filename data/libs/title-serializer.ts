interface DeserializedTitle {
  title: string;
  checked: boolean;
  detail: string;
}

export const titleDeserializer = (title: string): DeserializedTitle => {
  try {
    return JSON.parse(title);
  } catch {
    return { title: '不明なタイトル', checked: false, detail: '' };
  }
};

export const titleSerializer = ({ title, checked, detail }: DeserializedTitle): string => {
  return JSON.stringify({ title, checked, detail });
};
