export class AbortControllerProxy implements AbortController {
    private aborted: boolean = false;

    constructor(private controller: AbortController) {
    }

    get signal(): AbortSignal {
        return this.controller.signal;
    }

    abort(): void {
        this.controller.abort();
        this.aborted = true;
    }

    hasAborted(): boolean {
        return this.aborted;
    }
}
