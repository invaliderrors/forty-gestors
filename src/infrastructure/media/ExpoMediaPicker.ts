import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import {
  MediaPermissionError,
  UnsupportedFileTypeError,
  type MediaPermissionKind,
  type MediaPermissionStatus,
  type MediaPicker,
} from '@/domain/media/MediaPicker';
import type { PickedFile, PickedFileKind } from '@/domain/media/types';

function inferName(uri: string, fallback: string): string {
  const segment = uri.split('/').pop();
  return segment && segment.length > 0 ? segment : fallback;
}

function mapImageAsset(asset: ImagePicker.ImagePickerAsset): PickedFile {
  return {
    uri: asset.uri,
    name: asset.fileName ?? inferName(asset.uri, 'documento.jpg'),
    mimeType: asset.mimeType ?? 'image/jpeg',
    kind: 'image',
    sizeBytes: asset.fileSize ?? undefined,
    width: asset.width,
    height: asset.height,
  };
}

function mapPermission(response: ImagePicker.PermissionResponse): MediaPermissionStatus {
  if (response.granted) {
    return 'granted';
  }
  return response.canAskAgain ? 'askable' : 'blocked';
}

/** Adaptador nativo de captura de documentos sobre expo-image-picker / expo-document-picker. */
export class ExpoMediaPicker implements MediaPicker {
  async checkPermission(kind: MediaPermissionKind): Promise<MediaPermissionStatus> {
    const response =
      kind === 'camera'
        ? await ImagePicker.getCameraPermissionsAsync()
        : await ImagePicker.getMediaLibraryPermissionsAsync();
    return mapPermission(response);
  }

  async requestPermission(kind: MediaPermissionKind): Promise<MediaPermissionStatus> {
    const response =
      kind === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
    return mapPermission(response);
  }

  async captureWithCamera(): Promise<PickedFile | null> {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      throw new MediaPermissionError('camera');
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (result.canceled || result.assets.length === 0) {
      return null;
    }
    return mapImageAsset(result.assets[0]);
  }

  async pickFromGallery(): Promise<PickedFile | null> {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      throw new MediaPermissionError('gallery');
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (result.canceled || result.assets.length === 0) {
      return null;
    }
    return mapImageAsset(result.assets[0]);
  }

  async pickDocumentFile(accepts: readonly PickedFileKind[]): Promise<PickedFile | null> {
    const mimeTypes: string[] = [];
    if (accepts.includes('pdf')) {
      mimeTypes.push('application/pdf');
    }
    if (accepts.includes('image')) {
      mimeTypes.push('image/*');
    }

    const result = await DocumentPicker.getDocumentAsync({
      type: mimeTypes,
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled || result.assets.length === 0) {
      return null;
    }
    const asset = result.assets[0];
    const isPdf =
      asset.mimeType === 'application/pdf' || asset.name.toLowerCase().endsWith('.pdf');
    const kind: PickedFileKind = isPdf ? 'pdf' : 'image';

    // El filtro por MIME del selector no es garantía en todos los proveedores
    // de archivos de Android: se verifica de nuevo acá.
    if (!accepts.includes(kind)) {
      throw new UnsupportedFileTypeError(
        accepts.includes('pdf') && !accepts.includes('image')
          ? 'Este documento solo se acepta en PDF. Descárgalo de la DIAN y súbelo sin convertirlo a imagen.'
          : 'El tipo de archivo no es válido para este documento.',
      );
    }

    return {
      uri: asset.uri,
      name: asset.name,
      mimeType: asset.mimeType ?? (isPdf ? 'application/pdf' : 'image/jpeg'),
      kind,
      sizeBytes: asset.size ?? undefined,
    };
  }
}
