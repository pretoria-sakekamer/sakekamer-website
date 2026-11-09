import { isPlaceholder, type Placeholder as PlaceholderValue } from '../../../content/types';
import { Placeholder } from './Placeholder';

/** Renders a content value that may still be a placeholder. */
export function PhValue({ value, dark }: { value: PlaceholderValue | string; dark?: boolean }) {
  return isPlaceholder(value) ? <Placeholder dark={dark}>{value.placeholder}</Placeholder> : <>{value}</>;
}
