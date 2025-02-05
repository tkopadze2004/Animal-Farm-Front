import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private readonly http: HttpClient = inject(HttpClient);

  private readonly audioBaseUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:4200/'
      : 'https://animal-farm-456c4.web.app/';

  public loadAudio(filePath: string): Observable<ArrayBuffer> {
    const url = `${this.audioBaseUrl}${filePath}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  public decodeAudio(arrayBuffer: ArrayBuffer): Observable<AudioBuffer> {
    this.ensureAudioContext();
    return from(this.audioContext!.decodeAudioData(arrayBuffer));
  }

  public play(buffer: AudioBuffer): void {
    this.ensureAudioContext();

    if (!this.audioContext || this.audioContext.state === 'suspended') {
      this.audioContext?.resume().then(() => this.startPlayback(buffer));
    } else {
      this.startPlayback(buffer);
    }
  }

  stop(): void {
    this.sourceNode?.stop();
  }

  private startPlayback(buffer: AudioBuffer): void {
    if (!this.audioContext) return;

    this.audioBuffer = buffer;
    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.connect(this.audioContext.destination);
    this.sourceNode.start();
  }

  private ensureAudioContext(): void {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
  }
}
