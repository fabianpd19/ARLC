import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; 
import { provideRouter } from '@angular/router';  // 👈 Importa provideRouter
import { routes } from './app/app.routes';       // 👈 Importa las rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) // 👈 Agrega las rutas aquí
  ]
}).catch(err => console.error(err));
