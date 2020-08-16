import Rating from './rating';
import { MemClient } from '../../../api/responses';

interface IMemProvider {
    getCurrentMem: () => MemClient;
    getNextMem: () => MemClient;
    swapMem: (type: Rating) => void;
}

export default IMemProvider;
