declare class eViewerApp {
  constructor(userName: any);
  documentService: DocumentService;
  editingService: EditingService;
  viewerPreferenceService: ViewerPreferenceService;
  watermarkService: WatermarkService;
  annotationService: AnnotationService;
  signatureService: SignatureService;
  redactionService: RedactionService;
  iconCacheManagerService: IconCacheManagerService;
  docMetadataService: DocMetadataService;
  callBackAPIService: CallBackAPIService;
  scriptsLoaded: boolean;
  styleSheetsLoaded: boolean;
  userName: any;
  resetViewerInProgress: boolean;
  workerScript: string;

  private parseButtons(
    buttons: any,
    leftCommonButtons: any,
    rightCommonButtons: any,
    ribbonCommonButtons: any
  ): void;
  private waitUntilLoded(
    resolve: any,
    reject: any,
    cntrId: any,
    fitTo: any,
    options: any
  ): void;
  private setScannerPluginURL(scannerPluginUrl: string): any;
  private initViewer(): void;
  private resetViewer(): void;

  private setUserName(userName: any): void;
  addJS(scripts: any, containerID: any): void;
  addCSS(styleSheets: any): void;
  setDocumentNameTooltipDirection(direction: any): any;
  onDocumentTabHover(callBack: any): any;
  loadViewer(
    containerID: string,
    scripts: string,
    styleSheets: string,
    fitStyle: string,
    options: any
  ): Promise<any>;
  registerLicense(licenseKey: string, licenseServerUrl?: string): Promise<any>;
  addContentSecurityPolicy(cspPolicy: string): Promise<any>;
  enableShortcutWithoutClick(): void;
  setUserType(userType: string): Promise<any>;
  setDocumentEndPointOptions(
    options: any,
    eViewerUrl?: string,
    savingEndPoint?: any,
    ocrEndPoint?: string,
    hideToolBar?: boolean
  ): Promise<any>;
  alignThumbnails(alignDirection: string): Promise<any>;
  deleteGroup(groupName: string): Promise<any>;
  unGroup(groupName: string): Promise<any>;
  documentInfoByGroup(groupName: string): Promise<any;
  getGroupsInfo(): Promise<any>;
  setGroupsInfo(groupJson: any): Promise<any>;
  splitDocument(splitFromPageNo: string): Promise<any>;
  changeDocumentView(documentViewFormat: string): Promise<any>;
  hideAnnotations(hide: boolean): Promise<any>;
  hideThumbnails(hide: boolean): Promise<any>;
  selectPanning(pan: boolean): Promise<any>;
  addButtons(buttons: any): Promise<any>;
  updateButtons(buttons: any): Promise<any>;
  removeButtons(buttons: any): Promise<any>;
  registerAnnIndicator(callback: any): Promise<any>;
  unloadViewer(): void;
  setTabMenuHandler(fun: any): Promise<any>;
  getDocumentService(): DocumentService;
  getEditingService(): EditingService;
  getViewerPreferenceService(): ViewerPreferenceService;
  getWatermarkService(): WatermarkService;
  getAnnotationService(): AnnotationService;
  getSignatureService(): SignatureService;
  getRedactionService(): RedactionService;
  getIconCacheManagerService(): IconCacheManagerService;
  getDocMeatDataService(): DocMetadataService;
  getCallBackAPIService(): CallBackAPIService;
}

declare class DocumentService {
  constructor(userName: any);
  userName: any;
  private setUserName(userName: any): void;
  private loadWaitSpinner(): void;
  private loadAVFileByURL(avFile: any): Promise<any>;

  insertDocument(file: any, options: any): Promise<any>; 
  loadDocumentWithOptions(
    docUrl: string,
    annotationUrl: any,
    clientDocID: string,
    options: any
  ): Promise<any>;
  setDocumentumCredentials(username: string, password: string, repoType: string): Promise<any>;
  newDocument(filetype: string): Promise<any>;
  getOpenDocuments(): Promise<any>;
  getActiveDocument(): Promise<any>;
  getCurrentPage(): Promise<any>;
  closeDocument(viewerDocID?: string): Promise<any>;
  closeAllDocuments(viewerDocIDs?: any): Promise<any>;
  saveDocument(requireDataInResponse?: boolean): Promise<any>;
  setWorkerSrcUrl(blankPageWorkerSrcUrl?: string): Promise<any>;
  saveDocuments(docIDs?: any, requireDataInResponse?: boolean): Promise<any>;
  saveAllDocuments(): Promise<any>;
  nextPage(): Promise<any>;
  prevPage(): Promise<any>;
  firstPage(): Promise<any>;
  lastPage(): Promise<any>;
  gotoPage(pageNo?: number): Promise<any>;
  invertPages(pageNumbers?: any): Promise<any>;
  setCustomStamps(customStamps?: any): Promise<any>;
  copyToClipboard(pageNumbers?: number): Promise<any>;
  appendDocument(file?: any, fileUrl?: string): Promise<any>;
  getPageCount(viewerDocID?: string): Promise<any>;
  getDocumentInfo(docId?: string): Promise<any>;
  private generateXFDFfile(): any;
  getAllDocumentInfo(): Promise<any>;
  gotoDocument(docID: string): Promise<any>;
  gotoNextDocument(): Promise<any>;
  gotoPreviousDocument(): Promise<any>;
  gotoFirstDocument(): Promise<any>;
  gotoLastDocument(): Promise<any>;
  getActiveDocumentInfo(): Promise<any>;
  getPageInfo(docId: string, pageRange: string): Promise<any>;
  searchText(text: any): Promise<any>;
  filterPages(docId: string, pageFilters: any): Promise<any>;
  showOnlyPages(docId: string, pages: any): Promise<any>;
  hideOnlyPages(docId: string, pages: any): Promise<any>;
  setDocumentTabStyle(viewerDocID: string, tabStyle: any, focusTabStyle: any): Promise<any>;
  getDocumentTabStyle(viewerDocID: string): Promise<any>;
  setFileName(viewerDocID: string, fileName: string): Promise<any>;
  getFileName(viewerDocID: string): Promise<any>;
  setSelectedPages(pages: any): Promise<any>;
  getSelectedPages(includeCurrentPage: boolean): Promise<any>;
  clearSelectedPages(): Promise<any>;
  getPageInfoByRange(docId: string, pageRange: any): Promise<any>;
  setDocumentScrollMode(docId: string, scrollMode: string): Promise<any>;
  getAttachments(docId: string): Promise<any>;
  undo(docId: string): Promise<any>;
  redo(docId: string): Promise<any>;
}

declare class EditingService {
  constructor(userName: string);
  userName: string;
  private setUserName(userName: string): void;
  zoomIn(): Promise<any>;
  zoomOut(): Promise<any>;
  rotateClockwise(): Promise<any>;
  setDirty(docID: string, dirty: boolean): Promise<any>;
  rotateCounterClockwise(): Promise<any>;
  rotate180(): Promise<any>;
  rotateByAngle(angle: number): Promise<any>;
  zoomTo(preset: string): Promise<any>;
  deletePage(): Promise<any>;
  copyPage(): Promise<any>;
  cutPage(): Promise<any>;
  pastePage(): Promise<any>;
  exportDocument(options: any): Promise<any>;
  printDocument(options: any): Promise<any>;
  snipArea(options: any): Promise<any>;
  docExportWithOptions(options: any): Promise<any>;
  getCurrentScale(docId: string): Promise<any>;
  getCurrentRotation(docId: string, pageNo: number): Promise<any>;
  nativeDocumentDownloading(docId: string, filename: string): Promise<any>;
}

declare class ViewerPreferenceService {
  constructor(userName: any);
  userName: any;
  defaultPrefJSON: {
    userInfo: {
      userId: string;
      username: string;
    };
    leftDocToolbar: {
      hideThumbnails: boolean;
      panning: boolean;
      zoom: boolean;
      rotate: boolean;
      fitToWindow: boolean;
      fitToWidth: boolean;
      actual: boolean;
      rubberbandZoom: boolean;
      'undo-redo': boolean;
    };
    rightViewerToolbar: {
      uploadDocument: boolean;
      viewCheckpoints: boolean;
      insertDocument: boolean;
      settings: {
        insertDocument: boolean;
        exportDocument: boolean;
        download: boolean;
        print: boolean;
        saveDocument: boolean;
        newDocument: boolean;
      };
      scanDocument: boolean;
      closeFile: boolean;
      closeAllFile: boolean;
      documentSwitching: boolean;
      viewComments: boolean;
      docMetadata: boolean;
      addNotes: boolean;
      userPreferences: boolean;
      info: boolean;
    };
    rightDocToolbar: {
      pageNavigation: boolean;
    };
    thumbnailToolbar: {
      popInOut: boolean;
    };
    ribbonToolbar: (
      | {
          name: string;
          isViewTabVisible: boolean;
          children: {
            split: boolean;
            undo: boolean;
            invert: boolean;
            copyPgToClipboard: boolean;
            thumbnailView: boolean;
            sideBysideViewVertical: boolean;
            sideBysideViewHorizontal: boolean;
            textSearch: boolean;
            selectText: boolean;
            cutCopyPaste?: undefined;
            deletePage?: undefined;
            checkpoint?: undefined;
            appendDocument?: undefined;
            watermark?: undefined;
            snippingTool?: undefined;
            blankPage?: undefined;
            cropPage?: undefined;
            line?: undefined;
            arrow?: undefined;
            circle?: undefined;
            rectangle?: undefined;
            pen?: undefined;
            highlight?: undefined;
            textAnnotation?: undefined;
            stamp?: undefined;
            polyLine?: undefined;
            polygon?: undefined;
            cloud?: undefined;
            stickynote?: undefined;
            button?: undefined;
            showHideAnn?: undefined;
            redactSelectText?: undefined;
            redactWord?: undefined;
            redaction?: undefined;
            searchRedact?: undefined;
            clearRedaction?: undefined;
            redactPage?: undefined;
            redactViewMode?: undefined;
            drawSignature?: undefined;
            previousPageSpeech?: undefined;
            play?: undefined;
            pause?: undefined;
            stop?: undefined;
            nextPageSpeech?: undefined;
            speechSpeed?: undefined;
            comparedocsView?: undefined;
            startSync?: undefined;
            closeCompareDocuments?: undefined;
            comparePanel?: undefined;
            addSnapshot?: undefined;
            openSnapshotAsNewDocument?: undefined;
            enableDisableCommentSubtitle?: undefined;
          };
          isInsertTabVisible?: undefined;
          isAnnotationTabVisible?: undefined;
          isRedactTabVisible?: undefined;
          isSignatureTabVisible?: undefined;
          isSpeechTabVisible?: undefined;
          isCompareTabVisible?: undefined;
          isMedifyTabVisible?: undefined;
        }
      | {
          name: string;
          isInsertTabVisible: boolean;
          children: {
            cutCopyPaste: boolean;
            deletePage: boolean;
            checkpoint: boolean;
            appendDocument: boolean;
            watermark: boolean;
            snippingTool: boolean;
            blankPage: boolean;
            cropPage: boolean;
            split?: undefined;
            undo?: undefined;
            invert?: undefined;
            copyPgToClipboard?: undefined;
            thumbnailView?: undefined;
            sideBysideViewVertical?: undefined;
            sideBysideViewHorizontal?: undefined;
            textSearch?: undefined;
            selectText?: undefined;
            line?: undefined;
            arrow?: undefined;
            circle?: undefined;
            rectangle?: undefined;
            pen?: undefined;
            highlight?: undefined;
            textAnnotation?: undefined;
            stamp?: undefined;
            polyLine?: undefined;
            polygon?: undefined;
            cloud?: undefined;
            stickynote?: undefined;
            button?: undefined;
            showHideAnn?: undefined;
            redactSelectText?: undefined;
            redactWord?: undefined;
            redaction?: undefined;
            searchRedact?: undefined;
            clearRedaction?: undefined;
            redactPage?: undefined;
            redactViewMode?: undefined;
            drawSignature?: undefined;
            previousPageSpeech?: undefined;
            play?: undefined;
            pause?: undefined;
            stop?: undefined;
            nextPageSpeech?: undefined;
            speechSpeed?: undefined;
            comparedocsView?: undefined;
            startSync?: undefined;
            closeCompareDocuments?: undefined;
            comparePanel?: undefined;
            addSnapshot?: undefined;
            openSnapshotAsNewDocument?: undefined;
            enableDisableCommentSubtitle?: undefined;
          };
          isViewTabVisible?: undefined;
          isAnnotationTabVisible?: undefined;
          isRedactTabVisible?: undefined;
          isSignatureTabVisible?: undefined;
          isSpeechTabVisible?: undefined;
          isCompareTabVisible?: undefined;
          isMedifyTabVisible?: undefined;
        }
      | {
          name: string;
          isAnnotationTabVisible: boolean;
          children: {
            line: boolean;
            arrow: boolean;
            circle: boolean;
            rectangle: boolean;
            pen: boolean;
            highlight: boolean;
            textAnnotation: boolean;
            stamp: boolean;
            polyLine: boolean;
            polygon: boolean;
            cloud: boolean;
            stickynote: boolean;
            button: boolean;
            showHideAnn: boolean;
            split?: undefined;
            undo?: undefined;
            invert?: undefined;
            copyPgToClipboard?: undefined;
            thumbnailView?: undefined;
            sideBysideViewVertical?: undefined;
            sideBysideViewHorizontal?: undefined;
            textSearch?: undefined;
            selectText?: undefined;
            cutCopyPaste?: undefined;
            deletePage?: undefined;
            checkpoint?: undefined;
            appendDocument?: undefined;
            watermark?: undefined;
            snippingTool?: undefined;
            blankPage?: undefined;
            cropPage?: undefined;
            redactSelectText?: undefined;
            redactWord?: undefined;
            redaction?: undefined;
            searchRedact?: undefined;
            clearRedaction?: undefined;
            redactPage?: undefined;
            redactViewMode?: undefined;
            drawSignature?: undefined;
            previousPageSpeech?: undefined;
            play?: undefined;
            pause?: undefined;
            stop?: undefined;
            nextPageSpeech?: undefined;
            speechSpeed?: undefined;
            comparedocsView?: undefined;
            startSync?: undefined;
            closeCompareDocuments?: undefined;
            comparePanel?: undefined;
            addSnapshot?: undefined;
            openSnapshotAsNewDocument?: undefined;
            enableDisableCommentSubtitle?: undefined;
          };
          isViewTabVisible?: undefined;
          isInsertTabVisible?: undefined;
          isRedactTabVisible?: undefined;
          isSignatureTabVisible?: undefined;
          isSpeechTabVisible?: undefined;
          isCompareTabVisible?: undefined;
          isMedifyTabVisible?: undefined;
        }
      | {
          name: string;
          isRedactTabVisible: boolean;
          children: {
            redactSelectText: boolean;
            redactWord: boolean;
            redaction: boolean;
            searchRedact: boolean;
            clearRedaction: boolean;
            redactPage: boolean;
            redactViewMode: boolean;
            split?: undefined;
            undo?: undefined;
            invert?: undefined;
            copyPgToClipboard?: undefined;
            thumbnailView?: undefined;
            sideBysideViewVertical?: undefined;
            sideBysideViewHorizontal?: undefined;
            textSearch?: undefined;
            selectText?: undefined;
            cutCopyPaste?: undefined;
            deletePage?: undefined;
            checkpoint?: undefined;
            appendDocument?: undefined;
            watermark?: undefined;
            snippingTool?: undefined;
            blankPage?: undefined;
            cropPage?: undefined;
            line?: undefined;
            arrow?: undefined;
            circle?: undefined;
            rectangle?: undefined;
            pen?: undefined;
            highlight?: undefined;
            textAnnotation?: undefined;
            stamp?: undefined;
            polyLine?: undefined;
            polygon?: undefined;
            cloud?: undefined;
            stickynote?: undefined;
            button?: undefined;
            showHideAnn?: undefined;
            drawSignature?: undefined;
            previousPageSpeech?: undefined;
            play?: undefined;
            pause?: undefined;
            stop?: undefined;
            nextPageSpeech?: undefined;
            speechSpeed?: undefined;
            comparedocsView?: undefined;
            startSync?: undefined;
            closeCompareDocuments?: undefined;
            comparePanel?: undefined;
            addSnapshot?: undefined;
            openSnapshotAsNewDocument?: undefined;
            enableDisableCommentSubtitle?: undefined;
          };
          isViewTabVisible?: undefined;
          isInsertTabVisible?: undefined;
          isAnnotationTabVisible?: undefined;
          isSignatureTabVisible?: undefined;
          isSpeechTabVisible?: undefined;
          isCompareTabVisible?: undefined;
          isMedifyTabVisible?: undefined;
        }
      | {
          name: string;
          isSignatureTabVisible: boolean;
          children: {
            drawSignature: boolean;
            split?: undefined;
            undo?: undefined;
            invert?: undefined;
            copyPgToClipboard?: undefined;
            thumbnailView?: undefined;
            sideBysideViewVertical?: undefined;
            sideBysideViewHorizontal?: undefined;
            textSearch?: undefined;
            selectText?: undefined;
            cutCopyPaste?: undefined;
            deletePage?: undefined;
            checkpoint?: undefined;
            appendDocument?: undefined;
            watermark?: undefined;
            snippingTool?: undefined;
            blankPage?: undefined;
            cropPage?: undefined;
            line?: undefined;
            arrow?: undefined;
            circle?: undefined;
            rectangle?: undefined;
            pen?: undefined;
            highlight?: undefined;
            textAnnotation?: undefined;
            stamp?: undefined;
            polyLine?: undefined;
            polygon?: undefined;
            cloud?: undefined;
            stickynote?: undefined;
            button?: undefined;
            showHideAnn?: undefined;
            redactSelectText?: undefined;
            redactWord?: undefined;
            redaction?: undefined;
            searchRedact?: undefined;
            clearRedaction?: undefined;
            redactPage?: undefined;
            redactViewMode?: undefined;
            previousPageSpeech?: undefined;
            play?: undefined;
            pause?: undefined;
            stop?: undefined;
            nextPageSpeech?: undefined;
            speechSpeed?: undefined;
            comparedocsView?: undefined;
            startSync?: undefined;
            closeCompareDocuments?: undefined;
            comparePanel?: undefined;
            addSnapshot?: undefined;
            openSnapshotAsNewDocument?: undefined;
            enableDisableCommentSubtitle?: undefined;
          };
          isViewTabVisible?: undefined;
          isInsertTabVisible?: undefined;
          isAnnotationTabVisible?: undefined;
          isRedactTabVisible?: undefined;
          isSpeechTabVisible?: undefined;
          isCompareTabVisible?: undefined;
          isMedifyTabVisible?: undefined;
        }
      | {
          name: string;
          isSpeechTabVisible: boolean;
          children: {
            previousPageSpeech: boolean;
            play: boolean;
            pause: boolean;
            stop: boolean;
            nextPageSpeech: boolean;
            speechSpeed: boolean;
            split?: undefined;
            undo?: undefined;
            invert?: undefined;
            copyPgToClipboard?: undefined;
            thumbnailView?: undefined;
            sideBysideViewVertical?: undefined;
            sideBysideViewHorizontal?: undefined;
            textSearch?: undefined;
            selectText?: undefined;
            cutCopyPaste?: undefined;
            deletePage?: undefined;
            checkpoint?: undefined;
            appendDocument?: undefined;
            watermark?: undefined;
            snippingTool?: undefined;
            blankPage?: undefined;
            cropPage?: undefined;
            line?: undefined;
            arrow?: undefined;
            circle?: undefined;
            rectangle?: undefined;
            pen?: undefined;
            highlight?: undefined;
            textAnnotation?: undefined;
            stamp?: undefined;
            polyLine?: undefined;
            polygon?: undefined;
            cloud?: undefined;
            stickynote?: undefined;
            button?: undefined;
            showHideAnn?: undefined;
            redactSelectText?: undefined;
            redactWord?: undefined;
            redaction?: undefined;
            searchRedact?: undefined;
            clearRedaction?: undefined;
            redactPage?: undefined;
            redactViewMode?: undefined;
            drawSignature?: undefined;
            comparedocsView?: undefined;
            startSync?: undefined;
            closeCompareDocuments?: undefined;
            comparePanel?: undefined;
            addSnapshot?: undefined;
            openSnapshotAsNewDocument?: undefined;
            enableDisableCommentSubtitle?: undefined;
          };
          isViewTabVisible?: undefined;
          isInsertTabVisible?: undefined;
          isAnnotationTabVisible?: undefined;
          isRedactTabVisible?: undefined;
          isSignatureTabVisible?: undefined;
          isCompareTabVisible?: undefined;
          isMedifyTabVisible?: undefined;
        }
      | {
          name: string;
          isCompareTabVisible: boolean;
          children: {
            comparedocsView: boolean;
            startSync: boolean;
            closeCompareDocuments: boolean;
            comparePanel: boolean;
            split?: undefined;
            undo?: undefined;
            invert?: undefined;
            copyPgToClipboard?: undefined;
            thumbnailView?: undefined;
            sideBysideViewVertical?: undefined;
            sideBysideViewHorizontal?: undefined;
            textSearch?: undefined;
            selectText?: undefined;
            cutCopyPaste?: undefined;
            deletePage?: undefined;
            checkpoint?: undefined;
            appendDocument?: undefined;
            watermark?: undefined;
            snippingTool?: undefined;
            blankPage?: undefined;
            cropPage?: undefined;
            line?: undefined;
            arrow?: undefined;
            circle?: undefined;
            rectangle?: undefined;
            pen?: undefined;
            highlight?: undefined;
            textAnnotation?: undefined;
            stamp?: undefined;
            polyLine?: undefined;
            polygon?: undefined;
            cloud?: undefined;
            stickynote?: undefined;
            button?: undefined;
            showHideAnn?: undefined;
            redactSelectText?: undefined;
            redactWord?: undefined;
            redaction?: undefined;
            searchRedact?: undefined;
            clearRedaction?: undefined;
            redactPage?: undefined;
            redactViewMode?: undefined;
            drawSignature?: undefined;
            previousPageSpeech?: undefined;
            play?: undefined;
            pause?: undefined;
            stop?: undefined;
            nextPageSpeech?: undefined;
            speechSpeed?: undefined;
            addSnapshot?: undefined;
            openSnapshotAsNewDocument?: undefined;
            enableDisableCommentSubtitle?: undefined;
          };
          isViewTabVisible?: undefined;
          isInsertTabVisible?: undefined;
          isAnnotationTabVisible?: undefined;
          isRedactTabVisible?: undefined;
          isSignatureTabVisible?: undefined;
          isSpeechTabVisible?: undefined;
          isMedifyTabVisible?: undefined;
        }
      | {
          name: string;
          isMedifyTabVisible: boolean;
          children: {
            addSnapshot: boolean;
            openSnapshotAsNewDocument: boolean;
            enableDisableCommentSubtitle: boolean;
            split?: undefined;
            undo?: undefined;
            invert?: undefined;
            copyPgToClipboard?: undefined;
            thumbnailView?: undefined;
            sideBysideViewVertical?: undefined;
            sideBysideViewHorizontal?: undefined;
            textSearch?: undefined;
            selectText?: undefined;
            cutCopyPaste?: undefined;
            deletePage?: undefined;
            checkpoint?: undefined;
            appendDocument?: undefined;
            watermark?: undefined;
            snippingTool?: undefined;
            blankPage?: undefined;
            cropPage?: undefined;
            line?: undefined;
            arrow?: undefined;
            circle?: undefined;
            rectangle?: undefined;
            pen?: undefined;
            highlight?: undefined;
            textAnnotation?: undefined;
            stamp?: undefined;
            polyLine?: undefined;
            polygon?: undefined;
            cloud?: undefined;
            stickynote?: undefined;
            button?: undefined;
            showHideAnn?: undefined;
            redactSelectText?: undefined;
            redactWord?: undefined;
            redaction?: undefined;
            searchRedact?: undefined;
            clearRedaction?: undefined;
            redactPage?: undefined;
            redactViewMode?: undefined;
            drawSignature?: undefined;
            previousPageSpeech?: undefined;
            play?: undefined;
            pause?: undefined;
            stop?: undefined;
            nextPageSpeech?: undefined;
            speechSpeed?: undefined;
            comparedocsView?: undefined;
            startSync?: undefined;
            closeCompareDocuments?: undefined;
            comparePanel?: undefined;
          };
          isViewTabVisible?: undefined;
          isInsertTabVisible?: undefined;
          isAnnotationTabVisible?: undefined;
          isRedactTabVisible?: undefined;
          isSignatureTabVisible?: undefined;
          isSpeechTabVisible?: undefined;
          isCompareTabVisible?: undefined;
        }
    )[];
    general: {
      displayAnnIndicator: boolean;
      view: string;
      zoomPreference: string;
      newDocPre: string;
      switchThumb: string;
      isLogEnabled: boolean;
      selectedOption: string;
      isOcrEnabled: boolean;
      firstChunkSize: number;
      cacheManagerSize: number;
      tabGrouping: boolean;
      waitTime: number;
      annComments: boolean;
      showDocThumbBar: boolean;
      showDocSignPanel: boolean;
      autogrowDocTabWidth: boolean;
      embedAnnotationOnStamping: boolean;
      enablePDFLockAfterSigning: boolean;
      pdfFlattening: boolean;
      thumbnailZoomControls: boolean;
      redactInJSON: boolean;
      saveOnlyIfModified: boolean;
      blockingSpinnerOnSave: boolean;
      hideInViewerNotifications: boolean;
      enableHyperlinksByRegEx: string;
      skipSaveCheckOnUnload: boolean;
      saveAnnotationAsMimeType: string;
      clearViewerObject: boolean;
      showGroupingOptions: boolean;
    };
    docTabPreferences: {
      focusTabStyle: {
        backgroundColor: string;
        color: string;
        fontWeight: string;
        fontStyle: string;
        fileName: string;
        icon: string;
      };
      tabStyle: {
        backgroundColor: string;
        color: string;
        fontWeight: string;
        fontStyle: string;
        fileName: string;
        icon: string;
      };
    };
    compareDocsPreference: {
      detailPreference: {
        fullDetail: boolean;
      };
      displayPreference: {
        textInfo: boolean;
        imageInfo: boolean;
        graphicsInfo: boolean;
        annotInfo: boolean;
      };
    };
    commentStatus: {
      iconUrl: string;
      text: string;
    }[];
  };
  defaultShortcutPrefJSON: {
    shortcuts: {
      key: string;
      command: string;
      title: string;
    }[];
  };
  defaultAnnotationPropertyJSON: (
    | {
        annType: string;
        borderWidth: string;
        fillColor: string;
        fillOpacity: string;
        borderColor: string;
        borderOpacity?: undefined;
        fontColor?: undefined;
        fontOpacity?: undefined;
        fontFace?: undefined;
        fontSize?: undefined;
        wrapText?: undefined;
      }
    | {
        annType: string;
        fillColor: string;
        fillOpacity: string;
        borderWidth?: undefined;
        borderColor?: undefined;
        borderOpacity?: undefined;
        fontColor?: undefined;
        fontOpacity?: undefined;
        fontFace?: undefined;
        fontSize?: undefined;
        wrapText?: undefined;
      }
    | {
        annType: string;
        borderWidth: string;
        borderOpacity: string;
        borderColor: string;
        fillColor?: undefined;
        fillOpacity?: undefined;
        fontColor?: undefined;
        fontOpacity?: undefined;
        fontFace?: undefined;
        fontSize?: undefined;
        wrapText?: undefined;
      }
    | {
        annType: string;
        borderWidth: string;
        fillColor: string;
        borderOpacity: string;
        fillOpacity: string;
        borderColor: string;
        fontColor?: undefined;
        fontOpacity?: undefined;
        fontFace?: undefined;
        fontSize?: undefined;
        wrapText?: undefined;
      }
    | {
        annType: string;
        borderWidth: string;
        fillColor: string;
        fillOpacity?: undefined;
        borderColor?: undefined;
        borderOpacity?: undefined;
        fontColor?: undefined;
        fontOpacity?: undefined;
        fontFace?: undefined;
        fontSize?: undefined;
        wrapText?: undefined;
      }
    | {
        annType: string;
        borderWidth: string;
        borderColor: string;
        fillColor: string;
        fillOpacity: string;
        fontColor: string;
        fontOpacity: string;
        fontFace: string;
        fontSize: string;
        wrapText: string;
        borderOpacity?: undefined;
      }
    | {
        annType: string;
        fillColor: string;
        fontColor: string;
        borderWidth?: undefined;
        fillOpacity?: undefined;
        borderColor?: undefined;
        borderOpacity?: undefined;
        fontOpacity?: undefined;
        fontFace?: undefined;
        fontSize?: undefined;
        wrapText?: undefined;
      }
    | {
        annType: string;
        fillColor: string;
        borderWidth?: undefined;
        fillOpacity?: undefined;
        borderColor?: undefined;
        borderOpacity?: undefined;
        fontColor?: undefined;
        fontOpacity?: undefined;
        fontFace?: undefined;
        fontSize?: undefined;
        wrapText?: undefined;
      }
    | {
        annType: string;
        borderColor: string;
        borderWidth: string;
        fillColor: string;
        fontColor: string;
        fontFace: string;
        fontSize: string;
        fillOpacity?: undefined;
        borderOpacity?: undefined;
        fontOpacity?: undefined;
        wrapText?: undefined;
      }
    | {
        annType: string;
        borderWidth: string;
        fillColor: string;
        fillOpacity: string;
        borderColor?: undefined;
        borderOpacity?: undefined;
        fontColor?: undefined;
        fontOpacity?: undefined;
        fontFace?: undefined;
        fontSize?: undefined;
        wrapText?: undefined;
      }
  )[];
  defaultActionScriptJSON: {
    name: string;
    value: string;
    pdfvalue: string;
  }[];
  private setUserName(userName: string): void;
  setUserPreferences(
    preferences?: any,
    shortcutPreferences?: any,
    annotationPferences?: any
  ): Promise<any>;
  getUserPreferences(
    defaultPrefJSON?: any,
    defaultShortcutPrefJSON?: any,
    defaultAnnotationPrefJSON?: any,
    loadFromAssets?: any
  ): Promise<any>;
  loadUserPreferences(
    defaultPrefJSON?: any,
    defaultShortcutPrefJSON?: any,
    defaultAnnotationPrefJSON?: any,
    loadFromAssets?: any
  ): Promise<any>;
}

declare class WatermarkService {
  constructor(userName: string);
  userName: string;
  private setUserName(userName: string): void;
  addWatermark(properties: any): Promise<any>;
  editWatermark(properties: any): Promise<any>;
  deleteWatermark(watermarkId: any): Promise<any>;
}

declare class AnnotationService {
  constructor(userName: string);
  userName: string;
  private setUserName(userName: string): void;
  selectShape(annType: string, options: any): Promise<any>;
  editShape(annId: string, pageNo: string, position: any, options: any): Promise<any>;
  deleteShape(pageNo: string, annId: string): Promise<any>;
  addReply(annId: string, replyText: string): Promise<any>;
  getAllReplies(annId: string): Promise<any>;
  getStamps(loadFromAssets: boolean): Promise<any>;
  private setactionScripts(): void;
  drawShapes(pageNo: number, position: any, options: any): Promise<any>;
  addLinkToAnnotation(annId: string, options: any): void;
  updateCommentOrReply(annId: string, textUpdate: string, replyId: string): Promise<any>;
  removeReply(replyId: string, annId: string): Promise<any>;
  removeAllReplies(annId: string): Promise<any>;
  getReplyByUser(annId: string): Promise<any>;
  getAllAnnotations(userName: string): Promise<any>;
  getAnnotationDetails(annId: string): Promise<any>;
  getFilteredAnnotations(userName: string, annType: string, pageNo: number): Promise<any>;
  setDrawingMode(modeName: string): Promise<any>;
  getDrawingMode(): Promise<any>;
}

declare class IconCacheManagerService {
  constructor(userName: string);
  userName: string;
  private setUserName(userName: string): void;
  invalidateThumbnailIconForPages(options: any): Promise<any>;
  getCacheInfo(): Promise<any>;
}

declare class SignatureService {
  constructor(userName: string);
  userName: string;
  private setUserName(userName: string): void;
  setAvailableCertificates(certificates: any): any;
  setAvailableAppearances(appearances: any): any;
}

declare class RedactionService {
  drawRedaction(pageRange: any, position: any, options: any): Promise<any>;
  redactWord(redactWord: string, options: any): Promise<any>;
  clearRedaction(pageRange: any): Promise<any>;
  redactExpressions(expressions: string, selectedTag: string): Promise<any>;
  getDetails(pageRange: any): Promise<any>;
  switchRedactViewMode(): Promise<any>;
  private setUserName(userName: string): void;
  userName: string;
}

declare class DocMetadataService {
  constructor(userName: string);
  userName: string;
  private setUserName(userName: string): void;
  setMetaData(data: any): Promise<any>;
  getMetaData(): Promise<any>;
  private getAllMetaData(data: any): Promise<any>;
}

declare class CallBackAPIService {
  constructor(username: string);
  userName: string;
  private setUserName(userName: string): void;
  setPageChangedCallback(callBack: any): void;
  setDocLoadCompleteCallback(callBack: any): void;
  setFirstPageRenderedCallback(callBack: any): void;
  setCustomButtonClickedCallback(callBack: any): void;
  setDocSaveCompleteCallback(callBack: any): void;
  setDocSplitCallback(callBack: any): void;
  setDocDroppedCallback(callBack: any): void;
  setAnnCreatedCallback(callBack: any): void;
  setAnnDeletedCallback(callBack: any): void;
  setAnnPropUpdatedCallback(callBack: any): void;
  setWmPropUpdatedCallback(callBack: any): void;
  setButtonAnnClickedCallback(callBack: any): void;
  setDocExportedCallback(callBack: any): void;
  setPageDeletedCallback(callBack: any): void;
  setPageCutCallback(callBack: any): void;
  setPageCopiedCallback(callBack: any): void;
  setPagePastedCallback(callBack: any): void;
  setTextSelectedCallback(callBack: any): void;
  setNewCertificateCallback(callBack: any): void;
  setUpdateDefaultCertificateCallback(callBack: any): void;
  setNewAppearanceCallback(callBack: any): void;
  setPreferenceUpdateCallback(callBack: any): void;
  setZoomChangeCallback(callBack: any): void;
  setOnContextMenuCallback(callBack: any): void;
  setDocRedactCallback(callBack: any): void;
  setTabSwitchCallback(callBack: any): void;
  setRotationCallback(callBack: any): void;
  setDrawingModeChangeCallback(callBack: any): void;
}
