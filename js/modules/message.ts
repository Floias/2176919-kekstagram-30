import {pressesKeydown} from '../utils/utils';
import {onDocumentKeydown, submitButton} from './form';

const templateSuccess: HTMLTemplateElement | null = document.querySelector('#success');
const success: HTMLElement | null = templateSuccess && templateSuccess.content.querySelector('.success');
const templateSendingError: HTMLTemplateElement | null = document.querySelector('#error');
const sendingErrorContainer: HTMLElement | null = templateSendingError && templateSendingError.content.querySelector('.error');

type ShowMessageParams = {
  element: HTMLElement | null;
  buttonClass: string;
};

const showMessage = ({ element, buttonClass }: ShowMessageParams): void => {
  if (element) {
    document.body.append(element);
  }
  element?.querySelector(buttonClass)?.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onMessageKeydown);
  document.body.addEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const hideMessage = (): void => {
  const existItem: HTMLElement | null = document.querySelector('.success') || document.querySelector('.error');
  existItem?.remove();
  document.removeEventListener('keydown', onMessageKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
  submitButton.disabled = false;
};

const onCloseButtonClick = () => {
  hideMessage();
}

export const showsSuccess = (): void => {
  showMessage({ element: success, buttonClass: '.success__button' });
};

export const showsSendingError = () => {
  showMessage({element: sendingErrorContainer, buttonClass: '.error__button'});
  submitButton.disabled = true;
};

const onMessageKeydown = pressesKeydown(hideMessage);

const onBodyClick = (evt: Event) => {
  if ((evt.target as HTMLElement)?.closest('.success__inner') || (evt.target as HTMLElement)?.closest('.error__inner')) {
    return;
  }
  hideMessage();
};

const templateDataError: HTMLTemplateElement | null = document.querySelector('#data-error');
const dataErrorContainer: HTMLElement | null = templateDataError && templateDataError.content.querySelector('.data-error');

export const showsDataError = () => {
  const dataError = dataErrorContainer?.cloneNode(true);
  if (dataError) {
    document.body.appendChild(dataError);
  }
};

export const hidesDataError = () => {
  const error = document.querySelector('.data-error');
  if (error) {
    document.body.removeChild(error);
  }
}
