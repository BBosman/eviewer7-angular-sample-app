declare class eViewerApp {
  constructor(userName: string);
  setUserName(userName: string): void;
  setUserType(userType: 'NORMAL' | 'SUPER_USER' | 'VIEW_ONLY'): Promise<void>;
  loadViewer(
    containerID: string,
    scripts: string[],
    styleSheets: { href: string; integrity?: string; crossorigin?: string }[],
    fitStyle?: 'default' | 'bestFit',
    options?: LoadViewerOptions
  ): Promise<void>;
  setDocumentEndPointOptions(
    options: DocumentEndPointOptions,
    eViewerUrl?: string,
    savingEndPoint?:
      | string
      | ((response: DocumentSaveObject) => Promise<string>),
    ocrEndPoint?: string
  ): Promise<void>;
  registerLicense(licenseKey: string, licenseServerUrl?: string): Promise<void>;
  setScannerPluginURL(scannerPluginUrl: string): Promise<void>;
  toggleThumbnail(): Promise<void>;
  alignThumbnails(
    alignDirection: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'
  ): Promise<void>;
  hideAnnotations(hide: boolean): Promise<void>;
  hideThumbnails(hide: boolean): Promise<void>;
  selectPanning(pan: boolean): Promise<void>;
  addButtons(buttons: ToolbarButton[]): Promise<void>;
  updateButtons(buttons: ToolbarButton[]): Promise<void>;
  removeButtons(buttons: ToolbarButton[]): Promise<void>;
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
  onDocumentTabHover(
    callback: (viewerDocID: string, inFocus: boolean) => void
  ): void;
  setDocumentNameTooltipDirection(
    direction: 'DEFAULT' | 'WEST' | 'EAST' | 'NORTH' | 'SOUTH'
  ): Promise<void>;
  addContentSecurityPolicy(cspPolicy: string): Promise<void>;
  splitDocument(splitFromPageNo: string | number): Promise<void>;
  changeDocumentView(
    documentViewFormat: 'normalView' | 'thumbView' | 'sideBySideView'
  ): Promise<void>;
  unloadViewer(): void;
  setTabMenuHandler(fun: (docID: string) => MenuItem[]): Promise<void>;
  enableShortcutWithoutClick(): void;
}

declare class DocumentService {
  insertDocument(
    file: { name: string; type: string; size: number },
    options: { pageFilters: PageFilter[] }
  ): Promise<string>;
  loadDocumentWithOptions(
    docUrl:
      | string
      | {
          docUrl: string;
          requestType: string;
          requestContentType: string;
          requestBody: string;
        }
      | { documentId: string; displayName: string }[],
    annotationUrl:
      | string
      | {
          annUrl: string;
          requestType: string;
          requestContentType: string;
          requestBody: string;
        },
    clientDocID?: string,
    options?: LoadDocumentOptions
  ): Promise<{ viewerDocID: string; clientDocID: string }>;
  newDocument(filetype: 'PDF' | 'TIFF'): Promise<{ viewerDocID: string }>;
  getOpenDocuments(): Promise<{ viewerDocID: string; clientDocID: string }[]>;
  getActiveDocument(): Promise<{ viewerDocID: string; clientDocID: string }>;
  getCurrentPage(): Promise<{ currentPage: number }>;
  getSelectedPages(includeCurrentPage: boolean): Promise<number[]>;
  setSelectedPages(pages: number[]): Promise<void>;
  clearSelectedPages(): Promise<void>;
  closeDocument(viewerDocID?: string): Promise<{ viewerDocID: string }>;
  closeAllDocuments(): Promise<void>;
  saveDocument(requireDataInResponse?: boolean): Promise<DocumentSaveObject>;
  saveDocuments(
    docIDs?: string[],
    requireDataInResponse?: boolean
  ): Promise<DocumentSaveObject[]>;
  saveAllDocuments(): Promise<void>;
  nextPage(): Promise<void>;
  prevPage(): Promise<void>;
  firstPage(): Promise<void>;
  lastPage(): Promise<void>;
  gotoPage(pageNo?: number): Promise<void>;
  gotoDocument(docID: string): Promise<void>;
  gotoNextDocument(): Promise<string>;
  gotoPreviousDocument(): Promise<string>;
  gotoFirstDocument(): Promise<string>;
  gotoLastDocument(): Promise<string>;
  appendDocument(
    file: { name: string; type: string; size: number },
    base64FileData: string
  ): Promise<number>;
  getPageCount(docId: string): Promise<number>;
  filterPages(docId: string, pageFilters: PageFilter[]): void;
  showOnlyPages(docId: string, pages: number[]): Promise<{ success: boolean }>;
  hideOnlyPages(docId: string, pages: number[]): Promise<{ success: boolean }>;
  getActiveDocumentInfo(): Promise<DocumentInfo>;
  getPageInfoByRange(
    docId: string,
    pageRange: number | number[]
  ): Promise<
    {
      pageNo: number;
      visible: boolean;
      height: number;
      width: number;
      xDPI: number;
      yDPI: number;
      bitDepth: 1 | 4 | 8 | 16 | 24 | 32;
    }[]
  >;
  searchText(text: string): Promise<number>;
  invertPages(pageNumbers: number[]): Promise<void>;
  setDocumentTabStyle(
    viewerDocID: string,
    tabStyle: StyleObject,
    focusTabStyle: StyleObject
  ): Promise<void>;
  getDocumentTabStyle(
    viewerDocID: string
  ): Promise<{ style: StyleObject; focusStyle: StyleObject }>;
  getAttachments(
    docId: string
  ): Promise<{ content: Uint8Array; name: string }[]>;
  setDocumentScrollMode(
    docId: string,
    scrollMode: 'page' | 'continuous'
  ): Promise<void>;
  getDocumentInfo(docId: string): Promise<DocumentInfo>;
  getAllDocumentInfo(): Promise<DocumentInfo[]>;
  setDirty(docID: string, dirty: boolean): Promise<void>;
  setGroupsInfo(groupDef: GroupDefinitionObject): Promise<void>;
  getDocumentInfoByGroup(groupName: string): Promise<GroupObject>;
  getGroupsInfo(): Promise<GroupDefinitionObject>;
  deleteGroup(groupName: string): Promise<void>;
  unGroup(groupName: string): Promise<void>;
  setDocumentumCredentials(username: string, password: string): Promise<void>;
  undo(): Promise<void>;
  redo(): Promise<void>;
  copyToClipboard(pageNo: number): Promise<void>;
}

declare class EditingService {
  zoomIn(): Promise<number>;
  zoomOut(): Promise<number>;
  // The docs at https://eviewer.net/developer-guide have one return the current rotation angle and the other not. Seems supicious?
  rotateClockwise(): Promise<number>;
  rotateCounterClockwise(): Promise<number>;
  rotate180(): Promise<number>;
  rotateByAngle(angle: 90 | 180 | 270): Promise<number>;
  zoomTo(
    preset: 'Fit To Width' | 'Fit To Window' | 'Fit To Height' | 'Actual Size'
  ): Promise<number>;
  deletePage(): Promise<void>;
  copyPage(): Promise<void>;
  cutPage(): Promise<void>;
  pastePage(): Promise<void>;
  snipArea(options: {
    pageNo: number;
    startX: number;
    endX: number;
    startY: number;
    endY: number;
  }): Promise<void>;
  nativeDocumentDownloading(docId: string, filename: string): Promise<void>;
  getCurrentScale(docId: string): Promise<{
    docId: string;
    scale: number;
    zoomPreset: 'fitToWindow' | 'fitToWidth' | 'none';
  }>;
  getCurrentRotation(
    docId: string,
    pageNo: number
  ): Promise<{ docId: string; rotation: 0 | 90 | 180 | 270 }>;
  docExportWithOptions(options: {
    exportType: 'DOWNLOAD' | 'EXPORT' | 'PRINT';
    pageFilters:
      | 'currentPage'
      | 'currentDocument'
      | 'selectedPages'
      | 'allDocuments'
      | number[];
    // The docs at https://eviewer.net/developer-guide has the types as uppercase, but the sample uses lowercase. Seems suspicious?
    exportAs: 'PDF' | 'TIFF';
    includeAnnotations: boolean;
    downloadDocName?: string;
    // The docs at https://eviewer.net/developer-guide have a Promise<void> return type description, but I asume EXPORT would need a different (undocumented) return type?
  }): Promise<void>;
}

declare class ViewerPreferenceService {
  setUserPreferences(
    preferences?: string,
    shortcutPreferences?: string,
    annotationPreferences?: AnnotationPreference[]
  ): Promise<void>;
  getUserPreferences(
    defaultPrefJSON?: UserPreferences,
    defaultShortcutPrefJSON?: ShortcutPreferences,
    defaultAnnotationPrefJSON?: AnnotationPreference[],
    loadFromAssets?: boolean
  ): Promise<{
    userPreferences: UserPreferences;
    shortcutPreferences: ShortcutPreferences;
  }>;
}

declare class WatermarkService {
  addWatermark(properties: {
    stretch: string;
    position: 'left' | 'center' | 'right';
    opacity: 'transparant' | 'opaue';
    style: 'top' | 'center' | 'bottom' | 'diagonal' | 'revdiagonal';
    name: string;
    text: string;
  }): Promise<string>;
  editWatermark(properties: {
    id: string;
    text: string;
    style: 'top' | 'center' | 'bottom' | 'diagonal' | 'revdiagonal';
    position: 'left' | 'center' | 'right';
    opacity: 'transparant' | 'opaue';
    stretch: string;
    font: string;
    pageOption: string;
  }): Promise<string>;
  deleteWatermark(watermarkId: string): Promise<void>;
}

declare class AnnotationService {
  selectShape(
    annType:
      | 'line'
      | 'arrow'
      | 'circle'
      | 'rectangle'
      | 'highlight'
      | 'stamp'
      | 'text'
      | 'stickynote'
      | 'checkpoint',
    options: {
      stampType: 'imageStamp' | 'textStamp';
      info: { mimeType: string; stampName: string; stampURL: string }[];
    }
  ): Promise<void>;
  getStamps(
    loadFromAssets: boolean
  ): Promise<{ mimeType: string; stampName: string; stampURL: string }[]>;
  setCustomStamps(
    customStamps: { mimeType: string; stampName: string; stampURL: string }[]
  ): Promise<boolean>;
  drawShapes(
    pageNo: number,
    position: { X: number; Y: number; Width: number; Height: number },
    options?: {
      borderWidth?: number;
      borderColor?: `#${string}`;
      fillColor?: `#${string}`;
      text?: string;
      opacity?: number;
      fontName?: string;
      fontSize?: number;
      image?: string;
    }
  ): Promise<void>;
  setDrawingMode(
    modeName:
      | 'line'
      | 'arrow'
      | 'circle'
      | 'rectangle'
      | 'pen'
      | 'highlight'
      | 'text'
      | 'stamp'
      | 'polyline'
      | 'polygon'
      | 'cloud'
      | 'button'
      | 'checkpoint'
      | 'none'
  ): Promise<void>;
  getDrawingMode(): Promise<
    | 'line'
    | 'arrow'
    | 'circle'
    | 'rectangle'
    | 'pen'
    | 'highlight'
    | 'text'
    | 'stamp'
    | 'polyline'
    | 'polygon'
    | 'cloud'
    | 'button'
    | 'checkpoint'
    | 'none'
  >;
  addLinkToAnnotation(
    annId: string,
    options: { url: string; pageNo: number }
  ): Promise<void>;
  editShape(
    annId: string,
    pageNo: string,
    position: { X: number; Y: number; Width: number; Height: number },
    options?: {
      borderWidth?: number;
      borderColor?: `#${string}`;
      fillColor?: `#${string}`;
      text?: string;
      opacity?: number;
      fontName?: string;
      fontSize?: number;
      image?: string;
    }
  ): Promise<void>;
  deleteShape(pageNo: string, annId: string): Promise<void>;
  getAllAnnotations(
    userName?: string
  ): Promise<{ annID: string; pgNo: string }[]>;
  getAnnotationDetails(annId: string): Promise<{
    Id: string;
    annCreatorName: string;
    annType: string;
    borderColor: string;
    borderWidth: string;
    currentDate: string;
    currentTime: string;
    fillColor: string;
    fontSize: string;
    fontStyle: string;
    opacity: string;
    pageNo: number;
    stampHeight: number;
    stampImageUrl: string;
    stampWidth: number;
    textColor: string;
    textValue: string;
  }>;
  getFilteredAnnotations(
    userName?: string,
    annType?: string,
    pageNo?: number
  ): Promise<
    {
      Id: string;
      annCreatorName: string;
      annType: string;
      borderColor: string;
      borderWidth: string;
      currentDate: string;
      currentTime: string;
      fillColor: string;
      fontSize: string;
      fontStyle: string;
      opacity: string;
      pageNo: number;
      stampHeight: number;
      stampImageUrl: string;
      stampWidth: number;
      textColor: string;
      textValue: string;
    }[]
  >;
  updateCommentOrReply(
    annId: string,
    textUpdate: string,
    replyId: string
  ): Promise<void>;
  addReply(annId: string, replyText: string): Promise<void>;
  getReplyByUser(
    annId: string
  ): Promise<{ id: string; userName: string; time: string; message: string }[]>;
  getAllReplies(
    annId: string
  ): Promise<{ id: string; userName: string; time: string; message: string }[]>;
  removeReply(replyId: string, annId: string): Promise<void>;
  removeAllReplies(annId: string): Promise<void>;
}

declare class RedactionService {
  // The docs at https://eviewer.net/developer-guide use lowercase width and height here, but CamelCase in other places. Seems suspicious?
  drawRedaction(
    pageRange: number[],
    position: { X: number; Y: number; width: number; height: number },
    options: {
      opacity: number;
      fillcolor: `#${string}`;
      redactionTag: RedactionTag;
    }
  ): Promise<void>;
  redactWord(
    redactWord: string,
    options: {
      wholeWord: boolean;
      caseSensitive: boolean;
      selectedTag: RedactionTag;
    }
  ): Promise<void>;
  clearRedaction(pageRange: number[]): Promise<void>;
  redactExpressions(
    expressions: string,
    selectedTag: RedactionTag
  ): Promise<void>;
  getDetails(pageRange: number[]): Promise<RedactionDetailResponse>;
  switchRedactViewMode(): Promise<void>;
}

declare class IconCacheManagerService {
  invalidateThumbnailIconForPages(
    options: {
      docId: string;
      pgNo: number;
      vLocation?: 'TOP' | 'CENTER' | 'BOTTOM';
      hLocation?: 'LEFT' | 'RIGHT' | 'CENTER';
    }[]
  ): Promise<void>;
  getCacheInfo(): Promise<{
    memoryUsed: number;
    memoryAvailable: string;
    details: { docId: string; cacheEntries: number }[];
  }>;
}

declare class SignatureService {
  setAvailableCertificates(
    certificates: {
      certificate: string;
      commonName: string;
      expiry: string;
      issuedBy: string;
      password: string;
    }[]
  ): void;
  setAvailableAppearances(appearances: string[]): void;
}

declare class DocMetadataService {
  setMetaData(
    data: {
      id: string;
      title: string;
      value: string | number | object[];
      type:
        | 'string'
        | 'number'
        | 'booelan'
        | 'date'
        | 'time'
        | 'date&time'
        | 'singleChoice'
        | 'multipleChoices';
      constraints: {
        maxLength: number;
        minLength: number;
        regularExpression: string;
        isRequired: boolean;
        formatDescription: string;
        customValidationError: string;
        readOnly: boolean;
      };
    }[]
  ): Promise<void>;
  getMetaData(): Promise<
    {
      id: string;
      title: string;
      value: string | number | object[];
      type:
        | 'string'
        | 'number'
        | 'booelan'
        | 'date'
        | 'time'
        | 'date&time'
        | 'singleChoice'
        | 'multipleChoices';
      constraints: {
        maxLength: number;
        minLength: number;
        regularExpression: string;
        isRequired: boolean;
        formatDescription: string;
        customValidationError: string;
        readOnly: boolean;
      };
    }[]
  >;
}

declare class CallBackAPIService {
  setPageChangedCallback(
    callback: (docID: string, pageNo: number) => void
  ): void;
  setDocLoadCompleteCallback(callback: (docID: string) => void): void;
  setFirstPageRenderedCallback(
    callback: (docID: string, time: string) => void
  ): void;
  setDocSaveCompleteCallback(
    callback: (
      docID: string,
      response: {
        filePath: string;
        jsonpath: string;
        documentData: string;
        annotationData: string;
      }
    ) => void
  ): void;
  setDocSplitCallback(
    callback: (baseDocID: string, splitDocID: string) => void
  ): void;
  setDocDroppedCallback(callback: (docID: string) => void): void;
  // Parameter order differs between description and sample code in the docs. Which is it?
  setAnnCreatedCallback(
    callback: (docID: string, pageNo: number, annID: string) => void
  ): void;
  // Parameter order differs between description and sample code in the docs. Which is it?
  setAnnDeletedCallback(
    callback: (docID: string, pageNo: number, annID: string) => void
  ): void;
  setAnnPropUpdatedCallback(
    callback: (
      docID: string,
      pageNo: number,
      annID: string,
      annProperty: {
        properties: {
          COLOR: string;
          id: string;
          PAGE: number;
          BORDER: number;
          origAnnCordinate: number;
          WIDTH: number;
          X: number;
          isTransparant: boolean;
          Y: number;
          TRANSPARENT: number;
          LINEWIDTH: number;
          HEIGHT: number;
          PAGESIZE: string;
        };
      }
    ) => void
  ): void;
  setDrawingModeChangeCallback(callback: (drawingMode: string) => void): void;
  setWmPropUpdatedCallback(
    callback: (docId: string, wmId: number) => void
  ): void;
  // According to the docs buttonText is a JSON object, but that appears to be a mistake?
  setButtonAnnClickedCallback(
    callback: (
      docID: string,
      pageNo: number,
      annID: string,
      buttonText: string
    ) => void
  ): void;
  setDocExportedCallback(
    callback: (docId: string, selectionOption: string) => void
  ): void;
  setPageDeletedCallback(
    callback: (docId: string, pageNo: number) => void
  ): void;
  setPageCutCallback(callback: (docId: string, pageNo: number) => void): void;
  setPageCopiedCallback(
    callback: (docId: string, pageNo: number) => void
  ): void;
  setPagePastedCallback(
    callback: (docId: string, pageNo: number) => void
  ): void;
  setTextSelectedCallback(
    callback: (response: {
      eventType: string;
      coordinates: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        x3: number;
        y3: number;
        x4: number;
        y4: number;
      }[];
      text: string;
      page: number;
      screenInfo: { width: number; height: number };
      pageInfo: { width: number; height: number };
      pageRotation: number;
    }) => void
  ): void;
  // No documentation on the shape of the certificate JSON object. Made the assumption it's the same as passed to `setAvailableCertificates`
  setNewCertificateCallback(
    callback: (certificate: {
      certificate: string;
      commonName: string;
      expiry: string;
      issuedBy: string;
      password: string;
    }) => void
  ): void;
  // No documentation on the shape of the certificate JSON object. Made the assumption it's the same as passed to `setAvailableCertificates`
  setUpdateDefaultCertificateCallback(
    callback: (certificate: {
      newDefaultCertificate: {
        certificate: string;
        commonName: string;
        expiry: string;
        issuedBy: string;
        password: string;
      };
      oldDefaultCertificate: {
        certificate: string;
        commonName: string;
        expiry: string;
        issuedBy: string;
        password: string;
      };
    }) => void
  ): void;
  setNewAppearanceCallback(callback: (appearance: string) => void): void;
  // No documentation on the shape of the JSON objects. Made some assumptions
  setPreferenceUpdateCallback(
    callback: (preferenceData: {
      userName: string;
      userPreference: UserPreferences;
      annotationPreference: AnnotationPreference[];
      customStamps: unknown;
    }) => void
  ): void;
  // I'm confused as the docs state Scale is not a number, but in the sample JSON in the same docs it is?
  setZoomChangeCallback(
    callback: (zoomData: {
      clientDocID: string;
      docID: string;
      scale: number;
      zoomPreset: 'fitToWidth' | 'fitToWindow';
    }) => void
  ): void;
  setOnContextMenuCallback(
    callback: (info: {
      location:
        | 'documentView'
        | 'pageThumbnails'
        | 'docThumbnails'
        | 'toolbar'
        | 'docTab';
      docInfo: {
        docID: string;
        clientDocID: string;
        fileName: string;
        currentPageNo: number;
      };
      eventInfo: {
        pageNo: number;
        rotation: 0 | 90 | 180 | 270;
        width: number;
        height: number;
      };
      screenInfo: { width: number; height: number };
      // Docs say Cords instead of the expected Coords?
      viewportCords: { x: number; y: number };
      pageCords: { x: number; y: number };
      pageHasAnnotations: boolean;
      annotationInfo: { annId: string; zIndex: string }[];
      textInfo: { spanText: string; spanX: number; spanY: number };
      clickEventInfo: MouseEvent;
    }) => void
  ): void;
  setDocRedactCallback(callback: (docId: string) => void): void;
  setTabSwitchCallback(
    callback: (outFocusViewerID: string, inFocusViewerID: string) => void
  ): void;
  setRotationCallback(
    callback: (docId: string, pageNo: number, rotation: string) => void
  ): void;
}

interface DocumentSaveObject {
  docContent: Uint8Array;
  annContent: object;
  viewerDocID: string;
  clientDocID: string;
  name: string;
  pageCount: number;
  mimeType: string;
  isDocumentContentDirty: boolean;
  isAnnContentDirty: boolean;
}

interface LoadViewerOptions {
  // In the docs `docThumbnails` is missing as an option here, but as the sample app uses it and `setOnContextMenuCallback` allows it I think that's a documentation bug.
  contextMenuOptions: {
    overrideContextMenus: boolean;
    location: (
      | 'documentView'
      | 'pageThumbnails'
      | 'docThumbnails'
      | 'toolbar'
      | 'docTab'
    )[];
  };
}

interface DocumentEndPointOptions {
  type: 'GET';
  headers: {
    [key: string]: string;
  };
  savePayLoadType: 'application/json' | 'multipart/form-data';
}

interface ToolbarButtonBase {
  id: string;
  name: string;
  alignment: 'ribbonToolbar' | 'leftToolbar' | 'rightToolbar';
  iconUrl: string;
  parent: 'View' | 'Annotate' | 'Insert' | 'Redact';
}

interface RibbonToolbarButton extends ToolbarButtonBase {
  alignment: 'ribbonToolbar';
  placementIndex: number; // Docs at https://eviewer.net/developer-guide make it appear this is a string, but this is incorrect.
}

interface LeftToolbarButton extends ToolbarButtonBase {
  alignment: 'leftToolbar';
}

interface RightToolbarButton extends ToolbarButtonBase {
  alignment: 'rightToolbar';
}

type ToolbarButton =
  | RibbonToolbarButton
  | LeftToolbarButton
  | RightToolbarButton;

interface MenuItemBase {
  type: 'menuitem' | 'seperator';
  onClick?: () => Promise<void>;
  disabled?: boolean;
}

interface MenuItemSeperator extends MenuItemBase {
  type: 'seperator';
}

interface MenuItemItem extends MenuItemBase {
  type: 'menuitem';
  id: string;
  caption: string;
}

type MenuItem = MenuItemItem | MenuItemSeperator;

interface PageFilter {
  pageNo: number;
  visible: boolean;
}

interface StyleObject {
  backgroundColor?: `#${string}`;
  color?: `#${string}`;
  fontWeight?:
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  fontStyle?: 'normal' | 'italic' | 'underline';
  fileName?: string;
  icon?: string;
}
interface Thumbnail {
  pgNo: number;
  iconurl: string;
  vLocatiom: 'TOP' | 'CENTER' | 'BOTTOM';
  hLocation: 'LEFT' | 'RIGHT' | 'CENTER';
  hoverTest: string;
}

interface LoadDocumentOptions {
  isEditMode?: boolean;
  repoType?: string;
  password?: string;
  landingPage?: string;
  pageFilters?: PageFilter[];
  groupName?: string;
  tabStyle?: StyleObject;
  focusTabStyle?: StyleObject;
  readOnly?: boolean;
  thumbnailIconcallback?: (thumbnails: Thumbnail[]) => Promise<Thumbnail[]>;
}

interface DocumentInfo {
  docId: string;
  clientDocId: string;
  docName: string;
  size: number;
  pageCount: number;
  fileFormat: 'PDF' | 'TIFF' | 'PNG' | 'JPG' | 'BMP' | 'GIF' | 'TXT';
}

interface GroupObject {
  groups: {
    name: string;
    documents: string[];
  }[];
}

interface GroupDefinitionObject {
  groups: { name: string; color: string }[];
}

interface AnnotationPreferenceLine {
  annType: 'Line';
  borderWidth: number;
  borderOpacity: number;
  borderColor: `#${string}`;
}

interface AnnotationPreferenceArrow {
  annType: 'Arrow';
  borderWidth: number;
  borderOpacity: number;
  borderColor: `#${string}`;
}

interface AnnotationPreferenceCircle {
  annType: 'Circle';
  borderWidth: number;
  borderOpacity: number;
  borderColor: `#${string}`;
  fillColor: `#${string}`;
  fillOpacity: number;
}

interface AnnotationPreferenceRectangle {
  annType: 'Rectangle';
  borderWidth: number;
  borderOpacity: number;
  borderColor: `#${string}`;
  fillColor: `#${string}`;
  fillOpacity: number;
}

interface AnnotationPreferencePen {
  annType: 'Pen';
  borderWidth: number;
  borderOpacity: number;
  borderColor: `#${string}`;
}

interface AnnotationPreferenceHighlight {
  annType: 'Highlight';
  fillColor: `#${string}`;
  fillOpacity: number;
}

interface AnnotationPreferenceText {
  annType: 'Text';
  borderWidth: number;
  borderColor: `#${string}`;
  fillColor: `#${string}`;
  fillOpacity: number;
  fontColor: `#${string}`;
  fontOpacity: number;
  fontFace: string;
  fontSize: number;
  wrapText: boolean;
}

interface AnnotationPreferenceStamp {
  annType: 'Stamp';
  borderWidth: number;
  borderColor: `#${string}`;
  fillColor: `#${string}`;
  fontColor: `#${string}`;
  fontFace: string;
  fontSize: number;
}

interface AnnotationPreferencePolyLine {
  annType: 'PolyLine';
  borderWidth: number;
  borderOpacity: number;
  borderColor: `#${string}`;
}

interface AnnotationPreferencePolygon {
  annType: 'Polygon';
  borderWidth: number;
  borderColor: `#${string}`;
  fillColor: `#${string}`;
  fillOpacity: number;
}

interface AnnotationPreferenceCloud {
  annType: 'Cloud';
  borderWidth: number;
  borderOpacity: number;
  borderColor: `#${string}`;
}

interface AnnotationPreferenceStickynote {
  annType: 'Stickynote';
  borderWidth: number;
  fillColor: `#${string}`;
}

interface AnnotationPreferenceButton {
  annType: 'Button';
  fillColor: `#${string}`;
  fontColor: `#${string}`;
}

interface AnnotationPreferenceCheckpoint {
  annType: 'Checkpoint';
  fillColor: `#${string}`;
}

interface AnnotationPreferenceDrawsignature {
  annType: 'Drawsignature';
  borderWidth: number;
  borderColor: `#${string}`;
  fillColor: `#${string}`;
  fillOpacity: number;
}

interface AnnotationPreferenceRedaction {
  annType: 'Redaction';
  borderWidth: number;
  fillColor: `#${string}`;
  fillOpacity: number;
}

type AnnotationPreference =
  | AnnotationPreferenceLine
  | AnnotationPreferenceArrow
  | AnnotationPreferenceCircle
  | AnnotationPreferenceRectangle
  | AnnotationPreferencePen
  | AnnotationPreferenceHighlight
  | AnnotationPreferenceText
  | AnnotationPreferenceStamp
  | AnnotationPreferencePolyLine
  | AnnotationPreferencePolygon
  | AnnotationPreferenceCloud
  | AnnotationPreferenceStickynote
  | AnnotationPreferenceButton
  | AnnotationPreferenceCheckpoint
  | AnnotationPreferenceDrawsignature
  | AnnotationPreferenceRedaction;

interface ToolbarView {
  name: 'View';
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
  };
}

interface ToolbarInsert {
  name: 'Insert';
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
  };
}

interface ToolbarAnnotation {
  name: 'Annotate';
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
  };
}

interface ToolbarRedact {
  name: 'Redact';
  isRedactTabVisible: boolean;
  children: {
    redactSelectText: boolean;
    redactWord: boolean;
    redaction: boolean;
    searchRedact: boolean;
    clearRedaction: boolean;
    redactPage: boolean;
    redactViewMode: boolean;
  };
}

interface ToolbarSignature {
  name: 'Signature';
  isSignatureTabVisible: boolean;
  children: {
    drawSignature: boolean;
  };
}

interface ToolbarSpeech {
  name: 'Speech';
  isSpeechTabVisible: boolean;
  children: {
    previousPageSpeech: boolean;
    play: boolean;
    pause: boolean;
    stop: boolean;
    nextPageSpeech: boolean;
    speechSpeed: boolean;
  };
}

interface ToolbarCompare {
  name: 'Compare';
  isCompareTabVisible: boolean;
  children: {
    comparedocsView: boolean;
    startSync: boolean;
    closeCompareDocuments: boolean;
    comparePanel: boolean;
  };
}

interface ToolbarModify {
  name: 'Modify';
  isMedifyTabVisible: boolean;
  children: {
    addSnapshot: boolean;
    openSnapshotAsNewDocument: boolean;
    enableDisableCommentSubtitle: boolean;
  };
}

type ToolBar =
  | ToolbarView
  | ToolbarInsert
  | ToolbarAnnotation
  | ToolbarRedact
  | ToolbarSignature
  | ToolbarSpeech
  | ToolbarCompare
  | ToolbarModify;

interface UserPreferences {
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
    newDocument: boolean;
    scanDocument: boolean;
    closeFile: boolean;
    closeAllFile: boolean;
    documentSwitching: boolean;
    viewComments: boolean;
    docMetadata: boolean;
    attachments: boolean;
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
  ribbonToolbar: ToolBar[];
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
    skipSaveCheckOnUnload: boolean;
    enableHyperlinksByRegEx: string;
    saveAnnotationAsMimeType: string;
    clearViewerObject: boolean;
    showGroupingOptions: boolean;
    tabGrouping: boolean;
  };
  docTabPreferences: {
    focusTabStyle: StyleObject;
    tabStyle: StyleObject;
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
}

interface ShortcutPreferences {
  shortcuts: {
    key: string;
    command: string;
    title: string;
  }[];
}

type RedactionTag =
  | 'Confidential'
  | 'Prohibited'
  | 'Sensitive'
  | 'Important'
  | 'Restricted'
  | 'SSN'
  | 'Account Detail';

interface RedactionDetailResponse {
  docId: string;
  // According to the docs the RedactionDetailResponse has a proerty with the same name. Seems suspicious.
  RedactionDetailResponse: {
    pageNo: number; // Assumption. No type specified in docs.
    redactionDetail: { redactionID: string; redactionTag: RedactionTag }[];
  }[];
}
