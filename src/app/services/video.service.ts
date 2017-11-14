import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VideoService {

  private allVideos = [
    {
      src: 'test_video_0.mp4',
    },
    {
      src: 'test_video_1.mp4',
    },
    {
      src: 'test_video_2.mp4',
    }
  ];

  private subject = new BehaviorSubject<Array<{src:string}>>([]);

  videoList$: Observable<Array<{src:string}>> = this.subject.asObservable();

  constructor() {
  }

  getAllVideos() {
    return this.allVideos;
  }

}
