import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioContext = new AudioContext();
  private audioBuffer: AudioBuffer | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private readonly http: HttpClient = inject(HttpClient);

  private readonly audioBaseUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:4200/'
      : 'https://animal-farm-456c4.web.app/';

  loadAudio(filePath: string): Observable<ArrayBuffer> {
    const url = `${this.audioBaseUrl}${filePath}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  decodeAudio(arrayBuffer: ArrayBuffer): Observable<AudioBuffer> {
    return from(this.audioContext.decodeAudioData(arrayBuffer));
  }

  play(buffer: AudioBuffer) {
    this.audioBuffer = buffer;
    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.connect(this.audioContext.destination);
    this.sourceNode.start();
  }

  stop() {
    this.sourceNode?.stop();
  }
}
