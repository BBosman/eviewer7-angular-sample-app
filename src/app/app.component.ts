import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sample-angular-app';
  viewerServerURL = 'http://localhost:8086/api/v1/';

  savingEndpoint = (response) => {
    return new Promise<string>((resolve, reject) => {
      console.info(response);
      // According to https://eviewer.net/developer-guide/#Document_Save_Object there is no annMimeType property?
      const { clientDocID, docContent, annContent/*, annMimeType*/, mimeType } =
        response;
      resolve('SUCCESS');
    });
  };

  ngAfterViewInit(): void {
    this.loadExternalScript('/viewer/js/eViewer7_angular.js').then(() => {
      let eViewerObj: eViewerApp;
      eViewerObj = new eViewerApp('dummy_user');
      const css = [
        { href: './viewer/styles.css' },
        {
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
          integrity:
            'sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=',
          crossorigin: 'anonymous',
        },
      ];

      const scripts = [
        './viewer/runtime.js',
        './viewer/polyfills.js',
        './viewer/scripts.js',
        './viewer/main.js',
        './viewer/js/events.js',
      ];

      var viewerOptions: LoadViewerOptions = {
        contextMenuOptions: {
          overrideContextMenus: true,
          location: [
            'documentView',
            'pageThumbnails',
            'docThumbnails',
            'toolbar',
            'docTab',
          ],
        },
      };

      var documentEndPointOptions: DocumentEndPointOptions = {
        type: 'GET',
        headers: {},
        savePayLoadType: 'application/json'
      }

      eViewerObj
        // It should be `bestFit` instead of `best-fit` according to the docs
        .loadViewer('viewer', scripts, css, 'bestFit', viewerOptions)
        .then(() => {
          eViewerObj.registerLicense(
            'QX0ZUhau5qt0HBLnDQ5XcL+Ih625vvsKCk3fjacNqa/3+F6sDkQFUkso2z6Fi9z/w7MhHwhp0K7q0eX/agSjfY/q9HOBHnr7f4TY81KZosgmOKn0PnHHc0te9+Ps4anZ8G0Ub1lsIO2vL6CNpB5yjHeWY1E+0M7GFQYdtXowd4brMwfESdAvLEPibII77mwVmNvGzyEzNUpX1Krknne2vJzI8+jKs93zu0ADdxPUz1aPqeTTVhwokyPx6aE5aMQJA7/vTBJiIha4h7YX3oWjhgYJWch5AWbrki1VMM/2TetT4DqIzWMXUKWfQqWMHfg43vtIlwDv3ZYSBTZuT+Y3Smp7WbyCHPzoaSY0Bd0DpzJoGIhMr223ike9gqQBfknTQ9cbT0DRlXhjFOgZMaN4NHyKwiLQ6RYLBnFuSR1p1pgYrI4Hqr1/OC1ljSxiuuarUFA9lZ9ptOoWy89UGgR0Yrl1hb6GapM5vso/A6KwMdk='
          );
          let viewerPrefSrvc = eViewerObj.getViewerPreferenceService();
          viewerPrefSrvc
            // The third argument to getUserPreferences is not a boolean according to the docs?
            .getUserPreferences(undefined, undefined)
            .then((preferences) => {
              viewerPrefSrvc
                .setUserPreferences(
                  JSON.stringify(preferences.userPreferences),
                  JSON.stringify(preferences.shortcutPreferences)
                )
                .then((response) => {
                  eViewerObj.setDocumentEndPointOptions(
                    // It was reusing the `loadViewer` options, which seems incorrect.
                    documentEndPointOptions,
                    this.viewerServerURL,
                    this.savingEndpoint
                  );

                  setTimeout(() => {
                    let documentSrvc = eViewerObj.getDocumentService();
                    documentSrvc
                      .loadDocumentWithOptions(
                        'http://localhost:4200/assets/sample.pdf',
                        '',
                        '1',
                        //optional parameter
                        {
                          isEditMode: true,
                          tabStyle: {
                            fileName: 'some-document-description-OUTFOCUS',
                          },
                          focusTabStyle: {
                            fileName: 'some-document-description-INFOCUS',
                          },
                        }
                      )
                      .then((response) => {
                        console.log(response);
                      });
                  }, 1000);
                });
            });
        });
    });
  }

  private loadExternalScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(`Script load error: ${src}`);
      document.head.appendChild(script);
    });
  }
}
