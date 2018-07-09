import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../../../../../../services/user_service';
import { EventService } from '../../../../../../../services/event_service';
import { Lecture } from '../../../../../../models/lecture';
import { Assesment, Question, Answer } from '../../../../../../models/assesment';
import { environment } from '../../../../../../../environments/environment';
import { CourseService } from "../../../../../../../services/course_service";
import { AssesmentService } from "../../../../../../../services/assesment_service";
import { Notification } from '../../../../../../../services/notification';
import * as RecordRTC from 'recordrtc';
declare var $;

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit, AfterViewInit {

  @Input() course;
  @Input() course_id;
  lectures: Array<Lecture>;
  draft_lecture: Lecture;
  reset_lecture: Lecture;
  assessment: Assesment;
  selected_file: any;
  private stream: MediaStream;
  private recordRTC: any;
  private recordedBlob: any;
  recording_state = '';
  start_string = 'Start';

  @ViewChild('video') video;
  constructor(private courseService: CourseService, private assesmentService: AssesmentService) { 
    this.lectures = [];
  }

  ngOnInit() {
    console.log(this.course);
  	this.loadCourseCurriculum(this.course_id);
    this.assessment = new Assesment();
  }

  ngAfterViewInit() {
    // set the initial state of the video
    let video:HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/mp4', 
      bitsPerSecond: 128000
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    console.log('video src');
    console.log(video.src);
    this.toggleControls();
    this.recording_state = 'started';
    this.start_string = 'Pause';
  }

  errorCallback() {
    //handle error here
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    this.recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }

  startRecording() {
    if (this.recording_state == 'started') {
      let recordRTC = this.recordRTC;
      recordRTC.pauseRecording();
      this.recording_state = 'paused';
      this.start_string = 'Resume'
      let video: HTMLVideoElement = this.video.nativeElement;
      video.pause();
    }
    else if (this.recording_state == 'paused') {
      let recordRTC = this.recordRTC;
      recordRTC.resumeRecording();
      this.recording_state = 'started';
      this.start_string = 'Pause'
      let video: HTMLVideoElement = this.video.nativeElement;
      video.play();
    }
    else {
      let mediaConstraints = {
        video: true,
        audio: true
      };
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }
  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
    this.recording_state = '';
    this.start_string = 'Start';
  }

  doneRecording() {
    this.selected_file = this.recordedBlob;
    $('#lecture-content-recording-modal').modal('hide');
  }

  public addLecture(index = '') {
    if(!this.draft_lecture || !this.draft_lecture.is_draft) {
      this.draft_lecture = new Lecture();
      this.draft_lecture.is_draft = true;
      this.lectures.push(this.draft_lecture);
    }
  }

  public loadCourseCurriculum(course_id) {
    this.courseService.getLectures(course_id).subscribe(response => {
      if(response.success) {
        this.lectures = response.lectures;
        console.log('this.lectures');
        console.log(this.lectures);
      }
      else {
        Notification.show('error', response.error);
      }
    },
    err => {
      Notification.show('error', "Unable to load lecture");
    })
  }

  public loadAssesment(lecture_id) {
    this.assessment = new Assesment();
    this.assessment.lecture_id = lecture_id;
    this.assesmentService.getAssesment(lecture_id).subscribe(response => {
      if(response.success && response.assessment) {
        this.assessment = response.assessment;
        this.assessment.lecture_id = this.assessment.assessmentable_id;
        console.log(this.assessment);
      }
    },
    err => {
      Notification.show('error');
    })
  }

  public addQuestion(assesment) {
    let question = new Question();
    question.assesment_id = assesment.id;
    if(!assesment.questions) {
      assesment.questions = [];
    }
    assesment.questions.push(question);
  }

  public addAnswer(question) {
    let answer = new Answer();
    answer.question_id = question.id;
    if(!question.answers) {
      question.answers = [];
    }
    question.answers.push(answer);
    console.log(question.answers);
  }  

  public updateAssesment(assesment) {
    this.assesmentService.updateAssesment(assesment).subscribe(response => {
      if(response.success) {
        this.assessment.id = response.assessment.id;
        Notification.show("success", 'Assesment saved!');
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error');
    });
  }

  public updateQuestion(is_valid, assesment, question, index) {
    this.assesmentService.updateQuestion(assesment, question).subscribe(response => {
      if(response.success) {
        this.assessment.questions[index] = response.question;
        console.log(response.question);
        Notification.show("success", 'Assesment saved!');
      }
      else {
        Notification.show('error', response.message);
      }
    },
    err => {
      Notification.show('error');
    });
  }

  public checkCorrectAnswer(index) {
    let question = this.assessment.questions[index];
    for(var key in question.answers) {
      question.answers[key].is_correct = false; 
    }
  }

  public onFileChanged($event, lecture) {
    var file = $event.target.files[0];
    this.selected_file = file;
  }

  public updateLecture(lecture, index, is_valid) {
    if(is_valid) {
      const lectureForm = new FormData();
      for ( var key in lecture) {
        lectureForm.append(key, lecture[key]);
      }
      if(this.selected_file) {
        lectureForm.append('file', this.selected_file);
        this.selected_file = null;
      }
      this.courseService.updateLecture(this.course.id, lectureForm).subscribe(response => {
        if(response.success) {
          Notification.show('success', "Lecture saved!");
          if(lecture.is_draft) {
            this.draft_lecture = this.reset_lecture;
          }
          this.lectures[index] = response.lecture
        }
        else {
          Notification.show('error', response.error);
        }
      },
      err => {
        Notification.show('error', "Unable to update lecture");
      })
    }
    else {
       Notification.show('warning', "Please fill the required field!");
    }
  }

}
