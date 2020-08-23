import { AxiosError } from 'axios';
import config from '../config';

type HandleType = (() => void) | null;
type RequestFunctionType<ResponseType> = () => Promise<ResponseType>;

type RestartRequestObj<ResponseType> = {
    resolve: (data?: any) => void;
    reject: (data?: any) => void;
    requestFunction: RequestFunctionType<ResponseType>;
};

export interface IConnectionTracker {
    makeRequest<ResponseType>(
        requestFunction: RequestFunctionType<ResponseType>
    ): Promise<ResponseType>;
    setConnectionLostHandel(handle: HandleType): void;
    setConnectionRestoreHandle(handle: HandleType): void;
    setAuthLostHandle(handle: HandleType): void;
    setAccessDeniedHandle(handle: HandleType): void;
    setUnknownErrorHandle(handle: HandleType): void;
}

export class ConnectionTracker implements IConnectionTracker {
    private onConnectionLostHandel: HandleType = null;
    private onConnectionRestoreHandle: HandleType = null;
    private onAuthLost: HandleType = null;
    private onAccessDenied: HandleType = null;
    private onUnknownError: HandleType = null;

    private isConnectionLost = false;

    handleSuccess<ResponseType>(
        data: ResponseType,
        restartRequestObj: RestartRequestObj<ResponseType>
    ): void {
        if (this.isConnectionLost) {
            this.isConnectionLost = false;
            this.onConnectionRestoreHandle
                ? this.onConnectionRestoreHandle()
                : null;
        }
        restartRequestObj.resolve(data);
    }

    handleError<ResponseType>(
        error: AxiosError,
        restartRequestObj: RestartRequestObj<ResponseType>
    ): void {
        if (error && !error.response) {
            this.handleNetworkError(restartRequestObj);
            return;
        }

        this.onUnknownError ? this.onUnknownError() : null;
        restartRequestObj.reject();
    }

    handleNetworkError<ResponseType>(
        restartRequestObj: RestartRequestObj<ResponseType>
    ): void {
        this.isConnectionLost = true;
        this.onConnectionLostHandel ? this.onConnectionLostHandel() : null;

        setTimeout(
            () => this.restartRequest(restartRequestObj),
            config.connectionTracker.restartRequestTimeout
        );
    }

    restartRequest<ResponseType>(
        restartRequestObj: RestartRequestObj<ResponseType>
    ): void {
        const { requestFunction } = restartRequestObj;
        requestFunction()
            .then((result) => this.handleSuccess(result, restartRequestObj))
            .catch((error) => this.handleError(error, restartRequestObj));
    }

    async makeRequest<ResponseType>(
        requestFunction: RequestFunctionType<ResponseType>
    ): Promise<ResponseType> {
        return new Promise<ResponseType>((resolve, reject) => {
            this.restartRequest({ resolve, reject, requestFunction });
        });
    }

    setConnectionLostHandel(handle: HandleType): void {
        this.onConnectionLostHandel = handle;
    }
    setConnectionRestoreHandle(handle: HandleType): void {
        this.onConnectionRestoreHandle = handle;
    }
    setAuthLostHandle(handle: HandleType): void {
        this.onAuthLost = handle;
    }
    setAccessDeniedHandle(handle: HandleType): void {
        this.onAccessDenied = handle;
    }
    setUnknownErrorHandle(handle: HandleType): void {
        this.onUnknownError = handle;
    }
}

const connectionTracker = new ConnectionTracker();
export default connectionTracker;
