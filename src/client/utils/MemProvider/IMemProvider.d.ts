import Rating from './Rating';
import { MemClient } from '../../../routes/MemClient';

interface IMemProvider {
    getCurrentMem(): MemClient;
    swapMem(type: Rating): void;
}

export default IMemProvider;
