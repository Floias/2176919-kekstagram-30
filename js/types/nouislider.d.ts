declare module 'nouislider' {
    export interface Options {
        start?: number;
        range?: {
            min?: number;
            max?: number;
        };
        step?: number;
        connect: string;
    }

    export function create(element: HTMLElement, options?: Options): void;

    export interface noUiSlider {
        on(event: string, callback: () => void): void;
        get(): number | string;
        updateOptions(options: Options): void;
    }

    const noUiSlider: {
        create: typeof create;
    };

    export default noUiSlider;
}

