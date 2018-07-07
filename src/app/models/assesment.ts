export class Answer {
  id: number;
  question_id: number;
  title: string;
  is_correct = false;
}

export class Question {
  id: number;
  assesment_id: number;
  title: string;
  answers: Array<Answer>;
}

export class Assesment {
  id: number;
  title: string;
  pass_required = false;
  pass_mark = 0;
  lecture_id: number;
  assessmentable_id: number;
  questions: Array<Question>;
}