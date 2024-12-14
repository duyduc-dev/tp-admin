export enum LessonType {
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
  QUESTION = 'QUESTION',
}

export enum LessonStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  DONE = 'DONE',
}

export type LessonDetail = {
  id: string;
  title: string;
  slug: string;
  duration: number;
  order: number;
  lessonType: LessonType;
  lessonStatus: LessonStatus;
  chapterId: string;
  videoId: string;
  createdAt: number;
  updatedAt: number;
  answers: any[];
};
