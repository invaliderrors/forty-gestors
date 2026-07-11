export type PickedFileKind = 'image' | 'pdf';

export type PickedFile = {
  uri: string;
  name: string;
  mimeType: string;
  kind: PickedFileKind;
  sizeBytes?: number;
  /** Dimensiones en px cuando la fuente las reporta (cámara/galería). */
  width?: number;
  height?: number;
};

export type MediaSource = 'camera' | 'gallery' | 'file';
