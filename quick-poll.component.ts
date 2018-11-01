import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-quick-poll',
  templateUrl: './quick-poll.component.html',
  styleUrls: ['./quick-poll.component.css']
})
export class QuickPollComponent implements OnInit {
   quickPoll:QuickPoll
  constructor() { 
    this.quickPoll=new QuickPoll();
  }

  ngOnInit() {

    this.quickPoll.getQuickPoll()
   }

  submit=()=>{

  }
}


class Option{
  label:string;
  answerPercent:string
  constructor(label:string){
    this.label=label;
    this.answerPercent=""
  }
}
interface IQuickPoll{
  question:string;
  option1:string;
  option2:string;
  option3:string;
}
class QuickPoll{
  type:string;
  question:Poll | Question;
  questionText:string;
  answer:string;
  options:Array<Option>;
  isSumbmitted:false;
  quickPollService:QuickPollService;
  
 constructor(){
  this.quickPollService=new QuickPollService();
  
  this.questionText=""
  this.options=new Array<Option>();
 }

  getQuickPoll=()=>{  
    this.type="Question"
    this.question=this.type=="Question" ? new Question():new Poll();
    
    this.quickPollService.loadQuickPoll().subscribe(
      (data:IQuickPoll)=>{
         this.questionText=data.question;
         this.options[0]=new Option(data.option1);
         this.options[1]=new Option(data.option2);
         this.options[2]=new Option(data.option3);

         console.log(this.questionText) 
      },
      (error)=>{
        console.log(error)
      }
    )
    if(this.isSumbmitted){
      this.answer=this.getResult();
    }
    
  }

  getResult=()=>{
    return this.question.getResult();
  }

  submit=()=>{

  }
}

class Poll extends QuickPoll{

  constructor(){
    super();
  }
  getResult=()=>{
      return "Poll answer"
  }
}

class Question extends QuickPoll{

  constructor(){
    super();
  }
  getResult=()=>{
    return "Question answer"
  }
}

class QuickPollService{ 
  loadQuickPoll=()=>{
    var subject= new Subject();

    setTimeout(function(){
      subject.next({
        question:"Is new intranet awsome",
        option1:"Yes",
        option2:"No",
        option3:"Not Sure"
  }) 
    },2000)
    
      return subject;
  }
}