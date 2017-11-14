import {Component, OnInit, ViewChild} from '@angular/core';
import {VideoService} from '../../services/video.service';
import {Video} from './model/video.interface';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer: any;
  @ViewChild('progressBar') progressBar: any;
  @ViewChild('volumeSlider') volumeSlider: any;
  @ViewChild('allowFullscreen') allowFullscreen: any;
  percentage: any;
  currentVideo: Video;
  private currentTime: any;
  private duration: any = '0.00';
  videos: Array<Video> = [];
  fullScreenEnabled: any = !!(document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.createElement('video').webkitRequestFullScreen);


  constructor(private _videoService: VideoService) {
  }

  ngOnInit() {
    this.videos = this._videoService.getAllVideos();
    this.currentVideo = this.videos[0];
    this.setEventListeners();
  }

  private setEventListeners(): void {
    this.videoPlayer.nativeElement.load();
    this.videoPlayer.nativeElement.removeAttribute('controls');
    this.volumeSlider.nativeElement.value = this.videoPlayer.nativeElement.volume * 100;
    this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
      this.setDefaults();
    });
    this.videoPlayer.nativeElement.addEventListener('timeupdate', () => {
      this.updateProgressBar();
    });
    this.volumeSlider.nativeElement.addEventListener('change', () => {
      const volumeValue = this.volumeSlider.nativeElement.value / 100;
      this.videoPlayer.nativeElement.volume = parseFloat(volumeValue.toString()).toFixed(1);
    });
    this.allowFullscreen.nativeElement.addEventListener('click', () => {
      console.log('click');
      this.handleFullscreen();
    });
  }

  private setDefaults(): void {
    this.duration = (this.videoPlayer.nativeElement.duration / 60).toFixed(2);
    this.currentTime = (this.videoPlayer.nativeElement.currentTime).toFixed(2);
  }

  private updateProgressBar(): void {
    this.duration = (this.videoPlayer.nativeElement.duration / 60).toFixed(2);
    this.currentTime = (this.videoPlayer.nativeElement.currentTime / 60).toFixed(2);
    this.percentage = ((100 / this.videoPlayer.nativeElement.duration) *
      this.videoPlayer.nativeElement.currentTime).toFixed(2);
  }

  private setVolumeSlider(): void {
    this.volumeSlider.nativeElement.value = this.videoPlayer.nativeElement.volume * 100;
  }

  onPlayOrPause(event: any): void {
    this.videoPlayer.nativeElement.paused ? this.videoPlayer.nativeElement.play() : this.videoPlayer.nativeElement.pause();
  }

  onStopPlayer(): void {
    this.videoPlayer.nativeElement.pause();
    this.videoPlayer.nativeElement.currentTime = 0;
  }

  handleFullscreen() {
    return document.documentElement.requestFullscreen();
  }


  setFullscreenData(state) {
    this.videoPlayer.nativeElement.setAttribute('data-fullscreen', !!state);
  }

  onChangeVideo(video: Video): void {
    this.currentVideo = video;
    this.setEventListeners();
  }
}
