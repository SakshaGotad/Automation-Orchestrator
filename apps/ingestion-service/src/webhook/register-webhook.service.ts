import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterWebhookService {
  constructor() {}

  async registerWebhook(data: { app: string; connection: any; trigger: any }) {
    const { app, connection, trigger } = data;
    switch (app) {
      case 'github':
        return this.registerGithubWebhook(connection, trigger);

      default:
        console.log('⚠️ No webhook registration for:', app);
    }
  }
  async registerGithubWebhook(connection: any, trigger: any) {
    const { accessToken } = connection;
    const { repoUrl } = trigger.config;
    const [owner, repoName] = repoUrl.replace('.git', '').split('/').slice(-2);
    const url = `https://api.github.com/repos/${owner}/${repoName}/hooks`;
    const headers = {
      Authorization: `token ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    };
    const body = {
      name: 'web',
      config: {
        url: process.env.WEBHOOK_URL,
        content_type: 'json',
      },
      events: ['push', 'pull_request'],
    };
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error('❌ GitHub webhook error:', response);
      throw new Error('Failed to register GitHub webhook');
    }

    const data = await response.json();
    console.log('✅ GitHub webhook registered:', data.id);

    return data;
  }
}
