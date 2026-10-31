export type UserRole = "student" | "editor" | "admin";
export type ContentStatus = "draft" | "published";
export type SubscriptionStatus =
  | "pending"
  | "active"
  | "rejected"
  | "expired"
  | "suspended"
  | "cancelled";
export type PaymentProvider = "wave" | "orange_money" | "free_money";

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  level: string;
  track: string;
  avatar: string;
  role: UserRole;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  duration_days: number;
  price_fcfa: number;
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  start_date: string | null;
  end_date: string | null;
  activated_by: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
  plan?: Plan;
}

export interface Level {
  id: string;
  name: string;
  code: string;
  order_index: number;
  created_at: string;
}

export interface Track {
  id: string;
  level_id: string;
  name: string;
  code: string;
  order_index: number;
  created_at: string;
}

export interface Subject {
  id: string;
  track_id: string;
  name: string;
  code: string;
  icon_name: string;
  order_index: number;
  created_at: string;
}

export interface Chapter {
  id: string;
  subject_id: string;
  title: string;
  order_index: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  order_index: number;
  content_markdown: string;
  is_free: boolean;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  exercises?: Exercise[];
  quiz?: Quiz;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  title: string;
  statement: string;
  solution: string;
  difficulty: 1 | 2 | 3;
  order_index: number;
  created_at: string;
}

export interface QuizAnswer {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  explanation: string | null;
  order_index: number;
  answers?: QuizAnswer[];
}

export interface Quiz {
  id: string;
  lesson_id: string | null;
  chapter_id: string | null;
  title: string;
  passing_score: number;
  created_at: string;
  questions?: QuizQuestion[];
}

export interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
  last_quiz_score: number | null;
  last_read_at: string;
  created_at: string;
}

