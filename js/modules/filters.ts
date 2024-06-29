import {getRandomInteger, debounce} from '../utils/utils';
import {drawingThumbnails, Photo} from './drawing-thumbnails';

const imgFilters: HTMLElement | null = document.querySelector('.img-filters');
const defaultButton: HTMLElement | null = imgFilters && imgFilters.querySelector('#filter-default');
const randomButton: HTMLElement | null = imgFilters && imgFilters.querySelector('#filter-random');
const discussedButton: HTMLElement | null = imgFilters && imgFilters.querySelector('#filter-discussed');
const MAX_RANDOM_FILTER = 10;
let filteringMethod: Function;

const replacesActivity = (button: HTMLElement | null) => {
  imgFilters?.querySelector('.img-filters__button--active')?.classList.remove('img-filters__button--active');
  button?.classList.add('img-filters__button--active');
};

const clearsOldThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((el) => el.remove());
};

const handleFilterClick = (evt: Event) => {
  if (evt.target?.closest('#filter-default')) {
    replacesActivity(defaultButton);
    filteringMethod = showDefault;
    return;
  }
  if (evt.target?.closest('#filter-random')) {
    replacesActivity(randomButton);
    filteringMethod = showRandom;
    return;
  }
  if (evt.target?.closest('#filter-discussed')) {
    replacesActivity(discussedButton);
    filteringMethod = showDiscussed;
    return;
  }
};

const renderPictures = (data: Photo[]) => {
  clearsOldThumbnails();
  const filteredPhotos = filteringMethod(data);
  drawingThumbnails(filteredPhotos);
};

const debouncedRenderPicture = debounce(renderPictures);

export const initFilter = (data: Photo[]) => {
  imgFilters?.classList.remove('img-filters--inactive');
  imgFilters?.addEventListener('click', (evt: Event) => {
    handleFilterClick(evt);
    debouncedRenderPicture(data);
  });
};

const sortsThumbnails = (thumbnail1: Photo, thumbnail2: Photo) => thumbnail2.comments.length - thumbnail1.comments.length;

const showDefault = (thumbnails: Photo[]) => thumbnails;

const showRandom = (thumbnails: Photo[]) => {
  const randomIndexes: number[] = [];
  while(randomIndexes.length < thumbnails.length && randomIndexes.length < MAX_RANDOM_FILTER) {
    let index = getRandomInteger(0, thumbnails.length - 1);
    if (!randomIndexes.includes(index)) {
      randomIndexes.push(index);
    }
  }
  return randomIndexes.map((index) => thumbnails[index]);
};

const showDiscussed = (thumbnails: Photo[]) => thumbnails.slice().sort(sortsThumbnails);
