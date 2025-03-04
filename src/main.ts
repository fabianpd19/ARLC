import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // 🔥 Nueva forma de inyectar HttpClient en Standalone

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()] // Usa provideHttpClient en lugar de importProvidersFrom(HttpClientModule)
}).catch(err => console.error(err));
