import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VideoService} from '../../services/video.service';
import {Video} from './model/video.interface';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('volumeSlider') volumeSlider: ElementRef;
  percentage: string;
  currentTime: number;
  duration: number;
  currentVideo: Video;
  videos: Array<Video> = [];

  constructor(private _videoService: VideoService) {
  }

  onPlayOrPause(): void {
    this.videoPlayer.nativeElement.paused ? this.videoPlayer.nativeElement.play() : this.videoPlayer.nativeElement.pause();
  }

  onStopPlayer(): void {
    this.videoPlayer.nativeElement.pause();
    this.videoPlayer.nativeElement.currentTime = 0;
  }

  onChangeVideo(video: Video): void {
    this.percentage = '0.00';
    this.currentVideo = video;
    this.setEventListeners();
    this.onPlayOrPause();
  }

  onMuteVideo(): void {
    this.videoPlayer.nativeElement.muted = !this.videoPlayer.nativeElement.muted;
  }

  ngOnInit() {
    this.onInitVideoPlayer();
    this.fetchVideos();
    this.setEventListeners();
  }

  private onInitVideoPlayer() {
    this.videoPlayer.nativeElement.removeAttribute('controls');
    this.volumeSlider.nativeElement.value = this.videoPlayer.nativeElement.volume * 100;
  }

  private fetchVideos(): void {
    this.videos = this._videoService.getAllVideos();
    this.currentVideo = this.videos[0];
  }

  private setEventListeners(): void {
    this.videoPlayer.nativeElement.load();

    this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
      this.setDefaultsSettings();
    });

    this.videoPlayer.nativeElement.onended = () => {
      const index = this.videos.indexOf(this.currentVideo);
      if (index !== this.videos.length - 1) {
        this.currentVideo = this.videos[index + 1];
        this.setEventListeners();
        this.onPlayOrPause();
      } else {
        this.currentVideo = this.videos[0];
        this.setEventListeners();
        this.percentage = '0.00';
      }
    };

    this.videoPlayer.nativeElement.addEventListener('timeupdate', () => {
      this.updateProgressBar();
      this.updateCurrentTime();
    });

    this.volumeSlider.nativeElement.addEventListener('change', () => {
      const volumeValue = this.volumeSlider.nativeElement.value / 100;
      this.videoPlayer.nativeElement.volume = parseFloat(volumeValue.toString()).toFixed(1);
    });
  }

  private setDefaultsSettings(): void {
    this.currentTime = 0;
    this.duration = (this.videoPlayer.nativeElement.duration / 60);
  }

  private updateProgressBar(): void {
    this.percentage = ((100 / this.videoPlayer.nativeElement.duration) *
      this.videoPlayer.nativeElement.currentTime).toFixed(2);
  }

  private updateCurrentTime(): void {
    this.duration = (this.videoPlayer.nativeElement.duration / 60);
    this.currentTime = (this.videoPlayer.nativeElement.currentTime / 60);
  }

}
