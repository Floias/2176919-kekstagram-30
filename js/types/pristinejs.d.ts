declare module 'pristinejs' {
  class Pristine {
    constructor(
      form: HTMLFormElement,
      options?: {
        classTo?: string;
        errorTextParent?: string;
        errorTextClass?: string;
      }
    );

    addValidator(
      input: HTMLInputElement,
      validator: (value: string) => boolean,
      errorMessage: string
    ): void;

    validate(): boolean;
    reset(): void;
  }

  export default Pristine;
}
