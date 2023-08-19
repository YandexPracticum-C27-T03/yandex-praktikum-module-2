import { PropsWithChildren } from 'react';
import { cn } from '@bem-react/classname';

import './index.scss';

const badgeCn = cn('Badge');

export function ReactionsBadge({ children }: PropsWithChildren) {
  return <span className={badgeCn()}>{children}</span>;
}
