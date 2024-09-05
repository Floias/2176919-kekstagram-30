import {drawingThumbnails} from './drawing-thumbnails';
import {PHOTO_COUNT} from '../data/data';
import {closeImageSelection, setFormSubmit} from './form';
import {showsDataError, hidesDataError, showsSuccess} from './message';
import {initFilter} from './filters';

export const BASE_URL = 'https://30.javascript.htmlacademy.pro/kekstagram';
enum Route {
  GET_DATA = '/data',
  SEND_DATA = '/',
};
enum Method {
  GET = 'GET',
  POST = 'POST',
};
type LoadParams = {
  route: string;
  method?: Method;
  body?: any;
  successText?: void | null;
  showsSuccess?: () => void;
};

type LoadResponse = Promise<any>;

const receivingError = () => {
  showsDataError();
  setTimeout(hidesDataError, 5000);
};

const load = ({
  route,
  method = Method.GET,
  body = null,
  successText = null,
}: LoadParams): LoadResponse =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(successText);

export const getData = (): LoadResponse => load({ route: Route.GET_DATA });
export const sendData = (body: any) => load({ route: Route.SEND_DATA, method: Method.POST, body, showsSuccess });

getData()
  .then((data) => {
    drawingThumbnails(data.slice(0, PHOTO_COUNT));
    initFilter(data);
  })
  .catch(receivingError);
setFormSubmit(closeImageSelection);
