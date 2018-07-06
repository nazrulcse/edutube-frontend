export class Answer {
  title: string;
  is_correct = true;
}

export class Assesment {
  title: string;
  pass_required = false;
  pass_mark = 0;
  questions: [
  	{
  		title: '',
  		answer: Array<Answer>
  	}
   ]
  };
}