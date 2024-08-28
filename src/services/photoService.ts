import { Photo, photos } from '../models/photoModel';

export const getAllPhotos = (): Photo[] => {
  return photos;
};

export const getPhotoById = (id: number): Photo | undefined => {
  return photos.find((photo) => photo.id === id);
};

export const createPhoto = (photo: Photo): Photo => {
  photo.id = photos.length + 1;
  photos.push(photo);
  return photo;
};
