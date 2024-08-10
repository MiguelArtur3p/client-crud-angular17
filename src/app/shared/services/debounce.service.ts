import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DebounceService
{
    private timer: any;

    constructor() { }

    debounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void
    {
        return (...args: any[]): void =>
        {
            if (this.timer)
            {
                clearTimeout(this.timer);
            }

            this.timer = setTimeout(() =>
            {
                callback(...args);
                this.timer = null;
            }, delay);
        };

    }
}
