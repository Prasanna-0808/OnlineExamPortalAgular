 
  import { bootstrapApplication } from '@angular/platform-browser';
  import  { App } from './app/app';
  import { appConfig } from './app/app.config';
  import { provideRouter } from '@angular/router';
  import { routes } from './app/app.routes';
 
import { provideHttpClient } from '@angular/common/http';
 
 
  bootstrapApplication(App, {
    providers: [provideRouter(routes),
      provideHttpClient()
    ]
  });
 
 
