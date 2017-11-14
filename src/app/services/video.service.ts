import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {mock_data} from '../../assets/mock-data';
import {Video} from '../application/video-player/model/video.interface';

@Injectable()
export class VideoService {
  private allVideos = mock_data;

  private subject = new BehaviorSubject<Video[]>([]);

  videoList$: Observable<Video[]> = this.subject.asObservable();

  constructor() {
  }

  getAllVideos(): Observable<Video[]> {
    this.subject.next(this.allVideos);
    return this.videoList$;
  }
}
