import { HttpEvent, HttpEventType } from "@angular/common/http";
import { filter, map, pipe, tap } from "rxjs";

export function filtrarResposta<T>()
{
    return pipe(filter((event: HttpEvent<T>) => event.type === HttpEventType.Response), map((res: any) => res.body))
}

export function uploadProgresso<T>(callback: (progresso: number) => void)
{
    return tap((event: HttpEvent<T>) =>
    {
        if (event.type === HttpEventType.UploadProgress)
        {
            callback(Math.round((event.loaded * 100) / event.total!))
        }
    })
}