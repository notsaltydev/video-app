import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class VideoService {

  private allVideos = [
    {
      title: 'Sample title #1',
      description: 'Lorem ipsum...',
      duration: '2.29',
      cover: '../../../assets/image/default_placeholder.png',
      src: '../../../assets/video/test_video_0.mp4',
    },
    {
      title: 'Sample title #2',
      description: 'Lorem ipsum...',
      duration: '2.29',
      cover: '../../../assets/image/default_placeholder.png',
      src: '../../../assets/video/test_video_1.mp4',
    },
    {
      title: 'Sample title #3',
      description: 'Lorem ipsum...',
      duration: '2.29',
      cover: '../../../assets/image/default_placeholder.png',
      src: '../../../assets/video/test_video_2.mp4',
    }
  ];

  private subject = new BehaviorSubject<Array<{ src: string }>>([]);

  videoList$: Observable<Array<{ src: string }>> = this.subject.asObservable();

  constructor() {
  }

  getAllVideos() {
    return this.allVideos;
  }

}
