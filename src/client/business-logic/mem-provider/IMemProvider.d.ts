import Rating from './rating';
import { MemClient } from '../../../routes/MemClient';

interface IMemProvider {
    getCurrentMem(): MemClient;
    swapMem(type: Rating): void;
}

export default IMemProvider;
