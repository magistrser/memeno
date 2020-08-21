import { RequestType } from '../routes/RequestType';
import axios from 'axios';

export function axiosExtractResult<RequestDataType, ResolveType>(
    url: string,
    type: RequestType,
    data: RequestDataType
) {
    return new Promise<ResolveType>((resolve, reject) =>
        axios[type](url, data)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error))
    );
}
