export type PickedFileKind = 'image' | 'pdf';

export type PickedFile = {
  uri: string;
  name: string;
  mimeType: string;
  kind: PickedFileKind;
  sizeBytes?: number;
};

export type MediaSource = 'camera' | 'gallery' | 'file';
