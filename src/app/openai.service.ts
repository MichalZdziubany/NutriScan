import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private openAIUrl = 'https://api.openai.com/v1/completions';

  constructor(private http: HttpClient) {}

  // Method to get healthier alternatives based on scanned product info
  getHealthierAlternatives(productInfo: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.openAiKey}`,
    });

    const body = {
      model: 'text-davinci-003',  // OpenAI model to use
      prompt: `Provide healthier alternatives for the following product: ${productInfo}`,
      max_tokens: 100, // Controls the response length
    };

    return this.http.post(this.openAIUrl, body, { headers });
  }
}